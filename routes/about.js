"use strict";

const express = require("express");

const router = express.Router();

const aboutData = {
    hero: {
        tag: "درباره FITNESS",
        title: "درباره",
        titleAccent: "ما",
        description:
            "FITNESS با هدف ساختن یک مسیر ساده، حرفه‌ای و قابل پیگیری برای تمرین، برنامه‌ریزی و پیشرفت طراحی شده است."
    },

    main: {
        tag: "داستان FITNESS",
        image: "/images/gym.png",
        imageAlt: "تمرین در مجموعه FITNESS",

        title: "تمرین هدفمند،",
        titleAccent: "پیشرفت واقعی.",

        description1:
            "FITNESS برای ساختن یک تجربه ساده، منظم و حرفه‌ای در مسیر تمرین شکل گرفته است؛ جایی که برنامه‌ریزی، تمرین و پیگیری پیشرفت در کنار هم قرار می‌گیرند تا مسیر روشن‌تر و قابل دنبال‌کردن باشد.",

        description2:
            "ما تلاش می‌کنیم ابزارها و محتوایی فراهم کنیم که برای هدف‌های مختلف و سطوح متفاوت تمرینی قابل استفاده باشد و هر ورزشکار بتواند مسیر خودش را با ساختاری مشخص دنبال کند.",

        features: [
            {
                icon: "bi-person-check-fill",
                title: "برنامه متناسب با هدف",
                description:
                    "مسیرهای تمرینی برای هدف‌ها و سطوح مختلف طراحی شده‌اند."
            },
            {
                icon: "bi-shield-check",
                title: "مربی‌های حرفه‌ای",
                description:
                    "مربی‌ها با تخصص‌های مختلف برای انتخاب مسیر مناسب در دسترس هستند."
            },
            {
                icon: "bi-graph-up-arrow",
                title: "پیگیری پیشرفت",
                description:
                    "پیشرفت تمرینی را مرحله‌به‌مرحله دنبال کن و مسیرت را بهتر بشناس."
            },
            {
                icon: "bi-calendar2-check-fill",
                title: "مسیر منظم و مشخص",
                description:
                    "برنامه منظم کمک می‌کند تمرین از حالت پراکنده خارج شود."
            }
        ]
    },

    principles: {
        tag: "رویکرد FITNESS",
        title: "اصولی که مسیر ما را",
        titleAccent: "می‌سازند.",
        description:
            "هدف فقط انجام تمرین نیست؛ مهم این است که تمرین، ساختار و پیشرفت در یک مسیر مشخص کنار هم قرار بگیرند.",

        items: [
            {
                number: "۰۱",
                icon: "bi-bullseye",
                title: "هدف‌محوری"
            },
            {
                number: "۰۲",
                icon: "bi-diagram-3-fill",
                title: "ساختار مشخص"
            },
            {
                number: "۰۳",
                icon: "bi-activity",
                title: "پیشرفت مرحله‌ای"
            },
            {
                number: "۰۴",
                icon: "bi-arrow-repeat",
                title: "تداوم و پیگیری"
            }
        ]
    },

    cta: {
        tag: "قدم بعدی",
        title: "مسیرت را روشن‌تر کن،",
        titleAccent: "از همین امروز شروع کن.",
        description:
            "از بین برنامه‌های تمرینی و مسیرهای مختلف، گزینه‌ای را انتخاب کن که با هدف و سطح فعلی تو هماهنگ باشد و تمرینت را با ساختاری مشخص ادامه بده.",

        features: [
            "انتخاب برنامه متناسب با هدف",
            "بررسی مسیرهای تمرینی مختلف",
            "شروع مرحله‌به‌مرحله و منظم",
            "امکان آشنایی با مربی‌های مجموعه"
        ],

        note:
            "انتخاب درست از شناخت هدف، سطح و مسیر مناسب شروع می‌شود."
    }
};

router.get("/about", (req, res) => {
    res.json({
        success: true,
        data: aboutData
    });
});

module.exports = router;