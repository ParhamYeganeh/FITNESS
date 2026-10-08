"use strict";

const express = require("express");

const router = express.Router();


/* =================================
   PROGRAM SUMMARY DATA
================================= */

const programs = [
    {
        id: 1,
        slug: "muscle",
        category: "muscle",
        categoryTitle: "عضله‌سازی",
        title: "برنامه حجم و عضله‌سازی",
        level: "متوسط",
        description:
            "برنامه‌ای برای افزایش حجم عضلات و ساختن بدنی قدرتمند و متناسب.",
        durationWeeks: 8,
        daysPerWeek: 4,
        image: "/images/body-building.jfif"
    },

    {
        id: 2,
        slug: "fat-loss",
        category: "fat-loss",
        categoryTitle: "چربی‌سوزی",
        title: "برنامه چربی‌سوزی و فرم‌دهی",
        level: "مبتدی",
        description:
            "ترکیبی از تمرینات هوازی و قدرتی برای کاهش چربی و بهبود فرم بدن.",
        durationWeeks: 6,
        daysPerWeek: 3,
        image: "/images/fat-loss.jfif"
    },

    {
        id: 3,
        slug: "strength",
        category: "strength",
        categoryTitle: "قدرت",
        title: "برنامه افزایش قدرت",
        level: "پیشرفته",
        description:
            "تمرکز بر حرکات پایه و افزایش تدریجی قدرت برای عملکرد بهتر در تمرینات.",
        durationWeeks: 10,
        daysPerWeek: 5,
        image: "/images/strengh.jfif"
    },

    {
        id: 4,
        slug: "fitness",
        category: "fitness",
        categoryTitle: "Fitness",
        title: "برنامه آمادگی جسمانی",
        level: "مبتدی",
        description:
            "برنامه‌ای متعادل برای افزایش استقامت، تحرک و آمادگی عمومی بدن.",
        durationWeeks: 8,
        daysPerWeek: 3,
        image: "/images/fitness.jfif"
    }
];


/* =================================
   PROGRAM DETAIL DATA
================================= */

