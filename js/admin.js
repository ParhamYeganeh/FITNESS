"use strict";

(() => {

    /*
     * =====================================================
     * ELEMENTS
     * =====================================================
     */

    const totalUsersElement =
        document.querySelector(
            "#admin-total-users"
        );

    const adminUsersElement =
        document.querySelector(
            "#admin-admin-users"
        );

    const normalUsersElement =
        document.querySelector(
            "#admin-normal-users"
        );

    const usersCountElement =
        document.querySelector(
            "#admin-users-count"
        );

    const tableBody =
        document.querySelector(
            "#admin-users-table-body"
        );

    const feedbackElement =
        document.querySelector(
            "#adminFeedback"
        );

    const logoutButton =
        document.querySelector(
            "#adminLogout"
        );


    /*
     * =====================================================
     * BASIC GUARD
     * =====================================================
     */

    if (
        !totalUsersElement ||
        !adminUsersElement ||
        !normalUsersElement ||
        !usersCountElement ||
        !tableBody
    ) {

        return;

    }


    /*
     * =====================================================
     * HELPERS
     * =====================================================
     */

    const setText = (
        element,
        value
    ) => {

        if (element) {

            element.textContent =
                value;

        }

    };


    const toPersianDigits = (
        value
    ) => {

        return String(value)
            .replace(
                /\d/g,
                (digit) =>
                    "۰۱۲۳۴۵۶۷۸۹"[
                        Number(digit)
                    ]
            );

    };


    const escapeHtml = (
        value
    ) => {

        return String(
            value ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    };


    const showFeedback = (
        message
    ) => {

        setText(
            feedbackElement,
            message
        );

    };


    const formatDate = (
        dateValue
    ) => {

        if (!dateValue) {

            return "—";

        }

        const normalizedValue =
            String(dateValue)
                .replace(
                    " ",
                    "T"
                )
                .concat(
                    "Z"
                );

        const date =
            new Date(
                normalizedValue
            );

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return escapeHtml(
                dateValue
            );

        }

        return new Intl.DateTimeFormat(
            "fa-IR",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        ).format(
            date
        );

    };


    /*
     * =====================================================
     * LOADING STATE
     * =====================================================
     */

    const renderUsersLoading = () => {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="admin-table-state"
                >
                    در حال دریافت اطلاعات کاربران...
                </td>
            </tr>
        `;

    };


    /*
     * =====================================================
     * ERROR STATE
     * =====================================================
     */

    const renderUsersError = () => {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="admin-table-state"
                >
                    دریافت اطلاعات کاربران ممکن نشد.
                </td>
            </tr>
        `;

    };


    /*
     * =====================================================
     * EMPTY STATE
     * =====================================================
     */

    const renderUsersEmpty = () => {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="admin-table-state"
                >
                    هنوز کاربری در سیستم ثبت نشده است.
                </td>
            </tr>
        `;

    };


    /*
     * =====================================================
     * RENDER SUMMARY
     * =====================================================
     */

    const renderSummary = (
        summary
    ) => {

        setText(
            totalUsersElement,
            toPersianDigits(
                summary.totalUsers
            )
        );

        setText(
            adminUsersElement,
            toPersianDigits(
                summary.adminUsers
            )
        );

        setText(
            normalUsersElement,
            toPersianDigits(
                summary.normalUsers
            )
        );

    };


    /*
     * =====================================================
     * GET ROLE LABEL
     * =====================================================
     */

    const getRoleLabel = (
        role
    ) => {

        if (
            role === "admin"
        ) {

            return `
                <span class="admin-role-badge admin">
                    <i class="bi bi-shield-check"></i>
                    مدیر
                </span>
            `;

        }

        return `
            <span class="admin-role-badge">
                <i class="bi bi-person"></i>
                کاربر
            </span>
        `;

    };


    /*
     * =====================================================
     * RENDER USERS
     * =====================================================
     */

    const renderUsers = (
        users
    ) => {

        setText(
            usersCountElement,
            `${toPersianDigits(users.length)} کاربر`
        );


        if (
            users.length === 0
        ) {

            renderUsersEmpty();

            return;

        }


        tableBody.innerHTML =
            users
                .map(
                    (user, index) => {

                        return `
                            <tr>

                                <td>
                                    ${toPersianDigits(
                                        index + 1
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        user.name
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        user.email
                                    )}
                                </td>

                                <td>
                                    ${getRoleLabel(
                                        user.role
                                    )}
                                </td>

                                <td>
                                    ${formatDate(
                                        user.createdAt
                                    )}
                                </td>

                            </tr>
                        `;

                    }
                )
                .join("");

    };


    /*
     * =====================================================
     * FETCH CURRENT ADMIN
     * =====================================================
     */

    const fetchCurrentAdmin =
        async () => {

            const response =
                await fetch(
                    "/api/admin/me",
                    {
                        method: "GET",

                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            let result;

            try {

                result =
                    await response.json();

            } catch (error) {

                result = null;

            }


            if (
                response.status === 401
            ) {

                window.location.href =
                    "login.html";

                return null;

            }


            if (
                response.status === 403
            ) {

                showFeedback(
                    "شما دسترسی لازم برای ورود به پنل ادمین را ندارید."
                );

                setTimeout(
                    () => {

                        window.location.href =
                            "dashboard.html";

                    },
                    900
                );

                return null;

            }


            if (
                !response.ok ||
                !result?.success ||
                !result?.data
            ) {

                throw new Error(
                    "اطلاعات احراز هویت ادمین معتبر نیست."
                );

            }


            return result.data;

        };


    /*
     * =====================================================
     * FETCH SUMMARY
     * =====================================================
     */

    const fetchSummary =
        async () => {

            const response =
                await fetch(
                    "/api/admin/summary",
                    {
                        method: "GET",

                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            let result;

            try {

                result =
                    await response.json();

            } catch (error) {

                result = null;

            }


            if (
                !response.ok ||
                !result?.success ||
                !result?.data
            ) {

                throw new Error(
                    result?.message ||
                    "دریافت خلاصه آماری ناموفق بود."
                );

            }


            return result.data;

        };


    /*
     * =====================================================
     * FETCH USERS
     * =====================================================
     */

    const fetchUsers =
        async () => {

            const response =
                await fetch(
                    "/api/admin/users",
                    {
                        method: "GET",

                        credentials:
                            "same-origin",

                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            let result;

            try {

                result =
                    await response.json();

            } catch (error) {

                result = null;

            }


            if (
                !response.ok ||
                !result?.success ||
                !Array.isArray(
                    result.data
                )
            ) {

                throw new Error(
                    result?.message ||
                    "دریافت کاربران ناموفق بود."
                );

            }


            return result.data;

        };


    /*
     * =====================================================
     * LOGOUT
     * =====================================================
     */

    const handleLogout =
        async () => {

            if (
                !logoutButton
            ) {

                return;

            }


            logoutButton.disabled =
                true;

            logoutButton.style.opacity =
                "0.65";

            logoutButton.style.cursor =
                "not-allowed";


            showFeedback(
                "در حال خروج از حساب..."
            );


            try {

                const response =
                    await fetch(
                        "/api/auth/logout",
                        {
                            method: "POST",

                            credentials:
                                "same-origin",

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (
                    !response.ok
                ) {

                    throw new Error(
                        "خروج از حساب انجام نشد."
                    );

                }


                window.location.href =
                    "login.html";


            } catch (error) {

                console.error(
                    "Admin logout failed:",
                    error
                );


                showFeedback(
                    error.message ||
                    "خروج از حساب با خطا مواجه شد."
                );


                logoutButton.disabled =
                    false;

                logoutButton.style.opacity =
                    "";

                logoutButton.style.cursor =
                    "";

            }

        };


    /*
     * =====================================================
     * LOAD ADMIN PANEL
     * =====================================================
     */

    const loadAdminPanel =
        async () => {

            renderUsersLoading();

            showFeedback(
                "در حال بررسی دسترسی..."
            );


            try {

                /*
                 * First verify that current
                 * session belongs to admin.
                 */

                const admin =
                    await fetchCurrentAdmin();


                if (!admin) {

                    return;

                }


                /*
                 * Then load both admin
                 * data sets.
                 */

                showFeedback(
                    `خوش آمدی ${admin.name}.`
                );


                const [
                    summary,
                    users
                ] = await Promise.all([
                    fetchSummary(),
                    fetchUsers()
                ]);


                renderSummary(
                    summary
                );

                renderUsers(
                    users
                );


                showFeedback(
                    `پنل مدیریت برای ${admin.name} آماده است.`
                );


            } catch (error) {

                console.error(
                    "Unable to load admin panel:",
                    error
                );


                renderUsersError();

                showFeedback(
                    error.message ||
                    "دریافت اطلاعات پنل مدیریت با خطا مواجه شد."
                );

            }

        };


    /*
     * =====================================================
     * EVENTS
     * =====================================================
     */

    logoutButton?.addEventListener(
        "click",
        handleLogout
    );


    /*
     * =====================================================
     * START
     * =====================================================
     */

    loadAdminPanel();

})();