"use strict";

(() => {

    const registerSection =
        document.querySelector(".register-section");

    if (!registerSection) {
        return;
    }


    /*
     * =====================================
     * HELPERS
     * =====================================
     */

    const setText = (
        element,
        value
    ) => {

        if (!element) {
            return;
        }

        element.textContent =
            value ?? "";
    };


    const setIcon = (
        element,
        icon
    ) => {

        if (!element) {
            return;
        }

        element.className =
            `bi ${icon}`;
    };


    const setPlaceholder = (
        element,
        value
    ) => {

        if (!element) {
            return;
        }

        element.placeholder =
            value ?? "";
    };


    const setInlineText = (
        element,
        value
    ) => {

        if (!element) {
            return;
        }


        const icon =
            element.querySelector("i");


        [...element.childNodes].forEach(
            (node) => {

                if (
                    node.nodeType ===
                    Node.TEXT_NODE
                ) {
                    node.remove();
                }
            }
        );


        const textNode =
            document.createTextNode(
                ` ${value ?? ""}`
            );


        if (icon) {

            icon.before(textNode);

        } else {

            element.append(textNode);
        }
    };


    /*
     * =====================================
     * HERO
     * =====================================
     */

    const renderHero =
        (hero) => {

            const pageHero =
                document.querySelector(
                    ".page-hero"
                );

            if (!pageHero) {
                return;
            }


            const tag =
                pageHero.querySelector(
                    ".section-tag"
                );


            if (tag) {

                const text =
                    [...tag.childNodes].find(
                        (node) =>
                            node.nodeType ===
                            Node.TEXT_NODE &&
                            node.textContent.trim()
                    );


                if (text) {

                    text.textContent =
                        ` ${hero.tag}`;

                }
            }


            const title =
                pageHero.querySelector(
                    "h1"
                );


            if (title) {

                title.innerHTML = `
                    ${hero.title}
                    <span>${hero.titleAccent}</span>
                    ${hero.titleSuffix}
                `;

            }


            setText(
                pageHero.querySelector("p"),
                hero.description
            );
        };


    /*
     * =====================================
     * INTRO
     * =====================================
     */

    const renderIntro =
        (intro) => {

            const content =
                registerSection.querySelector(
                    ".contact-content"
                );

            if (!content) {
                return;
            }


            const tag =
                content.querySelector(
                    ".section-tag"
                );


            if (tag) {

                const text =
                    [...tag.childNodes].find(
                        (node) =>
                            node.nodeType ===
                            Node.TEXT_NODE &&
                            node.textContent.trim()
                    );


                if (text) {

                    text.textContent =
                        ` ${intro.tag}`;

                }
            }


            const title =
                content.querySelector(
                    ".contact-title"
                );


            if (title) {

                title.innerHTML = `
                    ${intro.title}
                    <span>${intro.titleAccent}</span>
                `;

            }


            setText(
                content.querySelector(
                    ".contact-description"
                ),
                intro.description
            );


            const features =
                content.querySelectorAll(
                    ".contact-feature"
                );


            features.forEach(
                (feature, index) => {

                    const data =
                        intro.features[index];

                    if (!data) {
                        return;
                    }


                    setIcon(
                        feature.querySelector(
                            ".contact-feature-icon i"
                        ),
                        data.icon
                    );


                    setText(
                        feature.querySelector(
                            "strong"
                        ),
                        data.title
                    );


                    setText(
                        feature.querySelector(
                            "span"
                        ),
                        data.description
                    );

                }
            );
        };


    /*
     * =====================================
     * REGISTER FORM DATA
     * =====================================
     */

    const renderForm =
        (formData) => {

            const form =
                registerSection.querySelector(
                    ".register-form"
                );

            if (!form) {
                return;
            }


            const header =
                registerSection.querySelector(
                    ".contact-form-header"
                );


            if (header) {

                setText(
                    header.querySelector("span"),
                    formData.eyebrow
                );


                setText(
                    header.querySelector("strong"),
                    formData.title
                );


                setIcon(
                    header.querySelector(
                        ".contact-form-icon i"
                    ),
                    formData.icon
                );
            }


            /*
             * NAME
             */

            const nameInput =
                form.querySelector(
                    "#register-name"
                );


            setText(
                form.querySelector(
                    'label[for="register-name"]'
                ),
                formData.name.label
            );


            setPlaceholder(
                nameInput,
                formData.name.placeholder
            );


            /*
             * EMAIL
             */

            const emailInput =
                form.querySelector(
                    "#register-email"
                );


            setText(
                form.querySelector(
                    'label[for="register-email"]'
                ),
                formData.email.label
            );


            setPlaceholder(
                emailInput,
                formData.email.placeholder
            );


            /*
             * PASSWORD
             */

            const passwordInput =
                form.querySelector(
                    "#register-password"
                );


            setText(
                form.querySelector(
                    'label[for="register-password"]'
                ),
                formData.password.label
            );


            setPlaceholder(
                passwordInput,
                formData.password.placeholder
            );


            /*
             * PASSWORD CONFIRM
             */

            const confirmInput =
                form.querySelector(
                    "#register-password-confirm"
                );


            setText(
                form.querySelector(
                    'label[for="register-password-confirm"]'
                ),
                formData.passwordConfirm.label
            );


            setPlaceholder(
                confirmInput,
                formData.passwordConfirm.placeholder
            );


            /*
             * PASSWORD TOGGLES
             */

            const toggleButtons =
                form.querySelectorAll(
                    ".register-password-toggle"
                );


            toggleButtons.forEach(
                (button) => {

                    const target =
                        button.dataset.target;


                    if (
                        target ===
                        "register-password"
                    ) {

                        button.textContent =
                            formData.passwordToggle
                                .showPassword;

                    }


                    if (
                        target ===
                        "register-password-confirm"
                    ) {

                        button.textContent =
                            formData.passwordToggle
                                .showConfirm;

                    }

                }
            );


            /*
             * SUBMIT BUTTON
             */

            setInlineText(
                form.querySelector(
                    'button[type="submit"]'
                ),
                formData.submitText
            );


            /*
             * LOGIN LINK
             */

            const loginParagraph =
                [...form.querySelectorAll("p")].find(
                    (paragraph) =>
                        paragraph.textContent.includes(
                            formData.loginText
                        )
                );


            if (loginParagraph) {

                const link =
                    loginParagraph.querySelector("a");


                if (link) {

                    setText(
                        link,
                        formData.loginLinkText
                    );


                    link.href =
                        formData.loginUrl;

                }
            }
        };


    /*
     * =====================================
     * REGISTER SUBMISSION
     * =====================================
     */

    const bindRegisterSubmission =
        () => {

            const form =
                registerSection.querySelector(
                    ".register-form"
                );

            if (!form) {
                return;
            }


            if (
                form.dataset.registerApiBound ===
                "true"
            ) {
                return;
            }


            form.dataset.registerApiBound =
                "true";


            const feedback =
                form.querySelector(
                    "#registerFeedback"
                );


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            form.addEventListener(
                "submit",
                async (event) => {

                    /*
                     * register.js validates first.
                     * When validation fails it adds
                     * .has-error to the invalid group.
                     */

                    const validationError =
                        form.querySelector(
                            ".form-group.has-error"
                        );


                    if (validationError) {
                        return;
                    }


                    event.preventDefault();


                    /*
                     * Prevent duplicate requests.
                     */

                    if (
                        form.dataset.registerSubmitting ===
                        "true"
                    ) {
                        return;
                    }


                    form.dataset.registerSubmitting =
                        "true";


                    /*
                     * Loading state
                     */

                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        submitButton.style.opacity =
                            "0.65";

                        submitButton.style.cursor =
                            "not-allowed";
                    }


                    if (feedback) {

                        feedback.textContent =
                            "در حال ساخت حساب کاربری...";

                        feedback.classList.add(
                            "show"
                        );
                    }


                    /*
                     * Read form values
                     */

                    const nameInput =
                        form.querySelector(
                            "#register-name"
                        );


                    const emailInput =
                        form.querySelector(
                            "#register-email"
                        );


                    const passwordInput =
                        form.querySelector(
                            "#register-password"
                        );


                    const confirmInput =
                        form.querySelector(
                            "#register-password-confirm"
                        );


                    const requestBody = {

                        name:
                            nameInput?.value.trim() ??
                            "",

                        email:
                            emailInput?.value.trim() ??
                            "",

                        password:
                            passwordInput?.value ??
                            "",

                        passwordConfirm:
                            confirmInput?.value ??
                            ""

                    };


                    /*
                     * =================================
                     * SEND TO BACKEND
                     * =================================
                     */

                    try {

                        const response =
                            await fetch(
                                "/api/auth/register",
                                {

                                    method:
                                        "POST",

                                    headers: {

                                        "Content-Type":
                                            "application/json",

                                        Accept:
                                            "application/json"

                                    },

                                    body:
                                        JSON.stringify(
                                            requestBody
                                        )

                                }
                            );


                        /*
                         * Parse JSON response
                         */

                        let result;


                        try {

                            result =
                                await response.json();

                        } catch (error) {

                            throw new Error(
                                "پاسخ معتبر از سرور دریافت نشد."
                            );
                        }


                        /*
                         * Backend error
                         */

                        if (!response.ok) {

                            throw new Error(
                                result?.message ||
                                "ثبت‌نام انجام نشد."
                            );

                        }


                        /*
                         * Validate API response
                         */

                        if (
                            !result?.success ||
                            !result?.data
                        ) {

                            throw new Error(
                                "پاسخ ثبت‌نام معتبر نیست."
                            );

                        }


                        /*
                         * Success
                         */

                        if (feedback) {

                            feedback.textContent =
                                result.message ||
                                "حساب کاربری با موفقیت ساخته شد.";

                            feedback.classList.add(
                                "show"
                            );
                        }


                        /*
                         * Clear form
                         */

                        form.reset();


                        /*
                         * Reset validation states
                         */

                        form.querySelectorAll(
                            ".form-group"
                        ).forEach(
                            (group) => {

                                group.classList.remove(
                                    "has-error",
                                    "has-success"
                                );

                            }
                        );


                        form.querySelectorAll(
                            ".form-error"
                        ).forEach(
                            (error) => {

                                error.textContent =
                                    "";

                            }
                        );


                        /*
                         * Reset password fields
                         */

                        form.querySelectorAll(
                            ".register-password-toggle"
                        ).forEach(
                            (button) => {

                                const target =
                                    button.dataset.target;

                                const input =
                                    form.querySelector(
                                        `#${target}`
                                    );


                                if (input) {

                                    input.type =
                                        "password";

                                }


                                const isConfirm =
                                    target ===
                                    "register-password-confirm";


                                button.textContent =
                                    isConfirm
                                        ? "نمایش تکرار رمز"
                                        : "نمایش رمز عبور";


                                button.setAttribute(
                                    "aria-pressed",
                                    "false"
                                );

                            }
                        );


                        /*
                         * Mark successful registration
                         */

                        registerSection.dataset.apiRegistered =
                            "true";


                    } catch (error) {

                        console.error(
                            "Register API request failed:",
                            error
                        );


                        if (feedback) {

                            feedback.textContent =
                                error.message ||
                                "ثبت‌نام با خطا مواجه شد.";

                            feedback.classList.add(
                                "show"
                            );
                        }

                    } finally {

                        /*
                         * Restore button
                         */

                        form.dataset.registerSubmitting =
                            "false";


                        if (submitButton) {

                            submitButton.disabled =
                                false;

                            submitButton.style.opacity =
                                "";

                            submitButton.style.cursor =
                                "";

                        }

                    }

                }
            );
        };


    /*
     * =====================================
     * LOAD REGISTER DATA
     * =====================================
     */

    const loadRegister =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/auth/register",
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Register API returned ${response.status}`
                    );

                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result?.data
                ) {

                    throw new Error(
                        "Invalid Register API response."
                    );

                }


                renderHero(
                    result.data.hero
                );


                renderIntro(
                    result.data.intro
                );


                renderForm(
                    result.data.form
                );


                bindRegisterSubmission();


                registerSection.dataset.apiLoaded =
                    "true";


            } catch (error) {

                console.error(
                    "Unable to load register page data from API. Keeping HTML fallback data.",
                    error
                );

            }
        };


    loadRegister();

})();