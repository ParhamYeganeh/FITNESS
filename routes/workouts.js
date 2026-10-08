"use strict";

const express = require("express");

const router = express.Router();


/* =================================
   WORKOUT SESSION TEMPLATES
================================= */

const sessionTemplates = {
    upperPush: {
        icon: "bi-barbell",
        day: "شنبه",
        title: "سینه و پشت بازو",
        description: "تمرکز روی حرکات پوششی بالاتنه با تأکید بر کنترل حرکت و پیشرفت تدریجی.",
        exercises: [
            {
                name: "پرس سینه هالتر",
                sets: "۴ ست",
                reps: "۸–۱۰ تکرار",
                rest: "۹۰ ثانیه"
            },
            {
                name: "پرس بالا سینه دمبل",
                sets: "۳ ست",
                reps: "۱۰–۱۲ تکرار",
                rest: "۷۵ ثانیه"
            },
            {
                name: "فلای دستگاه",
                sets: "۳ ست",
                reps: "۱۲ تکرار",
                rest: "۶۰ ثانیه"
            },
            {
                name: "پشت بازو سیم‌کش",
                sets: "۳ ست",
                reps: "۱۰–۱۲ تکرار",
                rest: "۶۰ ثانیه"
            }
        ]
    },


    upperPull: {
        icon: "bi-person-arms-up",
        day: "یکشنبه",
        title: "زیربغل و جلو بازو",
        description: "ترکیبی از حرکات کششی برای تقویت عضلات پشت، زیربغل و جلو بازو.",
        exercises: [
            {
                name: "لت سیم‌کش",
                sets: "۴ ست",
                reps: "۸–۱۰ تکرار",
                rest: "۹۰ ثانیه"
            },
            {
                name: "قایقی سیم‌کش",
                sets: "۳ ست",
                reps: "۱۰–۱۲ تکرار",
                rest: "۷۵ ثانیه"
            },
            {
                name: "جلو بازو دمبل",
                sets: "۳ ست",
                reps: "۱۰–۱۲ تکرار",
                rest: "۶۰ ثانیه"
            },
            {
                name: "جلو بازو لاری",
                sets: "۳ ست",
                reps: "۱۰ تکرار",
                rest: "۶۰ ثانیه"
            }
        ]
    },


    coreShoulder: {
        icon: "bi-person-walking",
        day: "سه‌شنبه",
        title: "سرشانه و Core",
        description: "تمرکز روی ثبات شانه و عضلات مرکزی بدن برای اجرای بهتر حرکات.",
        exercises: [
            {
                name: "پرس سرشانه دمبل",
                sets: "۴ ست",
                reps: "۸–۱۰ تکرار",
                rest: "۹۰ ثانیه"
            },
            {
                name: "نشر جانب دمبل",
                sets: "۳ ست",
                reps: "۱۲ تکرار",
                rest: "۶۰ ثانیه"
            },
            {
                name: "نشر خم",
                sets: "۳ ست",
                reps: "۱۲ تکرار",
                rest: "۶۰ ثانیه"
            },
            {
                name: "کرانچ",
                sets: "۳ ست",
                reps: "۱۵ تکرار",
                rest: "۴۵ ثانیه"
            }
        ]
    },


    lower: {
        icon: "bi-person-standing",
        day: "چهارشنبه",
        title: "پا و پایین‌تنه",
        description: "جلسه کامل پایین‌تنه با تمرکز روی حرکات ترکیبی و کنترل فشار تمرینی.",
        exercises: [
            {
                name: "اسکوات",
                sets: "۴ ست",
                reps: "۸–۱۰ تکرار",
                rest: "۱۲۰ ثانیه"
            },
            {
                name: "پرس پا",
                sets: "۳ ست",
                reps: "۱۰–۱۲ تکرار",
                rest: "۹۰ ثانیه"
            },
            {
                name: "پشت پا دستگاه",
                sets: "۳ ست",
                reps: "۱۲ تکرار",
                rest: "۶۰ ثانیه"
            },
            {
                name: "ساق پا",
                sets: "۳ ست",
                reps: "۱۵ تکرار",
                rest: "۴۵ ثانیه"
            }
        ]
    },


    cardio: {
        icon: "bi-heart-pulse",
        day: "دوشنبه",
        title: "هوازی و استقامت",
        description: "جلسه هوازی با شدت قابل کنترل برای بهبود استقامت و ایجاد روتین منظم.",
        exercises: [
            {
                name: "راه رفتن شیب‌دار",
                sets: "۱ بخش",
                reps: "۲۰ دقیقه",
                rest: "—"
            },
            {
                name: "دوچرخه ثابت",
                sets: "۳ دور",
                reps: "۴ دقیقه",
                rest: "۶۰ ثانیه"
            },
            {
                name: "روئینگ",
                sets: "۳ ست",
                reps: "۲ دقیقه",
                rest: "۶۰ ثانیه"
            },
            {
                name: "کشش پایانی",
                sets: "۱ بخش",
                reps: "۸ دقیقه",
                rest: "—"
            }
        ]
    },


    fullBody: {
        icon: "bi-activity",
        day: "پنجشنبه",
        title: "تمرین تمام‌بدن",
        description: "جلسه ترکیبی برای حفظ کیفیت حرکت و تقویت الگوهای اصلی تمرین.",
        exercises: [
            {
                name: "اسکوات جام",
                sets: "۳ ست",
                reps: "۱۰ تکرار",
                rest: "۷۵ ثانیه"
            },
            {
                name: "پرس دمبل",
                sets: "۳ ست",
                reps: "۱۰ تکرار",
                rest: "۷۵ ثانیه"
            },
            {
                name: "قایقی دمبل",
                sets: "۳ ست",
                reps: "۱۰ تکرار",
                rest: "۷۵ ثانیه"
            },
            {
                name: "پلانک",
                sets: "۳ ست",
                reps: "۳۰–۴۵ ثانیه",
                rest: "۴۵ ثانیه"
            }
        ]
    },


    mobility: {
        icon: "bi-universal-access",
        day: "جمعه",
        title: "تحرک و ریکاوری",
        description: "جلسه سبک برای بهبود دامنه حرکت و ایجاد فاصله مناسب بین تمرین‌های اصلی.",
        exercises: [
            {
                name: "تحرک مفصل ران",
                sets: "۲ دور",
                reps: "۸ تکرار",
                rest: "۳۰ ثانیه"
            },
            {
                name: "تحرک شانه",
                sets: "۲ دور",
                reps: "۸ تکرار",
                rest: "۳۰ ثانیه"
            },
            {
                name: "کشش همسترینگ",
                sets: "۲ دور",
                reps: "۳۰ ثانیه",
                rest: "۳۰ ثانیه"
            },
            {
                name: "تنفس و ریکاوری",
                sets: "۱ بخش",
                reps: "۵ دقیقه",
                rest: "—"
            }
        ]
    }
};