const programDetails = {

    muscle: {
        ...programs[0],
        headline: "قدرت بیشتر،",
        headlineAccent: "بدن قوی‌تر.",
        badge: "برنامه ویژه عضله‌سازی",
        sessionMinutes: 60,
        overviewTitle: "یک مسیر مشخص برای",
        overviewTitleAccent: "پیشرفت واقعی.",

        overviewParagraphs: [
            "برنامه حجم و عضله‌سازی برای افرادی طراحی شده که می‌خواهند تمرینات خود را از حالت پراکنده خارج کنند و با یک ساختار منظم، روی افزایش قدرت و حجم عضلانی تمرکز داشته باشند.",

            "در طول این برنامه، تمرینات به‌صورت مرحله‌ای تنظیم می‌شوند تا بتوانی روند پیشرفت خود را بهتر دنبال کنی و با توجه به سطح تمرینی، فشار مناسب را تجربه کنی."
        ],

        highlights: [
            ["هدف اصلی", "افزایش حجم و قدرت"],
            ["مناسب برای", "سطح متوسط"],
            ["تمرکز برنامه", "Progressive Overload"],
            ["سبک تمرین", "قدرتی + مقاومتی"]
        ],

        summaryRows: [
            ["مدت", "۸ هفته"],
            ["تعداد جلسات", "۴ جلسه در هفته"],
            ["زمان هر جلسه", "حدود ۶۰ دقیقه"],
            ["سطح تمرین", "متوسط"]
        ],

        note:
            "برای گرفتن نتیجه بهتر، اجرای منظم تمرین‌ها و رعایت زمان استراحت بین جلسات اهمیت زیادی دارد.",

        accessFeatures: [
            "دسترسی به برنامه کامل ۸ هفته‌ای",
            "جزئیات کامل تمام حرکات",
            "ست، تکرار و زمان استراحت",
            "پیگیری روند پیشرفت"
        ],

        trainer: {
            id: 1,
            name: "علی رضایی",
            role: "مربی بدنسازی و تمرینات قدرتی",
            image: "/images/ali-rezaei.jfif",

            description:
                "علی با تمرکز روی تمرینات قدرتی، افزایش حجم عضلات و طراحی مسیرهای تمرینی ساختاریافته، به اعضای FITNESS کمک می‌کند تمرینات خود را منظم‌تر و هدفمندتر دنبال کنند.",

            years: "۸+",
            students: "۱۲۰۰+",
            programsCount: "۱۵+",

            tags: [
                "عضله‌سازی",
                "تمرینات قدرتی",
                "Progressive Overload"
            ]
        }
    },


    "fat-loss": {
        ...programs[1],

        headline: "چربی کمتر،",
        headlineAccent: "فرم بهتر.",
        badge: "برنامه ویژه چربی‌سوزی",
        sessionMinutes: 50,

        overviewTitle: "یک مسیر ساده برای",
        overviewTitleAccent: "سبک‌تر شدن.",

        overviewParagraphs: [
            "برنامه چربی‌سوزی و فرم‌دهی برای افرادی طراحی شده که می‌خواهند با ترکیبی از تمرینات هوازی و مقاومتی، روند تمرین منظم‌تری داشته باشند.",

            "ساختار برنامه به شکلی تنظیم شده که در کنار افزایش فعالیت بدنی، روی حفظ کیفیت حرکت و ایجاد یک روتین قابل ادامه تمرکز داشته باشی."
        ],

        highlights: [
            ["هدف اصلی", "کاهش چربی و فرم‌دهی"],
            ["مناسب برای", "سطح مبتدی"],
            ["تمرکز برنامه", "Cardio + Resistance"],
            ["سبک تمرین", "هوازی + مقاومتی"]
        ],

        summaryRows: [
            ["مدت", "۶ هفته"],
            ["تعداد جلسات", "۳ جلسه در هفته"],
            ["زمان هر جلسه", "حدود ۵۰ دقیقه"],
            ["سطح تمرین", "مبتدی"]
        ],

        note:
            "ثبات در اجرای جلسات و توجه به ریکاوری، بخش مهمی از مسیر چربی‌سوزی و فرم‌دهی است.",

        accessFeatures: [
            "دسترسی به برنامه کامل ۶ هفته‌ای",
            "جلسات هوازی و مقاومتی",
            "جزئیات تمرین و زمان استراحت",
            "پیگیری روند پیشرفت"
        ],

        trainer: {
            id: 2,
            name: "سارا محمدی",
            role: "مربی Fitness",
            image: "/images/sara-mohammadi.jfif",

            description:
                "سارا با تمرکز روی تمرین ترکیبی، انعطاف‌پذیری و ساختن عادت‌های تمرینی پایدار، مسیر قابل ادامه‌ای برای بهبود آمادگی بدنی طراحی می‌کند.",

            years: "۶+",
            students: "۱۸۰+",
            programsCount: "۱۲+",

            tags: [
                "Fitness",
                "Mobility",
                "چربی‌سوزی"
            ]
        }
    },


    strength: {
        ...programs[2],

        headline: "قدرت واقعی،",
        headlineAccent: "عملکرد بهتر.",
        badge: "برنامه ویژه قدرت",
        sessionMinutes: 65,

        overviewTitle: "پایه‌ای محکم برای",
        overviewTitleAccent: "قدرت بیشتر.",

        overviewParagraphs: [
            "برنامه افزایش قدرت برای ورزشکارانی طراحی شده که می‌خواهند روی حرکات پایه، کنترل فشار تمرینی و بهبود عملکرد تمرکز کنند.",

            "پیشرفت در این مسیر مرحله‌ای است و تلاش می‌کند افزایش بار تمرینی را با کیفیت اجرای حرکات و مدیریت خستگی هماهنگ نگه دارد."
        ],

        highlights: [
            ["هدف اصلی", "افزایش قدرت"],
            ["مناسب برای", "سطح پیشرفته"],
            ["تمرکز برنامه", "Progressive Overload"],
            ["سبک تمرین", "قدرتی + پایه"]
        ],

        summaryRows: [
            ["مدت", "۱۰ هفته"],
            ["تعداد جلسات", "۵ جلسه در هفته"],
            ["زمان هر جلسه", "حدود ۶۵ دقیقه"],
            ["سطح تمرین", "پیشرفته"]
        ],

        note:
            "در مسیر افزایش قدرت، تکنیک صحیح و کنترل فشار تمرینی مهم‌تر از عجله برای افزایش وزنه است.",

        accessFeatures: [
            "دسترسی به برنامه کامل ۱۰ هفته‌ای",
            "تمرکز روی حرکات پایه",
            "ست، تکرار و زمان استراحت",
            "پیگیری پیشرفت قدرت"
        ],

        trainer: {
            id: 3,
            name: "امیر کریمی",
            role: "مربی تمرینات قدرتی",
            image: "/images/amir-karimi.jfif",

            description:
                "امیر روی توسعه قدرت، کنترل بار تمرینی و طراحی مسیرهای ساختاریافته برای ورزشکاران با تجربه تمرکز دارد.",

            years: "۷+",
            students: "۲۲۰+",
            programsCount: "۱۴+",

            tags: [
                "Strength",
                "Power",
                "Progressive Overload"
            ]
        }
    },


    fitness: {
        ...programs[3],

        headline: "بدن آماده‌تر،",
        headlineAccent: "زندگی فعال‌تر.",
        badge: "برنامه ویژه Fitness",
        sessionMinutes: 45,

        overviewTitle: "یک شروع منظم برای",
        overviewTitleAccent: "آمادگی بیشتر.",

        overviewParagraphs: [
            "برنامه آمادگی جسمانی برای افرادی طراحی شده که می‌خواهند با یک روتین متعادل، استقامت، تحرک و آمادگی عمومی بدن را بهتر کنند.",

            "تمرین‌ها با ساختاری ساده و قابل دنبال‌کردن کنار هم قرار گرفته‌اند تا بتوانی با ثبات بیشتر، پایه تمرینی مناسبی بسازی."
        ],

        highlights: [
            ["هدف اصلی", "آمادگی جسمانی"],
            ["مناسب برای", "سطح مبتدی"],
            ["تمرکز برنامه", "استقامت و تحرک"],
            ["سبک تمرین", "ترکیبی و کاربردی"]
        ],

        summaryRows: [
            ["مدت", "۸ هفته"],
            ["تعداد جلسات", "۳ جلسه در هفته"],
            ["زمان هر جلسه", "حدود ۴۵ دقیقه"],
            ["سطح تمرین", "مبتدی"]
        ],

        note:
            "برای ساختن آمادگی پایدار، ثبات در تمرین و توجه به کیفیت حرکت اهمیت زیادی دارد.",

        accessFeatures: [
            "دسترسی به برنامه کامل ۸ هفته‌ای",
            "تمرینات ترکیبی و کاربردی",
            "جزئیات تمرین و زمان استراحت",
            "پیگیری روند پیشرفت"
        ],

        trainer: {
            id: 4,
            name: "نگار احمدی",
            role: "مربی Fitness و آمادگی جسمانی",
            image: "/images/negar-ahmadi.jfif",

            description:
                "نگار با تمرکز روی Fitness، تحرک و آمادگی عمومی بدن، برنامه‌هایی ساده و قابل ادامه برای ساختن روتین تمرینی پایدار طراحی می‌کند.",

            years: "۵+",
            students: "۱۶۰+",
            programsCount: "۱۰+",

            tags: [
                "Fitness",
                "Mobility",
                "آمادگی جسمانی"
            ]
        }
    }
};


/* =================================
   GET ALL PROGRAMS
================================= */

router.get(
    "/programs",
    (req, res) => {

        res.json({
            success: true,
            count: programs.length,
            data: programs
        });

    }
);


/* =================================
   GET PROGRAM BY SLUG
================================= */

router.get(
    "/programs/:slug",
    (req, res) => {

        const slug =
            String(req.params.slug)
                .trim()
                .toLowerCase();


        const program =
            programDetails[slug];


        if (!program) {

            return res.status(404).json({
                success: false,
                message:
                    "برنامه موردنظر پیدا نشد."
            });

        }


        return res.json({
            success: true,
            data: program
        });

    }
);


module.exports = router;