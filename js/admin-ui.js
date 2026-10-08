
"use strict";

(() => {

    /*
     * =====================================================
     * ELEMENTS
     * =====================================================
     */

    const logoutButton =
        document.querySelector(
            "#dashboardLogout"
        );

    /*
     * اگر دکمه خروج در Dashboard وجود نداشته باشد،
     * این فایل کاری انجام نمی‌دهد.
     */
    if (!logoutButton) {
        return;
    }


    /*
     * =====================================================
     * CREATE ADMIN BUTTON
     * =====================================================
     */

    const createAdminButton = () => {

        const adminButton =
            document.createElement("a");

        adminButton.href =
            "admin.html";

        adminButton.className =
            "dashboard-action admin-dashboard-action";

        adminButton.id =
            "dashboardAdmin";

        adminButton.innerHTML = `
            <i class="bi bi-shield-lock-fill"></i>
            پنل مدیریت
        `;

        /*
         * دکمه قبل از دکمه خروج قرار می‌گیرد.
         */
        logoutButton.before(adminButton);

    };


    /*
     * =====================================================
     * CHECK ADMIN ROLE
     * =====================================================
     */

    const checkAdminRole =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/auth/me",
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


                /*
                 * اگر کاربر وارد نشده باشد،
                 * هیچ دکمه‌ای ساخته نمی‌شود.
                 */
                if (!response.ok) {
                    return;
                }


                const result =
                    await response.json();


                /*
                 * اگر اطلاعات کاربر معتبر نباشد،
                 * هیچ دکمه‌ای ساخته نمی‌شود.
                 */
                if (
                    !result?.success ||
                    !result?.data
                ) {
                    return;
                }


                /*
                 * فقط Admin اجازه دیدن
                 * دکمه پنل مدیریت را دارد.
                 */
                if (
                    result.data.role === "admin"
                ) {
                    createAdminButton();
                }

            } catch (error) {

                console.error(
                    "Unable to check admin role:",
                    error
                );

            }

        };


    /*
     * =====================================================
     * START
     * =====================================================
     */

    checkAdminRole();

})();
