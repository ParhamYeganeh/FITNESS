"use strict";

(() => {

    const page =
        document.querySelector(
            ".about-section"
        );

    if (!page) {
        return;
    }


    const setText = (
        field,
        value
    ) => {

        const elements =
            document.querySelectorAll(
                `[data-about-field="${field}"]`
            );

        elements.forEach(
            (element) => {
                element.textContent =
                    value ?? "";
            }
        );
    };


    const setFeature = (
        element,
        feature
    ) => {

        const icon =
            element.querySelector(
                "[data-about-feature-icon]"
            );

        const title =
            element.querySelector(
                "[data-about-feature-title]"
            );

        const description =
            element.querySelector(
                "[data-about-feature-description]"
            );


        if (icon) {

            icon.className =
                `bi ${feature.icon}`;
        }


        if (title) {

            title.textContent =
                feature.title;
        }


        if (description) {

            description.textContent =
                feature.description;
        }
    };


    const setPrinciple = (
        element,
        item
    ) => {

        const icon =
            element.querySelector(
                "[data-about-principle-icon]"
            );

        const number =
            element.querySelector(
                "[data-about-principle-number]"
            );

        const title =
            element.querySelector(
                "[data-about-principle-title]"
            );


        if (icon) {

            icon.className =
                `bi ${item.icon}`;
        }


        if (number) {

            number.textContent =
                item.number;
        }


        if (title) {

            title.textContent =
                item.title;
        }
    };


    const renderAbout =
        (about) => {

            /*
             * HERO
             */

            setText(
                "hero-tag",
                about.hero.tag
            );

            setText(
                "hero-title",
                about.hero.title
            );

            setText(
                "hero-title-accent",
                about.hero.titleAccent
            );

            setText(
                "hero-description",
                about.hero.description
            );


            /*
             * MAIN ABOUT
             */

            setText(
                "main-tag",
                about.main.tag
            );

            setText(
                "main-title",
                about.main.title
            );

            setText(
                "main-title-accent",
                about.main.titleAccent
            );

            setText(
                "main-description-1",
                about.main.description1
            );

            setText(
                "main-description-2",
                about.main.description2
            );


            const mainImage =
                document.querySelector(
                    "[data-about-image]"
                );

            if (mainImage) {

                mainImage.src =
                    about.main.image;

                mainImage.alt =
                    about.main.imageAlt;
            }


            /*
             * FEATURES
             */

            const featureElements =
                document.querySelectorAll(
                    "[data-about-feature]"
                );

            featureElements.forEach(
                (element, index) => {

                    const feature =
                        about.main.features[index];

                    if (!feature) {
                        return;
                    }

                    setFeature(
                        element,
                        feature
                    );
                }
            );


            /*
             * PRINCIPLES
             */

            setText(
                "principles-tag",
                about.principles.tag
            );

            setText(
                "principles-title",
                about.principles.title
            );

            setText(
                "principles-title-accent",
                about.principles.titleAccent
            );

            setText(
                "principles-description",
                about.principles.description
            );


            const principleElements =
                document.querySelectorAll(
                    "[data-about-principle]"
                );

            principleElements.forEach(
                (element, index) => {

                    const item =
                        about.principles.items[index];

                    if (!item) {
                        return;
                    }

                    setPrinciple(
                        element,
                        item
                    );
                }
            );


            /*
             * CTA
             */

            setText(
                "cta-tag",
                about.cta.tag
            );

            setText(
                "cta-title",
                about.cta.title
            );

            setText(
                "cta-title-accent",
                about.cta.titleAccent
            );

            setText(
                "cta-description",
                about.cta.description
            );

            setText(
                "cta-note",
                about.cta.note
            );


            const ctaFeatures =
                document.querySelectorAll(
                    "[data-about-cta-feature]"
                );

            ctaFeatures.forEach(
                (element, index) => {

                    const feature =
                        about.cta.features[index];

                    if (!feature) {
                        return;
                    }

                    element.textContent =
                        feature;
                }
            );
        };


    const loadAbout =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/about",
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `About API returned ${response.status}`
                    );
                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result.data
                ) {

                    throw new Error(
                        "Invalid About API response."
                    );
                }


                renderAbout(
                    result.data
                );


                page.dataset.apiLoaded =
                    "true";


            } catch (
                error
            ) {

                console.error(
                    "Unable to load About page data from API. Keeping HTML fallback data.",
                    error
                );
            }
        };


    loadAbout();

})();