/* =================================
   PROGRAM PLAN CONFIG
   Demo workout schedules used until
   workout data moves to Database.
================================= */

const planConfig = {

    muscle: {
        title: "مسیر تمرینی عضله‌سازی",

        description:
            "جلسات تمرینی برنامه عضله‌سازی را هفته‌به‌هفته دنبال کن و روند پیشرفت خودت را منظم نگه دار.",

        weeks: 8,

        sessions: [
            "upperPush",
            "upperPull",
            "coreShoulder",
            "lower"
        ]
    },


    "fat-loss": {
        title: "مسیر تمرینی چربی‌سوزی",

        description:
            "جلسات هوازی و مقاومتی را مرحله‌به‌مرحله دنبال کن و یک روتین قابل ادامه بساز.",

        weeks: 6,

        sessions: [
            "fullBody",
            "cardio",
            "coreShoulder"
        ]
    },


    strength: {
        title: "مسیر تمرینی قدرت",

        description:
            "جلسات قدرتی و مکمل را هفته‌به‌هفته دنبال کن و کیفیت اجرای حرکات را اولویت قرار بده.",

        weeks: 10,

        sessions: [
            "upperPush",
            "upperPull",
            "lower",
            "coreShoulder",
            "fullBody"
        ]
    },


    fitness: {
        title: "مسیر تمرینی Fitness",

        description:
            "ترکیبی متعادل از تمرین، هوازی و تحرک برای ساختن یک روتین پایدار و قابل دنبال‌کردن.",

        weeks: 8,

        sessions: [
            "fullBody",
            "cardio",
            "coreShoulder"
        ]
    }

};


