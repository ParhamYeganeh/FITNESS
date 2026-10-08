"use strict";

const express = require("express");

const db = require("./database/db");

const statusRoutes = require("./routes/status");
const programRoutes = require("./routes/programs");
const trainerRoutes = require("./routes/trainers");
const aboutRoutes = require("./routes/about");
const pricingRoutes = require("./routes/pricing");
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

const PORT = 3000;


/*
 * =====================================================
 * HIDE EXPRESS INFORMATION
 * =====================================================
 */

app.disable("x-powered-by");


/*
 * =====================================================
 * LOGIN RATE LIMIT CONFIG
 * =====================================================
 */

const LOGIN_RATE_LIMIT_WINDOW_MS =
    10 * 60 * 1000;

const LOGIN_RATE_LIMIT_MAX_REQUESTS =
    10;

const loginAttempts = new Map();


/*
 * =====================================================
 * LOGIN RATE LIMIT CLEANUP
 * =====================================================
 */

const cleanupLoginAttempts = () => {

    const now = Date.now();

    for (const [
        ip,
        timestamps
    ] of loginAttempts.entries()) {

        const validTimestamps =
            timestamps.filter(
                (timestamp) =>
                    now - timestamp <
                    LOGIN_RATE_LIMIT_WINDOW_MS
            );


        if (
            validTimestamps.length === 0
        ) {

            loginAttempts.delete(ip);

            continue;
        }


        loginAttempts.set(
            ip,
            validTimestamps
        );
    }
};


/*
 * =====================================================
 * LOGIN RATE LIMIT MIDDLEWARE
 * =====================================================
 */

const loginRateLimit = (
    req,
    res,
    next
) => {

    if (
        req.method !== "POST" ||
        req.path !== "/api/auth/login"
    ) {

        return next();

    }


    cleanupLoginAttempts();


    const ip =
        req.ip ||
        req.socket?.remoteAddress ||
        "unknown";


    const now = Date.now();


    const previousAttempts =
        loginAttempts.get(ip) || [];


    const recentAttempts =
        previousAttempts.filter(
            (timestamp) =>
                now - timestamp <
                LOGIN_RATE_LIMIT_WINDOW_MS
        );


    if (
        recentAttempts.length >=
        LOGIN_RATE_LIMIT_MAX_REQUESTS
    ) {

        const oldestAttempt =
            recentAttempts[0];


        const retryAfterMs =
            LOGIN_RATE_LIMIT_WINDOW_MS -
            (now - oldestAttempt);


        const retryAfterSeconds =
            Math.max(
                1,
                Math.ceil(
                    retryAfterMs / 1000
                )
            );


        res.setHeader(
            "Retry-After",
            retryAfterSeconds
        );


        return res.status(429).json({

            success:
                false,

            message:
                "تعداد تلاش‌های ورود بیش از حد مجاز است. لطفاً چند دقیقه بعد دوباره تلاش کنید."

        });

    }


    recentAttempts.push(
        now
    );


    loginAttempts.set(
        ip,
        recentAttempts
    );


    return next();
};


/*
 * =====================================================
 * SECURITY HEADERS
 * =====================================================
 */

const securityHeaders = (
    req,
    res,
    next
) => {

    res.setHeader(
        "X-Content-Type-Options",
        "nosniff"
    );


    res.setHeader(
        "X-Frame-Options",
        "SAMEORIGIN"
    );


    res.setHeader(
        "Referrer-Policy",
        "strict-origin-when-cross-origin"
    );


    res.setHeader(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );


    next();
};


/*
 * =====================================================
 * CSRF / ORIGIN PROTECTION
 * =====================================================
 */

const SAFE_METHODS = new Set([
    "GET",
    "HEAD",
    "OPTIONS"
]);


const allowedOrigins =
    new Set(
        (
            process.env.ALLOWED_ORIGINS ||
            "http://localhost:3000,http://127.0.0.1:3000"
        )
            .split(",")
            .map(
                (origin) =>
                    origin.trim()
            )
            .filter(Boolean)
    );


const csrfProtection = (
    req,
    res,
    next
) => {

    if (
        SAFE_METHODS.has(
            req.method
        ) ||
        !req.path.startsWith(
            "/api/"
        )
    ) {

        return next();

    }


    /*
     * -------------------------------------------------
     * Fetch Metadata
     * -------------------------------------------------
     */

    const fetchSite =
        String(
            req.headers[
                "sec-fetch-site"
            ] || ""
        )
            .trim()
            .toLowerCase();


    if (
        fetchSite ===
        "cross-site"
    ) {

        return res.status(403).json({

            success:
                false,

            message:
                "درخواست Cross-Site مجاز نیست."

        });

    }


    /*
     * -------------------------------------------------
     * Origin
     * -------------------------------------------------
     */

    const origin =
        req.headers.origin;


    if (origin) {

        if (
            origin === "null" ||
            !allowedOrigins.has(
                origin
            )
        ) {

            return res.status(403).json({

                success:
                    false,

                message:
                    "Origin این درخواست مجاز نیست."

            });

        }


        return next();

    }


    /*
     * -------------------------------------------------
     * Referer fallback
     * -------------------------------------------------
     */

    const referer =
        req.headers.referer;


    if (referer) {

        try {

            const refererOrigin =
                new URL(
                    referer
                ).origin;


            if (
                !allowedOrigins.has(
                    refererOrigin
                )
            ) {

                return res.status(403).json({

                    success:
                        false,

                    message:
                        "منبع این درخواست مجاز نیست."

                });

            }

        } catch (error) {

            return res.status(403).json({

                success:
                    false,

                message:
                    "Referer این درخواست معتبر نیست."

            });

        }

    }


    return next();
};


