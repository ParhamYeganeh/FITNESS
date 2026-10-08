"use strict";

const express = require("express");

const router = express.Router();


/* =================================
   TRAINER DATA
================================= */

const trainers = {
    "1": {
        "name": "علی رضایی",
        "role": "مربی بدنسازی و قدرت",
        "badge": "مربی ویژه",
        "image": "/images/ali-rezaei.jfif",
        "description": "مربی تخصصی بدنسازی و قدرت با تمرکز روی عضله‌سازی، افزایش قدرت و طراحی مسیر تمرینی متناسب با سطح و هدف ورزشکار.",
        "years": "۸ سال",
        "students": "+250 نفر",
        "specialization": "Strength",
        "coaching": "۱ به ۱",
        "aboutTitle": "تجربه، تخصص و",
        "aboutTitleAccent": "برنامه‌ریزی دقیق.",
        "about1": "علی رضایی در زمینه بدنسازی و تمرینات قدرتی فعالیت می‌کند و تمرکز اصلی او روی ساختن مسیر تمرینی منظم، قابل پیگیری و متناسب با سطح ورزشکار است.",
        "about2": "رویکرد او ترکیبی از تمرین هدفمند، افزایش تدریجی فشار تمرینی و توجه به کیفیت اجرای حرکات است.",
        "focus": [
            [
                "عضله‌سازی",
                "طراحی تمرین با تمرکز روی رشد عضلات"
            ],
            [
                "قدرت",
                "پیشرفت مرحله‌ای در توان و عملکرد"
            ],
            [
                "Progressive Overload",
                "افزایش کنترل‌شده فشار تمرینی"
            ],
            [
                "برنامه شخصی",
                "توجه به سطح، هدف و شرایط ورزشکار"
            ]
        ],
        "programs": [
            {
                "key": "muscle",
                "number": "01",
                "title": "عضله‌سازی حرفه‌ای",
                "description": "مسیر تمرینی با تمرکز روی افزایش حجم عضلات، پیشرفت تدریجی و اجرای اصولی حرکات.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-person-arms-up",
                "featured": true
            },
            {
                "key": "strength",
                "number": "02",
                "title": "قدرت و Strength",
                "description": "برنامه‌ای برای افزایش قدرت، کنترل بار تمرینی و استفاده هدفمند از Progressive Overload.",
                "level": "سطح پیشرفته",
                "duration": "۸ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-lightning-charge-fill",
                "featured": false
            },
            {
                "key": "fitness",
                "number": "03",
                "title": "ساخت پایه قدرتمند",
                "description": "برنامه‌ای برای ساخت پایه تمرینی مناسب و آماده‌شدن برای مراحل پیشرفته‌تر.",
                "level": "سطح متوسط",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-graph-up-arrow",
                "featured": false
            }
        ]
    },

    "2": {
        "name": "سارا محمدی",
        "role": "مربی Fitness",
        "badge": "FITNESS COACH",
        "image": "/images/sara-mohammadi.jfif",
        "description": "مربی Fitness با تمرکز روی انعطاف‌پذیری، تمرین ترکیبی و ساختن سبک زندگی فعال و پایدار.",
        "years": "۶ سال",
        "students": "+180 نفر",
        "specialization": "Fitness",
        "coaching": "۱ به ۱",
        "aboutTitle": "حرکت بهتر،",
        "aboutTitleAccent": "زندگی فعال‌تر.",
        "about1": "سارا محمدی روی ساختن عادت‌های تمرینی پایدار و بهبود کیفیت حرکت تمرکز دارد و برنامه‌ها را بر اساس سطح ورزشکار تنظیم می‌کند.",
        "about2": "در مسیر تمرینی او، ترکیبی از Fitness، Mobility و تمرینات کاربردی برای ایجاد پیشرفت تدریجی استفاده می‌شود.",
        "focus": [
            [
                "Fitness",
                "ساختن روتین تمرینی منظم و پایدار"
            ],
            [
                "Mobility",
                "بهبود دامنه حرکت و کنترل بدن"
            ],
            [
                "تناسب اندام",
                "تمرکز بر آمادگی و عملکرد عمومی"
            ],
            [
                "سبک زندگی",
                "هماهنگی تمرین با برنامه روزانه"
            ]
        ],
        "programs": [
            {
                "key": "fitness",
                "number": "01",
                "title": "Fitness کامل",
                "description": "مسیر متعادل برای بهبود آمادگی جسمانی، تحرک و ساختن یک روتین پایدار.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-heart-pulse-fill",
                "featured": true
            },
            {
                "key": "fat-loss",
                "number": "02",
                "title": "چربی‌سوزی و Cardio",
                "description": "ترکیبی از تمرینات هوازی و مقاومتی برای بهبود استقامت و فرم بدنی.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-fire",
                "featured": false
            },
            {
                "key": "muscle",
                "number": "03",
                "title": "عضله‌سازی متعادل",
                "description": "تقویت عضلات در کنار تمرکز روی کنترل حرکت و استمرار در تمرین.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-person-arms-up",
                "featured": false
            }
        ]
    },

    "3": {
        "name": "امیر کریمی",
        "role": "مربی کاهش وزن",
        "badge": "FAT LOSS COACH",
        "image": "/images/amir-karimi.jfif",
        "description": "مربی تخصصی کاهش وزن با تمرکز روی Cardio، تمرینات ترکیبی و ساختن یک مسیر قابل پیگیری.",
        "years": "۵ سال",
        "students": "+140 نفر",
        "specialization": "Fat Loss",
        "coaching": "۱ به ۱",
        "aboutTitle": "مسیر ساده‌تر برای",
        "aboutTitleAccent": "چربی‌سوزی اصولی.",
        "about1": "امیر کریمی روی طراحی مسیرهای تمرینی قابل اجرا برای کاهش وزن و بهبود آمادگی جسمانی تمرکز دارد.",
        "about2": "ساختار تمرین‌ها بر اساس سطح ورزشکار تنظیم می‌شود تا شدت و حجم تمرین به‌صورت مرحله‌ای افزایش پیدا کند.",
        "focus": [
            [
                "چربی‌سوزی",
                "تمرکز روی ایجاد مسیر تمرینی منظم"
            ],
            [
                "Cardio",
                "بهبود استقامت و آمادگی قلبی"
            ],
            [
                "تمرین ترکیبی",
                "ترکیب قدرت و تمرین هوازی"
            ],
            [
                "پیگیری پیشرفت",
                "اندازه‌گیری منظم تغییرات عملکردی"
            ]
        ],
        "programs": [
            {
                "key": "fat-loss",
                "number": "01",
                "title": "چربی‌سوزی و Cardio",
                "description": "مسیر تمرینی با تمرکز روی افزایش مصرف انرژی، استقامت و پیشرفت قابل پیگیری.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-fire",
                "featured": true
            },
            {
                "key": "fitness",
                "number": "02",
                "title": "Fitness و آمادگی",
                "description": "ترکیبی از تمرینات هوازی و قدرتی برای ساخت آمادگی جسمانی عمومی.",
                "level": "سطح متوسط",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-heart-pulse-fill",
                "featured": false
            },
            {
                "key": "strength",
                "number": "03",
                "title": "Strength پایه",
                "description": "افزایش قدرت پایه برای بالا بردن کیفیت اجرای تمرینات و عملکرد عمومی.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-lightning-charge-fill",
                "featured": false
            }
        ]
    },

    "4": {
        "name": "نگار احمدی",
        "role": "مربی Mobility و Fitness",
        "badge": "MOBILITY COACH",
        "image": "/images/negar-ahmadi.jfif",
        "description": "مربی Mobility و Fitness با تمرکز روی حرکت صحیح، انعطاف‌پذیری و کنترل بهتر بدن.",
        "years": "۷ سال",
        "students": "+210 نفر",
        "specialization": "Mobility",
        "coaching": "۱ به ۱",
        "aboutTitle": "حرکت با کیفیت،",
        "aboutTitleAccent": "بدن آماده‌تر.",
        "about1": "نگار احمدی روی کیفیت حرکت و ساختن پایه حرکتی مناسب برای تمرین‌های روزمره و ورزشی تمرکز دارد.",
        "about2": "برنامه‌ها با توجه به محدودیت‌ها و سطح فعلی ورزشکار تنظیم می‌شوند تا کنترل و دامنه حرکت به‌تدریج بهتر شود.",
        "focus": [
            [
                "Mobility",
                "بهبود دامنه و کیفیت حرکت"
            ],
            [
                "Flexibility",
                "افزایش انعطاف‌پذیری"
            ],
            [
                "کنترل بدن",
                "تمرکز روی اجرای دقیق حرکات"
            ],
            [
                "Fitness",
                "حفظ آمادگی عمومی بدن"
            ]
        ],
        "programs": [
            {
                "key": "fitness",
                "number": "01",
                "title": "Fitness و Mobility",
                "description": "مسیر متعادل برای بهبود کیفیت حرکت، تحرک و آمادگی عمومی بدن.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-person-arms-up",
                "featured": true
            },
            {
                "key": "strength",
                "number": "02",
                "title": "Strength کنترل‌شده",
                "description": "تقویت عضلات همراه با تأکید بر تکنیک، کنترل بدن و اجرای دقیق حرکات.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-lightning-charge-fill",
                "featured": false
            },
            {
                "key": "muscle",
                "number": "03",
                "title": "عضله‌سازی اصولی",
                "description": "تقویت عضلات با حفظ دامنه حرکت مناسب و توجه به کیفیت اجرای تمرین.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-person-arms-up",
                "featured": false
            }
        ]
    },

    "5": {
        "name": "مهدی نادری",
        "role": "مربی Strength",
        "badge": "STRENGTH COACH",
        "image": "/images/mehdi-naderi.jfif",
        "description": "مربی Strength با تمرکز روی افزایش قدرت، Progressive Overload و پیشرفت مرحله‌ای در تمرین.",
        "years": "۹ سال",
        "students": "+320 نفر",
        "specialization": "Strength",
        "coaching": "۱ به ۱",
        "aboutTitle": "قدرت بیشتر با",
        "aboutTitleAccent": "پیشرفت حساب‌شده.",
        "about1": "مهدی نادری روی توسعه قدرت و ساختن برنامه‌هایی تمرکز دارد که پیشرفت آن‌ها قابل اندازه‌گیری و مرحله‌ای باشد.",
        "about2": "اصل Progressive Overload در کنار توجه به تکنیک و حجم تمرین، بخش مهمی از رویکرد اوست.",
        "focus": [
            [
                "Strength",
                "افزایش قدرت پایه و عملکرد"
            ],
            [
                "Progressive Overload",
                "پیشرفت تدریجی در بار تمرینی"
            ],
            [
                "Technique",
                "توجه به اجرای صحیح حرکات"
            ],
            [
                "Performance",
                "تمرکز روی عملکرد قابل اندازه‌گیری"
            ]
        ],
        "programs": [
            {
                "key": "strength",
                "number": "01",
                "title": "Strength پیشرفته",
                "description": "مسیر تخصصی برای توسعه قدرت و پیشرفت مرحله‌ای در بار تمرینی.",
                "level": "سطح پیشرفته",
                "duration": "۸ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-lightning-charge-fill",
                "featured": true
            },
            {
                "key": "muscle",
                "number": "02",
                "title": "عضله‌سازی و حجم",
                "description": "ترکیبی از حجم تمرینی و Progressive Overload برای رشد عضلات.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-person-arms-up",
                "featured": false
            },
            {
                "key": "fitness",
                "number": "03",
                "title": "آمادگی و Performance",
                "description": "ساخت پایه‌ای مناسب برای تمرینات قدرتی و عملکرد بهتر در جلسات تمرین.",
                "level": "سطح متوسط",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-graph-up-arrow",
                "featured": false
            }
        ]
    },

    "6": {
        "name": "پارسا حسینی",
        "role": "مربی آمادگی جسمانی",
        "badge": "PERFORMANCE COACH",
        "image": "/images/parsa-hoseini.jfif",
        "description": "مربی آمادگی جسمانی با تمرکز روی استقامت، تمرین‌های ترکیبی و بهبود عملکرد عمومی بدن.",
        "years": "۴ سال",
        "students": "+120 نفر",
        "specialization": "Performance",
        "coaching": "۱ به ۱",
        "aboutTitle": "آمادگی بهتر برای",
        "aboutTitleAccent": "عملکرد بهتر.",
        "about1": "پارسا حسینی روی آمادگی جسمانی عمومی و ساختن پایه‌ای متعادل از استقامت، قدرت و کنترل بدن تمرکز دارد.",
        "about2": "تمرین‌ها به‌صورت ترکیبی طراحی می‌شوند و شدت آن‌ها متناسب با سطح ورزشکار پیش می‌رود.",
        "focus": [
            [
                "استقامت",
                "بهبود ظرفیت و تحمل تمرین"
            ],
            [
                "تمرین ترکیبی",
                "ترکیب قدرت، هوازی و عملکرد"
            ],
            [
                "Performance",
                "تمرکز روی عملکرد عمومی بدن"
            ],
            [
                "Progress",
                "پیگیری پیشرفت مرحله‌ای"
            ]
        ],
        "programs": [
            {
                "key": "fitness",
                "number": "01",
                "title": "آمادگی جسمانی کامل",
                "description": "ترکیبی متعادل برای بهبود استقامت، قدرت و عملکرد عمومی بدن.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-heart-pulse-fill",
                "featured": true
            },
            {
                "key": "strength",
                "number": "02",
                "title": "Strength و Performance",
                "description": "تقویت توان و قدرت پایه برای بهترشدن عملکرد در فعالیت‌های مختلف.",
                "level": "سطح متوسط",
                "duration": "۸ هفته",
                "sessions": "۳ جلسه در هفته",
                "icon": "bi-lightning-charge-fill",
                "featured": false
            },
            {
                "key": "fat-loss",
                "number": "03",
                "title": "Cardio و استقامت",
                "description": "مسیر تمرینی برای افزایش استقامت و تحمل بهتر فعالیت‌های هوازی.",
                "level": "همه سطوح",
                "duration": "۶ هفته",
                "sessions": "۴ جلسه در هفته",
                "icon": "bi-fire",
                "featured": false
            }
        ]
    }
};


