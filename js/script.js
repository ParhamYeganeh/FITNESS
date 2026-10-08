"use strict";


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.querySelector(
        ".menu-btn"
    );


const mainNav =
    document.querySelector(
        ".main-nav"
    );


const menuIcon =
    menuButton?.querySelector(
        "i"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function closeMobileMenu() {

    mainNav?.classList.remove(
        "mobile-open"
    );


    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );


    menuIcon?.classList.remove(
        "bi-x-lg"
    );


    menuIcon?.classList.add(
        "bi-list"
    );
}


function openMobileMenu() {

    mainNav?.classList.add(
        "mobile-open"
    );


    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );


    menuIcon?.classList.remove(
        "bi-list"
    );


    menuIcon?.classList.add(
        "bi-x-lg"
    );
}


menuButton?.addEventListener(
    "click",
    () => {

        const isOpen =
            mainNav.classList.contains(
                "mobile-open"
            );


        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }
);


navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    }
);


document.addEventListener(
    "click",
    (event) => {

        const clickedInsideMenu =
            mainNav?.contains(
                event.target
            );


        const clickedButton =
            menuButton?.contains(
                event.target
            );


        const isMenuOpen =
            mainNav?.classList.contains(
                "mobile-open"
            );


        if (
            isMenuOpen &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMobileMenu();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   NAVIGATION ACTIVE STATE
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;
                    }


                    const currentId =
                        entry.target.id;


                    navLinks.forEach(
                        (link) => {

                            link.classList.remove(
                                "active"
                            );


                            const linkTarget =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                linkTarget ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }
            );

        },
        {
            threshold: 0.25
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


function closeFaqItem(
    item
) {

    const question =
        item.querySelector(
            ".faq-question"
        );


    const icon =
        item.querySelector(
            ".faq-toggle i"
        );


    item.classList.remove(
        "active"
    );


    question?.setAttribute(
        "aria-expanded",
        "false"
    );


    icon?.classList.remove(
        "bi-dash"
    );


    icon?.classList.add(
        "bi-plus"
    );
}


function openFaqItem(
    item
) {

    const question =
        item.querySelector(
            ".faq-question"
        );


    const icon =
        item.querySelector(
            ".faq-toggle i"
        );


    item.classList.add(
        "active"
    );


    question?.setAttribute(
        "aria-expanded",
        "true"
    );


    icon?.classList.remove(
        "bi-plus"
    );


    icon?.classList.add(
        "bi-dash"
    );
}


faqQuestions.forEach(
    (question) => {

        question.addEventListener(
            "click",
            () => {

                const currentItem =
                    question.parentElement;


                const isActive =
                    currentItem.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    (item) => {

                        closeFaqItem(
                            item
                        );

                    }
                );


                if (!isActive) {

                    openFaqItem(
                        currentItem
                    );

                }

            }
        );

    }
);


/* =====================================================
   TESTIMONIALS
===================================================== */

const testimonials = [

    {
        name: "محمد رضایی",
        meta: "عضو ۸ ماهه",
        goal: "عضله‌سازی",
        image: "images/hero-image.jpg",
        text:
            "« چیزی که برای من مهم بود این بود که بالاخره یک مسیر مشخص داشتم. می‌دانستم چه تمرینی انجام بدهم، چطور پیشرفتم را بررسی کنم و چه زمانی برنامه‌ام را تغییر بدهم. »"
    },


    {
        name: "سارا احمدی",
        meta: "عضو ۶ ماهه",
        goal: "Fitness",
        image: "images/hero-image.jpg",
        text:
            "« چیزی که بیشتر از همه برای من ارزش داشت، منظم شدن تمرین‌ها بود. برنامه مشخص باعث شد بتوانم تمرین را راحت‌تر وارد برنامه روزانه‌ام کنم. »"
    },


    {
        name: "رضا کریمی",
        meta: "عضو ۱ ساله",
        goal: "چربی‌سوزی",
        image: "images/hero-image.jpg",
        text:
            "« قبل از این همیشه برنامه‌هایم را نیمه‌کاره رها می‌کردم، اما وقتی مسیر مشخص و قابل پیگیری داشتم، ادامه دادن خیلی راحت‌تر شد. »"
    }

];


const testimonialMembers =
    document.querySelectorAll(
        ".testimonial-member"
    );


const testimonialMain =
    document.querySelector(
        ".testimonial-main"
    );


const testimonialText =
    document.querySelector(
        ".testimonial-text"
    );


const testimonialAuthorName =
    document.querySelector(
        ".testimonial-author-name"
    );


const testimonialAuthorMeta =
    document.querySelector(
        ".testimonial-author-meta"
    );


const testimonialAuthorImage =
    document.querySelector(
        ".testimonial-author-image"
    );


function showTestimonial(
    index
) {

    const testimonial =
        testimonials[index];


    if (!testimonial) {

        return;

    }


    testimonialMain?.classList.add(
        "is-changing"
    );


    testimonialText.textContent =
        testimonial.text;


    testimonialAuthorName.textContent =
        testimonial.name;


    testimonialAuthorMeta.textContent =
        testimonial.meta;


    testimonialAuthorImage.src =
        testimonial.image;


    testimonialAuthorImage.alt =
        testimonial.name;


    testimonialMembers.forEach(
        (member) => {

            member.classList.remove(
                "active"
            );

        }
    );


    testimonialMembers[index]
        ?.classList.add(
            "active"
        );


    setTimeout(
        () => {

            testimonialMain?.classList.remove(
                "is-changing"
            );

        },
        350
    );
}


testimonialMembers.forEach(
    (member) => {

        member.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        member.dataset.index
                    );


                showTestimonial(
                    index
                );

            }
        );

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