/* =================================
   HELPERS
================================= */

const getWeekTitle = (
    weekNumber
) => {

    const titles = [
        "شروع قدرتمند",
        "افزایش فشار تمرین",
        "ساخت پایه",
        "نیمه اول مسیر",
        "فاز پیشرفت",
        "قدرت و استقامت",
        "نزدیک شدن به هدف",
        "هفته نهایی",
        "فاز پیشرفته",
        "جمع‌بندی نهایی"
    ];


    return (
        titles[weekNumber - 1] ||
        `هفته ${weekNumber}`
    );
};


const getStatus = (
    weekNumber,
    sessionIndex,
    totalWeeks
) => {

    if (weekNumber === 1) {

        return {
            text:
                sessionIndex === 0
                    ? "شروع هفته"
                    : "پایه",

            icon:
                sessionIndex === 0
                    ? "bi-lightning-charge-fill"
                    : "bi-activity"
        };
    }


    if (
        weekNumber === totalWeeks
    ) {

        return {
            text:
                sessionIndex === 0
                    ? "نهایی"
                    : "جمع‌بندی",

            icon:
                sessionIndex === 0
                    ? "bi-trophy-fill"
                    : "bi-check2-circle"
        };
    }


    return {

        text:
            weekNumber % 2 === 0
                ? "پیشرفت"
                : "تمرکز",

        icon:
            weekNumber % 2 === 0
                ? "bi-graph-up-arrow"
                : "bi-fire"
    };
};


const getDuration = (
    programSlug,
    weekNumber,
    sessionIndex
) => {

    const base = {
        muscle: 55,
        "fat-loss": 40,
        strength: 60,
        fitness: 45
    }[programSlug] || 45;


    const weeklyIncrease =
        programSlug === "fat-loss"
            ? 1
            : 2;


    return (
        base +
        ((weekNumber - 1) * weeklyIncrease) +
        (sessionIndex * 5)
    );
};


const buildWorkout = (
    programSlug,
    templateKey,
    weekNumber,
    sessionIndex,
    totalWeeks
) => {

    const template =
        sessionTemplates[templateKey];


    const status =
        getStatus(
            weekNumber,
            sessionIndex,
            totalWeeks
        );


    const duration =
        getDuration(
            programSlug,
            weekNumber,
            sessionIndex
        );


    const exercises =
        template.exercises.map(
            (exercise) => ({
                ...exercise
            })
        );


    return {

        number:
            String(sessionIndex + 1)
                .padStart(2, "0"),

        status:
            status.text,

        statusIcon:
            status.icon,

        icon:
            template.icon,

        day:
            template.day,

        title:
            template.title,

        description:
            template.description,

        exercises:
            `${exercises.length} حرکت`,

        duration:
            `${duration} دقیقه`,

        exerciseDetails:
            exercises

    };
};


const buildPlan = (
    programSlug
) => {

    const config =
        planConfig[programSlug];


    if (!config) {
        return null;
    }


    const weeks = [];


    for (
        let weekNumber = 1;
        weekNumber <= config.weeks;
        weekNumber += 1
    ) {

        weeks.push({

            number:
                weekNumber,

            label:
                `هفته ${weekNumber}`,

            title:
                getWeekTitle(
                    weekNumber
                ),

            sessions:
                `${config.sessions.length} جلسه`,

            workouts:
                config.sessions.map(
                    (
                        templateKey,
                        sessionIndex
                    ) =>
                        buildWorkout(
                            programSlug,
                            templateKey,
                            weekNumber,
                            sessionIndex,
                            config.weeks
                        )
                )
        });
    }


    return {

        program:
            programSlug,

        title:
            config.title,

        description:
            config.description,

        weeks

    };
};


/* =================================
   GET WORKOUT PLAN
================================= */

router.get(
    "/programs/:slug/workouts",
    (req, res) => {

        const slug =
            String(
                req.params.slug
            )
            .trim()
            .toLowerCase();


        const plan =
            buildPlan(slug);


        if (!plan) {

            return res.status(404).json({

                success:
                    false,

                message:
                    "برنامه تمرینی موردنظر پیدا نشد."

            });
        }


        return res.json({

            success:
                true,

            data:
                plan

        });
    }
);


module.exports = router;