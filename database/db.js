"use strict";

const {
    DatabaseSync
} = require("node:sqlite");

const path =
    require("node:path");

const fs =
    require("node:fs");


/*
 * =====================================================
 * DATABASE PATH
 * =====================================================
 */

const databaseDirectory =
    process.env.DATABASE_DIR ||
    __dirname;

const databasePath =
    path.join(
        databaseDirectory,
        "fitness.db"
    );


/*
 * =====================================================
 * CREATE DATABASE DIRECTORY
 * =====================================================
 */

if (
    !fs.existsSync(
        databaseDirectory
    )
) {

    fs.mkdirSync(
        databaseDirectory,
        {
            recursive: true
        }
    );

}


/*
 * =====================================================
 * OPEN DATABASE
 * =====================================================
 */

const db =
    new DatabaseSync(
        databasePath
    );


/*
 * =====================================================
 * SQLITE SETTINGS
 * =====================================================
 */

db.exec(`
    PRAGMA foreign_keys = ON;
`);


/*
 * =====================================================
 * USERS TABLE
 * =====================================================
 */

db.exec(`
    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT NOT NULL UNIQUE,

        password_hash TEXT NOT NULL,

        role TEXT NOT NULL DEFAULT 'user',

        created_at TEXT NOT NULL DEFAULT (
            datetime('now')
        )

    );
`);


/*
 * =====================================================
 * SESSIONS TABLE
 * =====================================================
 */

db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER NOT NULL,

        token_hash TEXT NOT NULL UNIQUE,

        expires_at TEXT NOT NULL,

        created_at TEXT NOT NULL DEFAULT (
            datetime('now')
        ),

        FOREIGN KEY (
            user_id
        )
        REFERENCES users(id)
        ON DELETE CASCADE

    );
`);


/*
 * =====================================================
 * SESSION INDEXES
 * =====================================================
 */

db.exec(`
    CREATE INDEX IF NOT EXISTS
    idx_sessions_token_hash
    ON sessions(token_hash);
`);

db.exec(`
    CREATE INDEX IF NOT EXISTS
    idx_sessions_user_id
    ON sessions(user_id);
`);

db.exec(`
    CREATE INDEX IF NOT EXISTS
    idx_sessions_expires_at
    ON sessions(expires_at);
`);


/*
 * =====================================================
 * SUCCESS MESSAGE
 * =====================================================
 */

console.log(
    "FITNESS database is ready."
);

console.log(
    `Database path: ${databasePath}`
);


/*
 * =====================================================
 * EXPORT
 * =====================================================
 */

module.exports =
    db;