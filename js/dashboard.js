"use strict";

(() => {

    /*
     * =====================================
     * ELEMENTS
     * =====================================
     */

    const heroName =
        document.querySelector(
            "#dashboard-hero-name"
        );


    const nameElement =
        document.querySelector(
            "#dashboard-name"
        );


    const emailElement =
        document.querySelector(
            "#dashboard-email"
        );


    const roleElement =
        document.querySelector(
            "#dashboard-role"
        );


    const statusElement =
        document.querySelector(
            "#dashboard-status"
        );


    const feedbackElement =
        document.querySelector(
            "#dashboardFeedback"
        );


    const logoutButton =
        document.querySelector(
            "#dashboardLogout"
        );


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


    const showFeedback = (
        message
    ) => {

        setText(
            feedbackElement,
            message
        );


        feedbackElement?.classList.add(
            "show"
        );

    };


    /*
     * =====================================
     * LOAD CURRENT USER
     * =====================================
     */

    const loadCurrentUser =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/auth/me",
                        {
                            method: "GET",
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                let result = null;


                try {

                    result =
                        await response.json();

                } catch (error) {

                    throw new Error(
                        "پاسخ معتبر از سرور دریافت نشد."
                    );

                }


                /*
                 * User is not logged in
                 */

                if (
                    response.status === 401
                ) {

                    window.location.href =
                        "login.html";

                    return;
                }


                if (
                    !response.ok ||
                    !result?.success ||
                    !result?.data
                ) {

                    throw new Error(
                        result?.message ||
                        "اطلاعات کاربر دریافت نشد."
                    );

                }


                const user =
                    result.data;


                /*
                 * Render user data
                 */

                setText(
                    heroName,
                    user.name
                );


                setText(
                    nameElement,
                    user.name
                );


                setText(
                    emailElement,
                    user.email
                );


                setText(
                    roleElement,
                    user.role === "user"
                        ? "کاربر عادی"
                        : user.role
                );


                setText(
                    statusElement,
                    "حساب فعال است"
                );


                statusElement?.classList.add(
                    "show"
                );

            } catch (error) {

                console.error(
                    "Unable to load current user:",
                    error
                );


                showFeedback(
                    error.message ||
                    "دریافت اطلاعات حساب با خطا مواجه شد."
                );

            }

        };


    /*
     * =====================================
     * LOGOUT
     * =====================================
     */

    logoutButton?.addEventListener(
        "click",
        async () => {

            logoutButton.disabled =
                true;


            showFeedback(
                "در حال خروج از حساب..."
            );


            try {

                const response =
                    await fetch(
                        "/api/auth/logout",
                        {
                            method: "POST",
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                let result = null;


                try {

                    result =
                        await response.json();

                } catch (error) {

                    throw new Error(
                        "پاسخ معتبر از سرور دریافت نشد."
                    );

                }


                if (!response.ok) {

                    throw new Error(
                        result?.message ||
                        "خروج از حساب انجام نشد."
                    );

                }


                window.location.href =
                    "login.html";


            } catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );


                showFeedback(
                    error.message ||
                    "خروج از حساب با خطا مواجه شد."
                );


                logoutButton.disabled =
                    false;

            }

        }
    );


    /*
     * =====================================
     * INITIAL LOAD
     * =====================================
     */

    loadCurrentUser();

})();