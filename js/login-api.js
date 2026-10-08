"use strict";

(() => {

    const loginSection =
        document.querySelector(".login-section");

    if (!loginSection) {
        return;
    }


    /*
     * =====================================
     * HELPERS
     * =====================================
     */

    const setText = (element, value) => {

        if (!element) {
            return;
        }

        element.textContent =
            value ?? "";
    };


    const setIcon = (element, icon) => {

        if (!element) {
            return;
        }

        element.className =
            `bi ${icon}`;
    };


    const setPlaceholder = (element, value) => {

        if (!element) {
            return;
        }

        element.placeholder =
            value ?? "";
    };


    const setInlineText = (element, value) => {

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


    const showFeedback = (message) => {

        const feedback =
            loginSection.querySelector(
                "#loginFeedback"
            );

        if (!feedback) {
            return;
        }

        feedback.textContent =
            message ?? "";

        feedback.classList.add(
            "show"
        );
    };


    /*
     * =====================================
     * HERO
     * =====================================
     */

    const renderHero = (hero) => {

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

            const textNode =
                [...tag.childNodes].find(
                    (node) =>
                        node.nodeType ===
                        Node.TEXT_NODE &&
                        node.textContent.trim()
                );


            if (textNode) {

                textNode.textContent =
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

    const renderIntro = (intro) => {

        const content =
            loginSection.querySelector(
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

            const textNode =
                [...tag.childNodes].find(
                    (node) =>
                        node.nodeType ===
                        Node.TEXT_NODE &&
                        node.textContent.trim()
                );


            if (textNode) {

                textNode.textContent =
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
                    intro.features?.[index];

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
                    feature.querySelector("strong"),
                    data.title
                );


                setText(
                    feature.querySelector("span"),
                    data.description
                );

            }
        );
    };


    /*
     * =====================================
     * LOGIN FORM DATA
     * =====================================
     */

    const renderForm = (formData) => {

        const form =
            loginSection.querySelector(
                ".login-form"
            );

        if (!form) {
            return;
        }


        const header =
            loginSection.querySelector(
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
         * EMAIL
         */

        const emailInput =
            form.querySelector(
                "#login-email"
            );


        setText(
            form.querySelector(
                'label[for="login-email"]'
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
                "#login-password"
            );


        setText(
            form.querySelector(
                'label[for="login-password"]'
            ),
            formData.password.label
        );


        setPlaceholder(
            passwordInput,
            formData.password.placeholder
        );


        /*
         * PASSWORD TOGGLE
         *
         * login.js owns the click behavior.
         */

        const passwordToggle =
            form.querySelector(
                "#passwordToggle"
            );


        if (passwordToggle) {

            passwordToggle.textContent =
                formData.passwordToggle.show;


            passwordToggle.dataset.loginToggleShow =
                formData.passwordToggle.show;


            passwordToggle.dataset.loginToggleHide =
                formData.passwordToggle.hide;

        }


        /*
         * FORGOT PASSWORD
         *
         * login.js owns the click behavior.
         */

        setText(
            form.querySelector(
                "#forgotPasswordLink"
            ),
            formData.forgotPassword
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
         * REGISTER LINK
         */

        const registerParagraph =
            [...form.querySelectorAll("p")].find(
                (paragraph) =>
                    paragraph.textContent.includes(
                        formData.registerText
                    )
            );


        if (registerParagraph) {

            const link =
                registerParagraph.querySelector(
                    "a"
                );


            if (link) {

                setText(
                    link,
                    formData.registerLinkText
                );


                link.href =
                    formData.registerUrl;

            }
        }
    };


    /*
     * =====================================
     * LOGIN SUBMISSION
     * =====================================
     */

    const bindLoginSubmission = () => {

        const form =
            loginSection.querySelector(
                ".login-form"
            );

        if (!form) {
            return;
        }


        if (
            form.dataset.loginApiBound ===
            "true"
        ) {
            return;
        }


        form.dataset.loginApiBound =
            "true";


        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );


        form.addEventListener(
            "submit",
            async (event) => {

                /*
                 * login.js performs client-side
                 * validation first.
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
                    form.dataset.loginSubmitting ===
                    "true"
                ) {
                    return;
                }


                form.dataset.loginSubmitting =
                    "true";


                const emailInput =
                    form.querySelector(
                        "#login-email"
                    );


                const passwordInput =
                    form.querySelector(
                        "#login-password"
                    );


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


                showFeedback(
                    "در حال بررسی اطلاعات ورود..."
                );


                try {

                    /*
                     * Send credentials to Backend.
                     */

                    const response =
                        await fetch(
                            "/api/auth/login",
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
                                    JSON.stringify({

                                        email:
                                            emailInput
                                                ?.value
                                                .trim() ??
                                            "",

                                        password:
                                            passwordInput
                                                ?.value ??
                                            ""

                                    })

                            }
                        );


                    /*
                     * Parse response.
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
                     * Backend error.
                     */

                    if (!response.ok) {

                        throw new Error(
                            result?.message ||
                            "ورود انجام نشد."
                        );

                    }


                    /*
                     * Validate response.
                     */

                    if (
                        !result?.success ||
                        !result?.data
                    ) {

                        throw new Error(
                            "پاسخ ورود معتبر نیست."
                        );

                    }


                    /*
                     * Login success.
                     *
                     * At this point Backend has already
                     * created the HttpOnly session cookie.
                     */

                    showFeedback(
                        result.message ||
                        "ورود با موفقیت انجام شد."
                    );


                    loginSection.dataset.apiLoggedIn =
                        "true";


                    /*
                     * Redirect to Dashboard.
                     */

                    setTimeout(
                        () => {

                            window.location.href =
                                "dashboard.html";

                        },
                        700
                    );


                } catch (error) {

                    console.error(
                        "Login API request failed:",
                        error
                    );


                    showFeedback(
                        error.message ||
                        "ورود با خطا مواجه شد."
                    );


                } finally {

                    /*
                     * On success we are redirecting,
                     * so the button should remain disabled.
                     */

                    if (
                        !loginSection.dataset.apiLoggedIn
                    ) {

                        form.dataset.loginSubmitting =
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

            }
        );
    };


    /*
     * =====================================
     * LOAD LOGIN DATA
     * =====================================
     */

    const loadLogin = async () => {

        try {

            const response =
                await fetch(
                    "/api/auth/login",
                    {

                        headers: {

                            Accept:
                                "application/json"

                        }

                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Login API returned ${response.status}`
                );

            }


            const result =
                await response.json();


            if (
                !result?.success ||
                !result.data
            ) {

                throw new Error(
                    "Invalid Login API response."
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


            bindLoginSubmission();


            loginSection.dataset.apiLoaded =
                "true";


        } catch (error) {

            console.error(
                "Unable to load login page data from API. Keeping HTML fallback data.",
                error
            );

        }

    };


    loadLogin();

})();