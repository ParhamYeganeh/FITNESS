"use strict";

(() => {

    /*
     * =====================================
     * ELEMENTS
     * =====================================
     */

    const headerButton =
        document.querySelector(
            ".site-header .header-btn"
        );


    const mainNav =
        document.querySelector(
            ".site-header .main-nav"
        );


    if (!headerButton || !mainNav) {
        return;
    }


    /*
     * =====================================
     * URL
     * =====================================
     */

    const isInsidePagesDirectory =
        window.location.pathname.includes(
            "/pages/"
        );


    const dashboardUrl =
        isInsidePagesDirectory
            ? "dashboard.html"
            : "pages/dashboard.html";


    /*
     * =====================================
     * MOBILE AUTH LINK
     * =====================================
     */

    const createMobileAuthLink = () => {

        let mobileAuthLink =
            mainNav.querySelector(
                ".mobile-auth-link"
            );


        if (!mobileAuthLink) {

            mobileAuthLink =
                document.createElement("a");


            mobileAuthLink.className =
                "nav-link mobile-auth-link";


            mobileAuthLink.href =
                dashboardUrl;


            mobileAuthLink.innerHTML = `
                <i class="bi bi-person-circle"></i>
                <span>پنل کاربری</span>
            `;


            mainNav.appendChild(
                mobileAuthLink
            );

        }


        return mobileAuthLink;
    };


    /*
     * =====================================
     * REMOVE MOBILE AUTH LINK
     * =====================================
     */

    const removeMobileAuthLink = () => {

        const mobileAuthLink =
            mainNav.querySelector(
                ".mobile-auth-link"
            );


        mobileAuthLink?.remove();
    };


    /*
     * =====================================
     * LOGGED-IN HEADER
     * =====================================
     */

    const setLoggedInHeader = () => {

        /*
         * Desktop Header Button
         */

        headerButton.href =
            dashboardUrl;


        headerButton.setAttribute(
            "aria-label",
            "ورود به پنل کاربری"
        );


        const icon =
            headerButton.querySelector(
                "i"
            );


        if (icon) {

            icon.className =
                "bi bi-person-circle";
        }


        [
            ...headerButton.childNodes
        ].forEach(
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
                " پنل کاربری"
            );


        if (icon) {

            icon.before(
                textNode
            );

        } else {

            headerButton.append(
                textNode
            );

        }


        /*
         * Mobile Menu Link
         */

        createMobileAuthLink();

    };


    /*
     * =====================================
     * LOAD AUTH STATE
     * =====================================
     */

    const loadAuthState =
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


                /*
                 * Not logged in
                 */

                if (!response.ok) {

                    removeMobileAuthLink();

                    return;
                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result?.data
                ) {

                    removeMobileAuthLink();

                    return;
                }


                /*
                 * Logged in
                 */

                setLoggedInHeader();


            } catch (error) {

                console.error(
                    "Unable to determine authentication state.",
                    error
                );


                removeMobileAuthLink();

            }

        };


    loadAuthState();

})();