/* =================================
   PUBLIC LIST FIELDS
================================= */

const toTrainerSummary = (
    trainer,
    id
) => ({

    id:
        Number(id),

    name:
        trainer.name,

    role:
        trainer.role,

    badge:
        trainer.badge,

    image:
        trainer.image,

    description:
        trainer.description,

    years:
        trainer.years,

    students:
        trainer.students,

    specialization:
        trainer.specialization,

    coaching:
        trainer.coaching

});


/* =================================
   GET ALL TRAINERS
================================= */

router.get(
    "/trainers",
    (req, res) => {

        const data =
            Object.entries(
                trainers
            ).map(
                ([id, trainer]) =>
                    toTrainerSummary(
                        trainer,
                        id
                    )
            );


        return res.json({

            success:
                true,

            count:
                data.length,

            data

        });

    }
);


/* =================================
   GET TRAINER BY ID
================================= */

router.get(
    "/trainers/:id",
    (req, res) => {

        const id =
            String(
                req.params.id
            ).trim();


        const trainer =
            trainers[id];


        if (!trainer) {

            return res.status(404).json({

                success:
                    false,

                message:
                    "مربی موردنظر پیدا نشد."

            });

        }


        return res.json({

            success:
                true,

            data: {

                id:
                    Number(id),

                ...trainer

            }

        });

    }
);


module.exports = router;