const nameInput =
    document.querySelector(
        "#name"
    );


const emailInput =
    document.querySelector(
        "#email"
    );


const subjectInput =
    document.querySelector(
        "#subject"
    );


const messageInput =
    document.querySelector(
        "#message"
    );


const formSuccess =
    document.querySelector(
        ".form-success"
    );


function setError(
    input,
    message
) {

    const formGroup =
        input.closest(
            ".form-group"
        );


    const errorElement =
        formGroup.querySelector(
            ".form-error"
        );


    formGroup.classList.add(
        "has-error"
    );


    formGroup.classList.remove(
        "has-success"
    );


    errorElement.textContent =
        message;
}


function setSuccess(
    input
) {

    const formGroup =
        input.closest(
            ".form-group"
        );


    const errorElement =
        formGroup.querySelector(
            ".form-error"
        );


    formGroup.classList.remove(
        "has-error"
    );


    formGroup.classList.add(
        "has-success"
    );


    errorElement.textContent =
        "";
}


function clearValidation(
    input
) {

    const formGroup =
        input.closest(
            ".form-group"
        );


    const errorElement =
        formGroup.querySelector(
            ".form-error"
        );


    formGroup.classList.remove(
        "has-error",
        "has-success"
    );


    errorElement.textContent =
        "";
}


function validateName() {

    const value =
        nameInput.value.trim();


    if (value === "") {

        setError(
            nameInput,
            "لطفاً نام خود را وارد کنید."
        );


        return false;
    }


    if (value.length < 2) {

        setError(
            nameInput,
            "نام باید حداقل ۲ کاراکتر باشد."
        );


        return false;
    }


    setSuccess(
        nameInput
    );


    return true;
}


function validateEmail() {

    const value =
        emailInput.value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (value === "") {

        setError(
            emailInput,
            "لطفاً ایمیل خود را وارد کنید."
        );


        return false;
    }


    if (
        !emailPattern.test(
            value
        )
    ) {

        setError(
            emailInput,
            "فرمت ایمیل صحیح نیست."
        );


        return false;
    }


    setSuccess(
        emailInput
    );


    return true;
}


