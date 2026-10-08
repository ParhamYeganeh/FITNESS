"use strict";

const express = require("express");

const router = express.Router();


/*
 * =====================================
 * PRICING DATA
 * =====================================
 */

const pricingData = {

    hero: {

        tag: "پلن‌های FITNESS",

        title: "پلن مناسب",

        titleAccent: "مسیر تو",

        description:
            "از بین پلن‌های عضویت، گزینه‌ای را انتخاب کن که با هدف، سطح تمرینی و میزان همراهی موردنیازت هماهنگ باشد."
    },


    heading: {

        tag: "انتخاب پلن",

        title: "متناسب با مسیرت،",

        titleAccent: "انتخاب کن.",

        description:
            "هر پلن برای یک سبک متفاوت از تمرین و همراهی طراحی شده است؛ از شروع منظم تا پیگیری جدی‌تر مسیر پیشرفت.",

        note: {
            icon: "bi-shield-check",
            text: "بدون قرارداد",
            separator: "·",
            suffix: "قابل تغییر"
        }
    },


    plans: [

        {
            id: "basic",

            code: "BASIC",

            title: "شروع",

            price: "۴۹۰",

            unit: "هزار تومان",

            description:
                "مناسب برای افرادی که می‌خواهند تمرین منظم را شروع کنند.",

            icon: "bi-rocket-takeoff",

            featured: false,

            popularLabel: "",

            buttonText: "انتخاب پلن",

            buttonStyle: "secondary",

            buttonUrl: "register.html",

            features: [

                {
                    text: "برنامه تمرینی پایه",
                    enabled: true
                },

                {
                    text: "دسترسی به برنامه‌ها",
                    enabled: true
                },

                {
                    text: "پشتیبانی عمومی",
                    enabled: true
                },

                {
                    text: "برنامه شخصی‌سازی شده",
                    enabled: false
                },

                {
                    text: "پیگیری اختصاصی",
                    enabled: false
                }
            ]
        },


        {
            id: "pro",

            code: "PRO",

            title: "حرفه‌ای",

            price: "۷۹۰",

            unit: "هزار تومان",

            description:
                "انتخاب مناسب برای کسانی که می‌خواهند جدی‌تر و هدفمندتر تمرین کنند.",

            icon: "bi-stars",

            featured: true,

            popularLabel: "پیشنهاد ویژه",

            buttonText: "شروع کنید",

            buttonStyle: "primary",

            buttonUrl: "register.html",

            features: [

                {
                    text: "برنامه شخصی‌سازی شده",
                    enabled: true
                },

                {
                    text: "دسترسی کامل به برنامه‌ها",
                    enabled: true
                },

                {
                    text: "مربی تخصصی",
                    enabled: true
                },

                {
                    text: "پیگیری پیشرفت",
                    enabled: true
                },

                {
                    text: "پشتیبانی اولویت‌دار",
                    enabled: true
                }
            ]
        },


        {
            id: "elite",

            code: "ELITE",

            title: "ویژه",

            price: "۱٬۱۹۰",

            unit: "هزار تومان",

            description:
                "برای افرادی که می‌خواهند بیشترین پشتیبانی و امکانات را داشته باشند.",

            icon: "bi-gem",

            featured: false,

            popularLabel: "",

            buttonText: "انتخاب پلن",

            buttonStyle: "secondary",

            buttonUrl: "register.html",

            features: [

                {
                    text: "همه امکانات Pro",
                    enabled: true
                },

                {
                    text: "مربی اختصاصی",
                    enabled: true
                },

                {
                    text: "بررسی هفتگی",
                    enabled: true
                },

                {
                    text: "تنظیم برنامه اختصاصی",
                    enabled: true
                },

                {
                    text: "پشتیبانی ویژه",
                    enabled: true
                }
            ]
        }
    ],


    faq: [

        {
            id: 1,

            question:
                "آیا می‌توانم بعداً پلن خودم را تغییر دهم؟",

            answer:
                "بله. در نسخه فعلی انتخاب پلن نمایشی است و در نسخه نهایی می‌توان تغییر پلن را بر اساس وضعیت حساب و اشتراک کاربر مدیریت کرد.",

            active: true
        },


        {
            id: 2,

            question:
                "آیا پلن شروع برای افراد مبتدی مناسب است؟",

            answer:
                "بله. پلن شروع برای کسانی طراحی شده که می‌خواهند تمرین منظم را با امکانات پایه و یک مسیر مشخص آغاز کنند.",

            active: false
        },


        {
            id: 3,

            question:
                "تفاوت اصلی پلن حرفه‌ای با پلن شروع چیست؟",

            answer:
                "پلن حرفه‌ای امکانات بیشتری مانند برنامه شخصی‌سازی شده، مربی تخصصی، پیگیری پیشرفت و پشتیبانی اولویت‌دار دارد.",

            active: false
        },


        {
            id: 4,

            question:
                "در پلن ویژه چه امکانات بیشتری دریافت می‌کنم؟",

            answer:
                "پلن ویژه علاوه بر امکانات پلن حرفه‌ای، مربی اختصاصی، بررسی هفتگی، تنظیم برنامه اختصاصی و پشتیبانی ویژه را شامل می‌شود.",

            active: false
        },


        {
            id: 5,

            question:
                "آیا این قیمت‌ها در نسخه فعلی واقعی هستند؟",

            answer:
                "خیر. قیمت‌ها و اطلاعات این صفحه در حال حاضر Demo هستند و در مرحله Backend می‌توانند به سیستم واقعی اشتراک و پرداخت متصل شوند.",

            active: false
        }
    ],


    cta: {

        tag: "قدم بعدی",

        title:
            "پلن مناسب را انتخاب کن،",

        titleAccent:
            "مسیرت را شروع کن.",

        description:
            "هنوز بین پلن‌ها مردد هستی؟ هدف تمرینی و میزان همراهی موردنیازت را مشخص کن و از بین گزینه‌های FITNESS مسیر مناسب خودت را انتخاب کن.",

        features: [

            "انتخاب براساس هدف تمرینی",

            "امکان تغییر مسیر در آینده",

            "دسترسی به برنامه‌های تمرینی",

            "امکان دریافت راهنمایی"
        ],

        primaryButton: {

            text: "شروع عضویت",

            url: "register.html"
        },

        secondaryButton: {

            text: "نیاز به راهنمایی دارم",

            url: "contact.html"
        },

        note:
            "اطلاعات و قیمت‌ها در این مرحله Demo هستند و بعداً به Backend متصل می‌شوند.",

        visual: {

            icon: "bi-stars",

            label: "FITNESS MEMBERSHIP",

            value: "۳ پلن",

            description: "برای مسیرهای مختلف تمرینی"
        }
    }
};


/*
 * =====================================
 * GET PRICING
 * =====================================
 */

router.get("/pricing", (req, res) => {

    res.json({

        success: true,

        data: pricingData
    });
});


/*
 * =====================================
 * EXPORT ROUTER
 * =====================================
 */

module.exports = router;