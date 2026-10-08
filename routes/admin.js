"use strict";

const express = require("express");
const {
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
    "fitness_session";


/*
 * =====================================================
 * COOKIE PARSER
 * =====================================================
 */

const parseCookies = (cookieHeader = "") => {

    return cookieHeader
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .reduce((cookies, part) => {

            const separatorIndex =
                part.indexOf("=");

            if (separatorIndex === -1) {
                return cookies;
            }

            const key =
                part
                    .slice(0, separatorIndex)
                    .trim();

            const value =
                part
                    .slice(separatorIndex + 1)
                    .trim();

            cookies[key] =
                decodeURIComponent(value);

            return cookies;

        }, {});
};


/*
 * =====================================================
 * SESSION TOKEN HASH
 * =====================================================
 */

const hashSessionToken = (
    token
) => {

    return createHash("sha256")
        .update(token)
        .digest("hex");
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
        cookies[SESSION_COOKIE_NAME];

    if (!sessionToken) {
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
                ON users.id = sessions.user_id
            WHERE sessions.token_hash = ?
            LIMIT 1
        `).get(
            tokenHash
        );

    if (!session) {
        return null;
    }


    /*
     * ---------------------------------------------
     * CHECK SESSION EXPIRATION
     * ---------------------------------------------
     */

    const expiresAt =
        new Date(
            `${session.expires_at.replace(" ", "T")}Z`
        );

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


    /*
     * ---------------------------------------------
     * RETURN SAFE USER DATA
     * ---------------------------------------------
     */

    return {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        createdAt: session.created_at
    };
};


/*
 * =====================================================
 * ADMIN AUTHORIZATION MIDDLEWARE
 * =====================================================
 */

const requireAdmin = (
    req,
    res,
    next
) => {

    const user =
        getCurrentUser(req);

    if (!user) {

        return res.status(401).json({
            success: false,
            message:
                "برای دسترسی به این بخش باید وارد حساب کاربری شوید."
        });
    }


    if (
        user.role !==
        "admin"
    ) {

        return res.status(403).json({
            success: false,
            message:
                "شما دسترسی لازم برای ورود به پنل ادمین را ندارید."
        });
    }


    req.user =
        user;

    next();
};


/*
 * =====================================================
 * ADMIN AUTH CHECK
 * =====================================================
 */

router.get(
    "/admin/me",
    requireAdmin,
    (req, res) => {

        return res.json({
            success: true,
            data: req.user
        });

    }
);


/*
 * =====================================================
 * GET USERS
 * =====================================================
 */

router.get(
    "/admin/users",
    requireAdmin,
    (req, res) => {

        const users =
            db.prepare(`
                SELECT
                    id,
                    name,
                    email,
                    role,
                    created_at AS createdAt
                FROM users
                ORDER BY id DESC
            `).all();

        return res.json({
            success: true,
            count: users.length,
            data: users
        });

    }
);


/*
 * =====================================================
 * ADMIN SUMMARY
 * =====================================================
 */

router.get(
    "/admin/summary",
    requireAdmin,
    (req, res) => {

        const totalUsers =
            db.prepare(`
                SELECT COUNT(*) AS count
                FROM users
            `).get().count;

        const adminUsers =
            db.prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE role = 'admin'
            `).get().count;

        const normalUsers =
            db.prepare(`
                SELECT COUNT(*) AS count
                FROM users
                WHERE role = 'user'
            `).get().count;

        return res.json({
            success: true,
            data: {
                totalUsers,
                adminUsers,
                normalUsers
            }
        });

    }
);


module.exports = router;