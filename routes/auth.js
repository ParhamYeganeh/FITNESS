"use strict";

const express = require("express");

const {
    randomBytes,
    scryptSync,
    timingSafeEqual,
    createHash
} = require("node:crypto");

const db = require("../database/db");

const router = express.Router();


/*
 * =====================================================
 * SESSION CONFIG
 * =====================================================
 */

const SESSION_COOKIE_NAME =
    process.env.NODE_ENV === "production"
        ? "__Host-fitness_session"
        : "fitness_session";

const SESSION_DURATION_SECONDS =
    60 * 60 * 24 * 7;

const MAX_ACTIVE_SESSIONS_PER_USER = 5;

const SESSION_CLEANUP_INTERVAL_MS =
    15 * 60 * 1000;


/*
 * =====================================================
 * NO-CACHE AUTH RESPONSES
 * =====================================================
 */

const disableAuthCaching = (
    req,
    res,
    next
) => {

    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, private"
    );

    res.setHeader(
        "Pragma",
        "no-cache"
    );

    res.setHeader(
        "Expires",
        "0"
    );

    next();
};


router.use(
    disableAuthCaching
);


/*
 * =====================================================
 * REQUEST BODY VALIDATION HELPERS
 * =====================================================
 */

const isPlainObject = (
    value
) => {

    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
    );
};


const hasOnlyAllowedFields = (
    body,
    allowedFields
) => {

    return Object.keys(body)
        .every(
            (field) =>
                allowedFields.includes(field)
        );
};


const getUnknownFields = (
    body,
    allowedFields
) => {

    return Object.keys(body)
        .filter(
            (field) =>
                !allowedFields.includes(field)
        );
};


/*
 * =====================================================
 * PASSWORD HASHING
 * =====================================================
 */

const hashPassword = (
    password
) => {

    const salt =
        randomBytes(16)
            .toString("hex");


    const derivedKey =
        scryptSync(
            password,
            salt,
            64
        );


    return (
        `${salt}:${derivedKey.toString("hex")}`
    );
};


const verifyPassword = (
    password,
    storedPasswordHash
) => {

    try {

        const parts =
            String(
                storedPasswordHash
            ).split(":");


        if (
            parts.length !== 2
        ) {

            return false;

        }


        const derivedKey =
            scryptSync(
                password,
                parts[0],
                64
            );


        const storedKey =
            Buffer.from(
                parts[1],
                "hex"
            );


        if (
            derivedKey.length !==
            storedKey.length
        ) {

            return false;

        }


        return timingSafeEqual(
            derivedKey,
            storedKey
        );

    } catch (error) {

        return false;

    }
};


/*
 * =====================================================
 * COOKIE HELPERS
 * =====================================================
 */

const parseCookies = (
    cookieHeader = ""
) => {

    return cookieHeader
        .split(";")
        .map(
            (part) =>
                part.trim()
        )
        .filter(Boolean)
        .reduce(
            (
                cookies,
                part
            ) => {

                const separatorIndex =
                    part.indexOf("=");


                if (
                    separatorIndex === -1
                ) {

                    return cookies;

                }


                const key =
                    part
                        .slice(
                            0,
                            separatorIndex
                        )
                        .trim();


                const value =
                    part
                        .slice(
                            separatorIndex + 1
                        )
                        .trim();


                try {

                    cookies[key] =
                        decodeURIComponent(
                            value
                        );

                } catch (error) {

                    cookies[key] =
                        value;

                }


                return cookies;

            },
            {}
        );
};


