"use strict";

const express = require("express");

const router = express.Router();


const contactData = {

    hero: {
        tag: "ارتباط با FITNESS",

        title: "با ما در",

        titleAccent: "ارتباط باش.",

        description:
            "سوالی داری یا برای انتخاب برنامه و مربی مناسب به راهنمایی نیاز داری؟ پیام خودت را برای تیم FITNESS ارسال کن و مسیرت را با خیال راحت ادامه بده."
    },


    info: {

        tag: "راه‌های ارتباطی",

        title: "هنوز سوالی داری؟",

        titleAccent: "با ما در ارتباط باش.",

        description:
            "برای انتخاب برنامه، پیدا کردن مربی مناسب یا دریافت راهنمایی درباره مسیر تمرینی می‌توانی از یکی از راه‌های ارتباطی زیر با تیم FITNESS در تماس باشی.",

        features: [

            {
                icon: "bi-clock-fill",
                title: "پاسخ‌گویی سریع",
                text: "معمولاً کمتر از ۲۴ ساعت"
            },

            {
                icon: "bi-envelope-fill",
                title: "ایمیل",
                text: "hello@fitness-demo.com"
            },

            {
                icon: "bi-telephone-fill",
                title: "شماره تماس",
                text: "۰۲۱-۱۲۳۴۵۶۷۸"
            },

            {
                icon: "bi-geo-alt-fill",
                title: "آدرس",
                text: "تهران، ایران"
            }
        ],

        social: {
            label: "ما را دنبال کن",

            links: [

                {
                    icon: "bi-instagram",
                    url: "#",
                    label: "Instagram"
                },

                {
                    icon: "bi-telegram",
                    url: "#",
                    label: "Telegram"
                },

                {
                    icon: "bi-envelope-fill",
                    url: "mailto:hello@fitness-demo.com",
                    label: "Email"
                }
            ]
        }
    },


    form: {

        eyebrow: "پیام خود را ارسال کنید",

        title: "با ما در ارتباط باش.",

        icon: "bi-chat-square-text-fill",

        fields: {

            name: {
                label: "نام و نام خانوادگی",
                placeholder: "نام خود را وارد کنید"
            },

            email: {
                label: "ایمیل",
                placeholder: "example@email.com"
            },

            subject: {
                label: "موضوع",
                placeholder: "موضوع پیام"
            },

            message: {
                label: "پیام",
                placeholder: "پیام خود را بنویسید..."
            }
        },

        submitText: "ارسال پیام"
    },


    footer: {

        description:
            "یک مسیر ساده و حرفه‌ای برای ساختن بدن قوی‌تر، سبک زندگی سالم‌تر و پیشرفت مداوم.",

        email: "hello@fitness-demo.com",

        phone: "۰۲۱-۱۲۳۴۵۶۷۸",

        address: "تهران، ایران"
    }
};


/*
 * =====================================
 * GET CONTACT DATA
 * =====================================
 */

router.get("/contact", (req, res) => {

    res.json({

        success: true,

        data: contactData
    });
});


module.exports = router;