/*
 * =====================================================
 * DATABASE CONNECTION CHECK
 * =====================================================
 */

const usersTable =
    db.prepare(`
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
        AND name = 'users'
    `).get();


if (!usersTable) {

    throw new Error(
        "Users table was not found in the FITNESS database."
    );

}


console.log(
    "FITNESS database connection verified."
);


/*
 * =====================================================
 * MIDDLEWARE
 * =====================================================
 */

app.use(
    express.json({
        limit: "16kb",
        strict: true
    })
);


app.use(
    securityHeaders
);


app.use(
    csrfProtection
);


app.use(
    loginRateLimit
);


/*
 * =====================================================
 * API ROUTES
 * =====================================================
 */

app.use(
    "/api",
    statusRoutes
);

app.use(
    "/api",
    programRoutes
);

app.use(
    "/api",
    trainerRoutes
);

app.use(
    "/api",
    aboutRoutes
);

app.use(
    "/api",
    pricingRoutes
);

app.use(
    "/api",
    contactRoutes
);

app.use(
    "/api",
    authRoutes
);

app.use(
    "/api",
    adminRoutes
);


/*
 * =====================================================
 * PROTECT SENSITIVE FILES
 * =====================================================
 *
 * این فایل‌ها و پوشه‌ها نباید از طریق Browser
 * قابل دسترسی باشند.
 */

const restrictedDirectories = [

    "/database",

    "/routes",

    "/node_modules",

    "/.git"

];


const restrictedFiles = new Set([

    "/server.js",

    "/package.json",

    "/package-lock.json"

]);


const normalizeRequestPath = (
    requestPath
) => {

    try {

        return decodeURIComponent(
            requestPath
        );

    } catch (error) {

        return requestPath;

    }

};


const isRestrictedPath = (
    requestPath
) => {

    const normalizedPath =
        normalizeRequestPath(
            requestPath
        );


    if (
        restrictedFiles.has(
            normalizedPath
        )
    ) {

        return true;

    }


    return restrictedDirectories
        .some(
            (directory) =>
                normalizedPath ===
                    directory ||
                normalizedPath.startsWith(
                    `${directory}/`
                )
        );

};


/*
 * =====================================================
 * SENSITIVE STATIC FILE PROTECTION
 * =====================================================
 */

app.use(
    (req, res, next) => {

        /*
         * مسیرهای API نباید توسط این Middleware
         * مسدود شوند.
         */

        if (
            req.path.startsWith(
                "/api/"
            )
        ) {

            return next();

        }


        if (
            isRestrictedPath(
                req.path
            )
        ) {

            return res.status(
                404
            ).send(
                "Not Found"
            );

        }


        return next();

    }
);


/*
 * =====================================================
 * STATIC FRONTEND
 * =====================================================
 */

app.use(
    express.static(
        __dirname,
        {
            index: false
        }
    )
);


/*
 * =====================================================
 * API 404 HANDLER
 * =====================================================
 */

app.use(
    "/api",
    (req, res) => {

        return res.status(404).json({

            success:
                false,

            message:
                "API موردنظر پیدا نشد."

        });

    }
);


/*
 * =====================================================
 * GLOBAL ERROR HANDLER
 * =====================================================
 */

app.use(
    (
        error,
        req,
        res,
        next
    ) => {

        /*
         * اگر Response قبلاً شروع شده باشد،
         * کنترل به Error Handler داخلی Express
         * منتقل می‌شود.
         */

        if (
            res.headersSent
        ) {

            return next(
                error
            );

        }


        /*
         * جزئیات خطا فقط در Server
         * ثبت می‌شود.
         */

        console.error(
            "FITNESS Server Error:",
            error
        );


        /*
         * JSON Parse Error
         */

        if (
            error?.type ===
            "entity.parse.failed"
        ) {

            return res.status(
                400
            ).json({

                success:
                    false,

                message:
                    "بدنه JSON درخواست معتبر نیست."

            });

        }


        /*
         * Payload Too Large
         */

        if (
            error?.type ===
            "entity.too.large"
        ) {

            return res.status(
                413
            ).json({

                success:
                    false,

                message:
                    "اندازه درخواست بیش از حد مجاز است."

            });

        }


        /*
         * Unsupported Content-Type
         */

        if (
            error?.type ===
            "encoding.unsupported"
        ) {

            return res.status(
                415
            ).json({

                success:
                    false,

                message:
                    "نوع محتوای درخواست پشتیبانی نمی‌شود."

            });

        }


        /*
         * Generic Error
         */

        return res.status(
            500
        ).json({

            success:
                false,

            message:
                "خطای داخلی سرور رخ داد."

        });

    }
);


/*
 * =====================================================
 * SERVER
 * =====================================================
 */

app.listen(
    PORT,
    () => {

        console.log(
            `FITNESS server is running on http://localhost:${PORT}`
        );

    }
);