const buildCookie = (
    token,
    maxAge
) => {

    const parts = [

        `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,

        "Path=/",

        "HttpOnly",

        "SameSite=Lax",

        `Max-Age=${maxAge}`

    ];


    /*
     * -------------------------------------------------
     * Production Cookie Security
     * -------------------------------------------------
     *
     * در Production:
     *
     * __Host- Cookie
     * Secure
     * Path=/
     * بدون Domain
     */

    if (
        process.env.NODE_ENV ===
        "production"
    ) {

        parts.push(
            "Secure"
        );

    }


    return parts.join(
        "; "
    );
};


/*
 * =====================================================
 * SESSION HELPERS
 * =====================================================
 */

const hashSessionToken = (
    token
) => {

    return createHash("sha256")
        .update(token)
        .digest("hex");
};


const createSessionExpiration = () => {

    return new Date(
        Date.now() +
        SESSION_DURATION_SECONDS *
        1000
    )
        .toISOString()
        .slice(0, 19)
        .replace(
            "T",
            " "
        );
};


/*
 * =====================================================
 * EXPIRED SESSION CLEANUP
 * =====================================================
 */

const cleanupExpiredSessions = () => {

    try {

        const result =
            db.prepare(`
                DELETE FROM sessions
                WHERE expires_at <= datetime('now')
            `).run();


        if (
            result.changes > 0
        ) {

            console.log(
                `Expired sessions cleaned: ${result.changes}`
            );

        }


        return result.changes;

    } catch (error) {

        console.error(
            "Unable to clean expired sessions:",
            error
        );


        return 0;

    }
};


/*
 * -----------------------------------------------------
 * Initial cleanup
 * -----------------------------------------------------
 */

cleanupExpiredSessions();


/*
 * -----------------------------------------------------
 * Periodic cleanup
 * -----------------------------------------------------
 */

const sessionCleanupTimer =
    setInterval(
        cleanupExpiredSessions,
        SESSION_CLEANUP_INTERVAL_MS
    );


/*
 * Node.js should not remain alive only
 * because of this timer.
 */

if (
    typeof sessionCleanupTimer.unref ===
    "function"
) {

    sessionCleanupTimer.unref();

}


/*
 * =====================================================
 * CREATE SESSION
 * =====================================================
 */

const createSession = (
    userId
) => {

    const token =
        randomBytes(32)
            .toString("hex");


    const tokenHash =
        hashSessionToken(
            token
        );


    const expiresAt =
        createSessionExpiration();


    /*
     * حذف Sessionهای منقضی همین User
     */

    db.prepare(`
        DELETE FROM sessions
        WHERE user_id = ?
        AND expires_at <= datetime('now')
    `).run(
        userId
    );


    /*
     * ساخت Session جدید
     */

    db.prepare(`
        INSERT INTO sessions (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (?, ?, ?)
    `).run(
        userId,
        tokenHash,
        expiresAt
    );


    /*
     * حداکثر ۵ Session فعال
     *
     * جدیدترین Sessionها نگه داشته می‌شوند.
     */

    db.prepare(`
        DELETE FROM sessions
        WHERE user_id = ?
        AND id NOT IN (
            SELECT id
            FROM sessions
            WHERE user_id = ?
            ORDER BY created_at DESC, id DESC
            LIMIT ?
        )
    `).run(
        userId,
        userId,
        MAX_ACTIVE_SESSIONS_PER_USER
    );


    return {
        token,
        expiresAt
    };
};


/*
 * =====================================================
 * GET CURRENT USER
 * =====================================================
 */

const getCurrentUser = (
    req
) => {

    const cookies =
        parseCookies(
            req.headers.cookie || ""
        );


    const sessionToken =
        cookies[
            SESSION_COOKIE_NAME
        ];


    if (
        !sessionToken
    ) {

        return null;

    }


    const tokenHash =
        hashSessionToken(
            sessionToken
        );


    const session =
        db.prepare(`
            SELECT
                sessions.id AS session_id,
                sessions.expires_at,
                users.id,
                users.name,
                users.email,
                users.role,
                users.created_at
            FROM sessions
            INNER JOIN users
                ON users.id =
                   sessions.user_id
            WHERE sessions.token_hash = ?
            LIMIT 1
        `).get(
            tokenHash
        );


    if (
        !session
    ) {

        return null;

    }


    const expiresAt =
        new Date(
            `${session.expires_at.replace(
                " ",
                "T"
            )}Z`
        );


    /*
     * اگر Session منقضی یا خراب باشد
     */

    if (
        Number.isNaN(
            expiresAt.getTime()
        ) ||
        expiresAt <= new Date()
    ) {

        db.prepare(`
            DELETE FROM sessions
            WHERE id = ?
        `).run(
            session.session_id
        );


        return null;

    }


    return {

        id:
            session.id,

        name:
            session.name,

        email:
            session.email,

        role:
            session.role,

        createdAt:
            session.created_at

    };
};


/*
 * =====================================================
 * LOGIN PAGE DATA
 * =====================================================
 */

const loginPageData = {

    hero: {

        tag:
            "حساب کاربری",

        title:
            "به",

        titleAccent:
            "FITNESS",

        titleSuffix:
            "خوش آمدی.",

        description:
            "برای ادامه مسیر تمرینی، ورود به حساب کاربری خودت را شروع کن."

    },


    intro: {

        tag:
            "ورود امن",

        title:
            "دوباره به",

        titleAccent:
            "مسیرت برگرد.",

        description:
            "با ورود به حساب کاربری، برنامه‌های تمرینی، اطلاعات حساب و مسیر پیشرفت خودت را یک‌جا دنبال کن.",

        features: [

            {

                icon:
                    "bi-person-check-fill",

                title:
                    "دسترسی به حساب شخصی",

                description:
                    "اطلاعات و برنامه‌های اختصاصی خودت"

            },

            {

                icon:
                    "bi-graph-up-arrow",

                title:
                    "پیگیری پیشرفت",

                description:
                    "مسیر تمرینی خودت را منظم دنبال کن"

            }

        ]

    },


    form: {

        eyebrow:
            "حساب کاربری",

        title:
            "وارد حساب خودت شو.",

        icon:
            "bi-box-arrow-in-right",

        email: {

            label:
                "ایمیل",

            placeholder:
                "example@email.com"

        },

        password: {

            label:
                "رمز عبور",

            placeholder:
                "رمز عبور خود را وارد کنید"

        },

        passwordToggle: {

            show:
                "نمایش رمز عبور",

            hide:
                "مخفی کردن رمز عبور"

        },

        forgotPassword:
            "رمز عبور را فراموش کرده‌ای؟",

        submitText:
            "ورود به حساب",

        registerText:
            "حساب کاربری نداری؟",

        registerLinkText:
            "ثبت‌نام کن",

        registerUrl:
            "register.html",

        unavailableMessage:
            "برای ورود امن، اطلاعات حساب شما بررسی و یک Session امن ایجاد می‌شود.",

        forgotPasswordMessage:
            "بازیابی رمز عبور در این نسخه هنوز به سرویس واقعی متصل نشده است."

    }

};


/*
 * =====================================================
 * REGISTER PAGE DATA
 * =====================================================
 */

const registerPageData = {

    hero: {

        tag:
            "حساب کاربری",

        title:
            "مسیرت را با",

        titleAccent:
            "FITNESS",

        titleSuffix:
            "شروع کن.",

        description:
            "یک حساب کاربری بساز و مسیر تمرینی خودت را منظم و هدفمند شروع کن."

    },


    intro: {

        tag:
            "ساخت حساب",

        title:
            "حساب خودت را",

        titleAccent:
            "بساز.",

        description:
            "با ساخت حساب کاربری، آماده‌ای تا برنامه تمرینی، اطلاعات شخصی و مسیر پیشرفتت را در یک محیط منظم دنبال کنی.",

        features: [

            {

                icon:
                    "bi-person-check-fill",

                title:
                    "پروفایل شخصی",

                description:
                    "اطلاعات حساب و مسیر تمرینی خودت"

            },

            {

                icon:
                    "bi-calendar2-check-fill",

                title:
                    "برنامه منظم",

                description:
                    "تمرین‌ها را ساختارمند و قابل پیگیری دنبال کن"

            }

        ]

    },


    form: {

        eyebrow:
            "حساب کاربری",

        title:
            "ثبت‌نام در FITNESS",

        icon:
            "bi-person-plus-fill",

        name: {

            label:
                "نام و نام خانوادگی",

            placeholder:
                "نام و نام خانوادگی خود را وارد کنید"

        },

        email: {

            label:
                "ایمیل",

            placeholder:
                "example@email.com"

        },

        password: {

            label:
                "رمز عبور",

            placeholder:
                "حداقل ۶ کاراکتر"

        },

        passwordConfirm: {

            label:
                "تکرار رمز عبور",

            placeholder:
                "رمز عبور را دوباره وارد کنید"

        },

        passwordToggle: {

            showPassword:
                "نمایش رمز عبور",

            hidePassword:
                "مخفی کردن",

            showConfirm:
                "نمایش تکرار رمز",

            hideConfirm:
                "مخفی کردن"

        },

        submitText:
            "ساخت حساب کاربری",

        loginText:
            "قبلاً حساب داری؟",

        loginLinkText:
            "وارد شو",

        loginUrl:
            "login.html",

        unavailableMessage:
            "اطلاعات ثبت‌نام معتبر است؛ حساب کاربری شما در Database ساخته می‌شود."

    }

};


/*
 * =====================================================
 * LOGIN PAGE API
 * =====================================================
 */

router.get(
    "/auth/login",
    (req, res) => {

        return res.json({

            success:
                true,

            data:
                loginPageData

        });

    }
);


/*
 * =====================================================
 * REGISTER PAGE API
 * =====================================================
 */

router.get(
    "/auth/register",
    (req, res) => {

        return res.json({

            success:
                true,

            data:
                registerPageData

        });

    }
);


/*
 * =====================================================
 * CURRENT USER API
 * =====================================================
 */

router.get(
    "/auth/me",
    (req, res) => {

        const user =
            getCurrentUser(
                req
            );


        if (
            !user
        ) {

            return res.status(
                401
            ).json({

                success:
                    false,

                message:
                    "کاربر وارد نشده است."

            });

        }


        return res.json({

            success:
                true,

            data:
                user

        });

    }
);


/*
 * =====================================================
 * LOGOUT API
 * =====================================================
 */

router.post(
    "/auth/logout",
    (req, res) => {

        const cookies =
            parseCookies(
                req.headers.cookie || ""
            );


        const sessionToken =
            cookies[
                SESSION_COOKIE_NAME
            ];


        if (
            sessionToken
        ) {

            db.prepare(`
                DELETE FROM sessions
                WHERE token_hash = ?
            `).run(
                hashSessionToken(
                    sessionToken
                )
            );

        }


        /*
         * حذف Cookie
         */

        res.setHeader(
            "Set-Cookie",
            buildCookie(
                "",
                0
            )
        );


        return res.json({

            success:
                true,

            message:
                "از حساب کاربری خارج شدید."

        });

    }
);


/*
 * =====================================================
 * LOGIN API
 * =====================================================
 */

router.post(
    "/auth/login",
    (req, res) => {

        /*
         * -----------------------------
         * BODY OBJECT
         * -----------------------------
         */

        if (
            !isPlainObject(
                req.body
            )
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "بدنه درخواست ورود معتبر نیست."

            });

        }


        /*
         * -----------------------------
         * ALLOWED FIELDS
         * -----------------------------
         */

        const allowedFields = [

            "email",

            "password"

        ];


        if (
            !hasOnlyAllowedFields(
                req.body,
                allowedFields
            )
        ) {

            const unknownFields =
                getUnknownFields(
                    req.body,
                    allowedFields
                );


            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    `فیلدهای غیرمجاز در درخواست ورود وجود دارد: ${unknownFields.join(", ")}`

            });

        }


        /*
         * -----------------------------
         * FIELD TYPES
         * -----------------------------
         */

        if (

            typeof req.body.email !==
                "string" ||

            typeof req.body.password !==
                "string"

        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "فرمت فیلدهای ورود صحیح نیست."

            });

        }


        const email =
            req.body.email
                .trim()
                .toLowerCase();


        const password =
            req.body.password;


        /*
         * -----------------------------
         * BASIC VALIDATION
         * -----------------------------
         */

        if (
            !email ||
            !password
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "ایمیل و رمز عبور الزامی است."

            });

        }


        if (
            email.length > 254
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "ایمیل معتبر نیست."

            });

        }


        if (
            password.length > 128
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "رمز عبور بیش از حد طولانی است."

            });

        }


        /*
         * -----------------------------
         * USER LOOKUP
         * -----------------------------
         */

        const user =
            db.prepare(`
                SELECT
                    id,
                    name,
                    email,
                    password_hash,
                    role
                FROM users
                WHERE email = ?
                LIMIT 1
            `).get(
                email
            );


        /*
         * -----------------------------
         * CREDENTIAL CHECK
         * -----------------------------
         */

        if (
            !user ||
            !verifyPassword(
                password,
                user.password_hash
            )
        ) {

            return res.status(
                401
            ).json({

                success:
                    false,

                message:
                    "ایمیل یا رمز عبور صحیح نیست."

            });

        }


        /*
         * -----------------------------
         * CREATE SESSION
         * -----------------------------
         */

        try {

            const session =
                createSession(
                    user.id
                );


            res.setHeader(
                "Set-Cookie",
                buildCookie(
                    session.token,
                    SESSION_DURATION_SECONDS
                )
            );


            return res.json({

                success:
                    true,

                message:
                    "ورود با موفقیت انجام شد.",

                data: {

                    id:
                        user.id,

                    name:
                        user.name,

                    email:
                        user.email,

                    role:
                        user.role

                }

            });

        } catch (error) {

            console.error(
                "Unable to create login session:",
                error
            );


            return res.status(
                500
            ).json({

                success:
                    false,

                message:
                    "ورود انجام نشد. ایجاد Session با خطا مواجه شد."

            });

        }

    }
);


/*
 * =====================================================
 * REGISTER API
 * =====================================================
 */

router.post(
    "/auth/register",
    (req, res) => {

        /*
         * -----------------------------
         * BODY OBJECT
         * -----------------------------
         */

        if (
            !isPlainObject(
                req.body
            )
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "بدنه درخواست ثبت‌نام معتبر نیست."

            });

        }


        /*
         * -----------------------------
         * ALLOWED FIELDS
         * -----------------------------
         */

        const allowedFields = [

            "name",

            "email",

            "password",

            "passwordConfirm"

        ];


        if (
            !hasOnlyAllowedFields(
                req.body,
                allowedFields
            )
        ) {

            const unknownFields =
                getUnknownFields(
                    req.body,
                    allowedFields
                );


            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    `فیلدهای غیرمجاز در درخواست ثبت‌نام وجود دارد: ${unknownFields.join(", ")}`

            });

        }


        /*
         * -----------------------------
         * FIELD TYPES
         * -----------------------------
         */

        if (

            typeof req.body.name !==
                "string" ||

            typeof req.body.email !==
                "string" ||

            typeof req.body.password !==
                "string" ||

            typeof req.body.passwordConfirm !==
                "string"

        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "فرمت فیلدهای ثبت‌نام صحیح نیست."

            });

        }


        const name =
            req.body.name.trim();


        const email =
            req.body.email
                .trim()
                .toLowerCase();


        const password =
            req.body.password;


        const passwordConfirm =
            req.body.passwordConfirm;


        /*
         * -----------------------------
         * NAME VALIDATION
         * -----------------------------
         */

        if (
            !name
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "نام و نام خانوادگی الزامی است."

            });

        }


        if (
            name.length < 3
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "نام باید حداقل ۳ کاراکتر باشد."

            });

        }


        if (
            name.length > 100
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."

            });

        }


        /*
         * -----------------------------
         * EMAIL VALIDATION
         * -----------------------------
         */

        if (
            !email
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "ایمیل الزامی است."

            });

        }


        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(email)
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "فرمت ایمیل صحیح نیست."

            });

        }


        if (
            email.length > 254
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "ایمیل معتبر نیست."

            });

        }


        /*
         * -----------------------------
         * PASSWORD VALIDATION
         * -----------------------------
         */

        if (
            !password
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "رمز عبور الزامی است."

            });

        }


        if (
            password.length < 6
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "رمز عبور باید حداقل ۶ کاراکتر باشد."

            });

        }


        if (
            password.length > 128
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "رمز عبور بیش از حد طولانی است."

            });

        }


        /*
         * -----------------------------
         * PASSWORD CONFIRMATION
         * -----------------------------
         */

        if (
            !passwordConfirm
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "تکرار رمز عبور الزامی است."

            });

        }


        if (
            password !==
            passwordConfirm
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "رمزهای عبور با یکدیگر مطابقت ندارند."

            });

        }


        /*
         * -----------------------------
         * DUPLICATE EMAIL
         * -----------------------------
         */

        const existingUser =
            db.prepare(`
                SELECT
                    id
                FROM users
                WHERE email = ?
                LIMIT 1
            `).get(
                email
            );


        if (
            existingUser
        ) {

            return res.status(
                409
            ).json({

                success:
                    false,

                message:
                    "این ایمیل قبلاً ثبت شده است."

            });

        }


        /*
         * -----------------------------
         * CREATE USER
         * -----------------------------
         */

        try {

            const insertResult =
                db.prepare(`
                    INSERT INTO users (
                        name,
                        email,
                        password_hash,
                        role
                    )
                    VALUES (
                        ?,
                        ?,
                        ?,
                        'user'
                    )
                `).run(

                    name,

                    email,

                    hashPassword(
                        password
                    )

                );


            const createdUser =
                db.prepare(`
                    SELECT
                        id,
                        name,
                        email,
                        role,
                        created_at AS createdAt
                    FROM users
                    WHERE id = ?
                `).get(
                    insertResult.lastInsertRowid
                );


            return res.status(
                201
            ).json({

                success:
                    true,

                message:
                    "حساب کاربری با موفقیت ساخته شد.",

                data:
                    createdUser

            });

        } catch (error) {

            console.error(
                "Unable to create user:",
                error
            );


            return res.status(
                500
            ).json({

                success:
                    false,

                message:
                    "ساخت حساب کاربری با خطا مواجه شد."

            });

        }

    }
);


/*
 * =====================================================
 * EXPORT
 * =====================================================
 */

module.exports = router;