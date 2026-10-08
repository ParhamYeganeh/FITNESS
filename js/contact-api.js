"use strict";

(() => {

    const contactSection =
        document.querySelector(
            ".contact-section"
        );

    if (!contactSection) {
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

            icon.after(textNode);

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

                const tagText =
                    tag.querySelector("span");


                if (tagText) {

                    setText(
                        tagText,
                        hero.tag
                    );

                }
            }


            const title =
                pageHero.querySelector(
                    "h1"
                );


            if (title) {

                title.innerHTML = `
                    ${hero.title}
                    <span>
                        ${hero.titleAccent}
                    </span>
                `;
            }


            setText(
                pageHero.querySelector("p"),
                hero.description
            );
        };


    /*
     * =====================================
     * CONTACT INFO
     * =====================================
     */

    const renderInfo =
        (info) => {

            const section =
                contactSection;


            const sectionTag =
                section.querySelector(
                    ".contact-content .section-tag"
                );


            if (sectionTag) {

                const tagText =
                    sectionTag.querySelector(
                        "span"
                    );


                if (tagText) {

                    setText(
                        tagText,
                        info.tag
                    );
                }
            }


            const title =
                section.querySelector(
                    ".contact-content .contact-title"
                );


            if (title) {

                title.innerHTML = `
                    ${info.title}
                    <span>
                        ${info.titleAccent}
                    </span>
                `;
            }


            const description =
                section.querySelector(
                    ".contact-content .contact-description"
                );


            setText(
                description,
                info.description
            );


            /*
             * INFO FEATURES
             */

            const features =
                section.querySelectorAll(
                    ".contact-feature"
                );


            features.forEach(
                (feature, index) => {

                    const data =
                        info.features[index];

                    if (!data) {
                        return;
                    }


                    const icon =
                        feature.querySelector(
                            ".contact-feature-icon i"
                        );


                    const strong =
                        feature.querySelector(
                            "strong"
                        );


                    const span =
                        feature.querySelector(
                            "span"
                        );


                    setIcon(
                        icon,
                        data.icon
                    );


                    setText(
                        strong,
                        data.title
                    );


                    setText(
                        span,
                        data.text
                    );
                }
            );


            /*
             * SOCIAL
             */

            const socialLabel =
                section.querySelector(
                    ".contact-social > span"
                );


            setText(
                socialLabel,
                info.social.label
            );


            const socialLinks =
                section.querySelectorAll(
                    ".contact-social-links a"
                );


            socialLinks.forEach(
                (link, index) => {

                    const data =
                        info.social.links[index];

                    if (!data) {
                        return;
                    }


                    const icon =
                        link.querySelector("i");


                    setIcon(
                        icon,
                        data.icon
                    );


                    link.href =
                        data.url;


                    link.setAttribute(
                        "aria-label",
                        data.label
                    );
                }
            );
        };


    /*
     * =====================================
     * FORM
     * =====================================
     */

    const renderForm =
        (formData) => {

            const form =
                contactSection.querySelector(
                    ".contact-form"
                );


            if (!form) {
                return;
            }


            const header =
                contactSection.querySelector(
                    ".contact-form-header"
                );


            if (header) {

                const eyebrow =
                    header.querySelector(
                        "span"
                    );


                const title =
                    header.querySelector(
                        "strong"
                    );


                const icon =
                    header.querySelector(
                        ".contact-form-icon i"
                    );


                setText(
                    eyebrow,
                    formData.eyebrow
                );


                setText(
                    title,
                    formData.title
                );


                setIcon(
                    icon,
                    formData.icon
                );
            }


            /*
             * NAME
             */

            const nameInput =
                form.querySelector(
                    "#name"
                );


            setPlaceholder(
                nameInput,
                formData.fields.name.placeholder
            );


            const nameLabel =
                form.querySelector(
                    'label[for="name"]'
                );


            setText(
                nameLabel,
                formData.fields.name.label
            );


            /*
             * EMAIL
             */

            const emailInput =
                form.querySelector(
                    "#email"
                );


            setPlaceholder(
                emailInput,
                formData.fields.email.placeholder
            );


            const emailLabel =
                form.querySelector(
                    'label[for="email"]'
                );


            setText(
                emailLabel,
                formData.fields.email.label
            );


            /*
             * SUBJECT
             */

            const subjectInput =
                form.querySelector(
                    "#subject"
                );


            setPlaceholder(
                subjectInput,
                formData.fields.subject.placeholder
            );


            const subjectLabel =
                form.querySelector(
                    'label[for="subject"]'
                );


            setText(
                subjectLabel,
                formData.fields.subject.label
            );


            /*
             * MESSAGE
             */

            const messageInput =
                form.querySelector(
                    "#message"
                );


            setPlaceholder(
                messageInput,
                formData.fields.message.placeholder
            );


            const messageLabel =
                form.querySelector(
                    'label[for="message"]'
                );


            setText(
                messageLabel,
                formData.fields.message.label
            );


            /*
             * SUBMIT BUTTON
             */

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                setInlineText(
                    submitButton,
                    formData.submitText
                );
            }
        };


    /*
     * =====================================
     * FOOTER
     * =====================================
     */

    const renderFooter =
        (footer) => {

            const footerElement =
                document.querySelector(
                    ".site-footer"
                );


            if (!footerElement) {
                return;
            }


            const description =
                footerElement.querySelector(
                    ".footer-description"
                );


            setText(
                description,
                footer.description
            );


            const emailLink =
                footerElement.querySelector(
                    'a[href^="mailto:"]'
                );


            if (emailLink) {

                emailLink.href =
                    `mailto:${footer.email}`;

                setText(
                    emailLink,
                    footer.email
                );
            }


            const phoneLink =
                footerElement.querySelector(
                    'a[href^="tel:"]'
                );


            if (phoneLink) {

                phoneLink.href =
                    `tel:${footer.phone}`;

                setText(
                    phoneLink,
                    footer.phone
                );
            }


            const contactItems =
                footerElement.querySelectorAll(
                    ".footer-contact-item"
                );


            const addressItem =
                [...contactItems].find(
                    (item) =>
                        item.querySelector(
                            ".bi-geo-alt"
                        )
                );


            if (addressItem) {

                const addressText =
                    addressItem.querySelector(
                        "span"
                    );


                setText(
                    addressText,
                    footer.address
                );
            }
        };


    /*
     * =====================================
     * LOAD CONTACT DATA
     * =====================================
     */

    const loadContact =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/contact",
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Contact API returned ${response.status}`
                    );
                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result.data
                ) {

                    throw new Error(
                        "Invalid Contact API response."
                    );
                }


                const data =
                    result.data;


                renderHero(
                    data.hero
                );


                renderInfo(
                    data.info
                );


                renderForm(
                    data.form
                );


                renderFooter(
                    data.footer
                );


                contactSection.dataset.apiLoaded =
                    "true";


            } catch (error) {

                console.error(
                    "Unable to load contact data from API. Keeping HTML fallback data.",
                    error
                );
            }
        };


    loadContact();

})();