function validateSubject() {

    const value =
        subjectInput.value.trim();


    if (value === "") {

        setError(
            subjectInput,
            "لطفاً موضوع پیام را وارد کنید."
        );


        return false;
    }


    if (
        value.length < 3
    ) {

        setError(
            subjectInput,
            "موضوع باید حداقل ۳ کاراکتر باشد."
        );


        return false;
    }


    setSuccess(
        subjectInput
    );


    return true;
}


function validateMessage() {

    const value =
        messageInput.value.trim();


    if (value === "") {

        setError(
            messageInput,
            "لطفاً پیام خود را وارد کنید."
        );


        return false;
    }


    if (
        value.length < 10
    ) {

        setError(
            messageInput,
            "پیام باید حداقل ۱۰ کاراکتر باشد."
        );


        return false;
    }


    setSuccess(
        messageInput
    );


    return true;
}


/* Blur Validation */

nameInput?.addEventListener(
    "blur",
    validateName
);


emailInput?.addEventListener(
    "blur",
    validateEmail
);


subjectInput?.addEventListener(
    "blur",
    validateSubject
);


messageInput?.addEventListener(
    "blur",
    validateMessage
);


/* Clear While Typing */

const formInputs = [

    nameInput,

    emailInput,

    subjectInput,

    messageInput

];


formInputs.forEach(
    (input) => {

        input?.addEventListener(
            "input",
            () => {

                clearValidation(
                    input
                );


                formSuccess?.classList.remove(
                    "show"
                );

            }
        );

    }
);


contactForm?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const isFormValid =
            validateName() &&
            validateEmail() &&
            validateSubject() &&
            validateMessage();


        if (!isFormValid) {

            formSuccess?.classList.remove(
                "show"
            );


            return;
        }


        formSuccess.textContent =
            "پیام شما با موفقیت آماده ارسال شد.";


        formSuccess.classList.add(
            "show"
        );


        contactForm.reset();


        formInputs.forEach(
            (input) => {

                clearValidation(
                    input
                );

            }
        );


        setTimeout(
            () => {

                formSuccess.classList.remove(
                    "show"
                );

            },
            4000
        );

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (
            entries,
            observer
        ) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;
                    }


                    entry.target.classList.add(
                        "show"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.querySelector(
        ".back-to-top"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backToTop?.classList.add(
                "show"
            );

        } else {

            backToTop?.classList.remove(
                "show"
            );

        }

    }
);


backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* =====================================================
   PROGRAM FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


const programCards =
    document.querySelectorAll(
        ".programs-page .program-card"
    );


filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;


                /* -----------------------------------------
                   ACTIVE BUTTON
                ------------------------------------------ */

                filterButtons.forEach(
                    (filterButton) => {

                        filterButton.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                /* -----------------------------------------
                   FILTER CARDS
                ------------------------------------------ */

                programCards.forEach(
                    (card) => {

                        const category =
                            card.dataset.category;


                        const shouldShow =
                            selectedFilter === "all" ||
                            category === selectedFilter;


                        card.classList.toggle(
                            "filter-hidden",
                            !shouldShow
                        );


                        if (
                            selectedFilter ===
                            "all"
                        ) {

                            card.style.order =
                                "";

                        } else if (
                            shouldShow
                        ) {

                            card.style.order =
                                "-1";

                        } else {

                            card.style.order =
                                "0";

                        }

                    }
                );

            }
        );

    }
);


/*
   WORKOUT PLAN MOVED TO js/workout-api.js

   The API-driven renderer owns
   week tabs and workout cards.
*/


/* =====================================================
   WORKOUT CARD DETAILS
===================================================== */

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".workout-details-btn"
            );


        if (!button) {

            return;

        }


        const card =
            button.closest(
                ".workout-card"
            );


        if (!card) {

            return;

        }


        const isOpen =
            card.classList.toggle(
                "details-open"
            );


        button.setAttribute(
            "aria-expanded",
            String(
                isOpen
            )
        );


        if (isOpen) {

            button.innerHTML = `

                بستن تمرین

                <i class="bi bi-chevron-up"></i>

            `;

        } else {

            button.innerHTML = `

                مشاهده تمرین

                <i class="bi bi-chevron-down"></i>

            `;

        }

    }
);