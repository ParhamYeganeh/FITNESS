"use strict";

(() => {

    const pricingSection =
        document.querySelector(".pricing-section");

    if (!pricingSection) {
        return;
    }


    const setText = (element, value) => {

        if (!element) {
            return;
        }

        element.textContent = value ?? "";
    };


    const setInlineTextPreserveIcon = (element, value) => {

        if (!element) {
            return;
        }

        const icon = element.querySelector("i");

        [...element.childNodes].forEach((node) => {

            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });

        const textNode =
            document.createTextNode(` ${value ?? ""}`);

        if (icon) {
            icon.before(textNode);
        } else {
            element.append(textNode);
        }
    };


    const setHero = (hero) => {

        const pageHero =
            document.querySelector(".page-hero");

        if (!pageHero) {
            return;
        }

        const tag =
            pageHero.querySelector(".section-tag");

        if (tag) {

            const tagText =
                tag.querySelector("span");

            if (tagText) {
                setText(tagText, hero.tag);
            } else {
                tag.lastChild.textContent =
                    ` ${hero.tag}`;
            }
        }


        const title =
            pageHero.querySelector("h1");

        if (title) {

            title.innerHTML = `
                ${hero.title}
                <span>${hero.titleAccent}</span>
            `;
        }


        const description =
            pageHero.querySelector("p");

        setText(
            description,
            hero.description
        );
    };


    const setHeading = (heading) => {

        const sectionHeading =
            pricingSection.querySelector(
                ".pricing-heading"
            );

        if (!sectionHeading) {
            return;
        }


        const tag =
            sectionHeading.querySelector(
                ".section-tag"
            );

        if (tag) {

            const textNode =
                [...tag.childNodes].find(
                    (node) =>
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim()
                );

            if (textNode) {
                textNode.textContent =
                    ` ${heading.tag}`;
            }
        }


        const title =
            sectionHeading.querySelector(
                ".section-title"
            );

        if (title) {

            title.innerHTML = `
                ${heading.title}
                <span>${heading.titleAccent}</span>
            `;
        }


        setText(
            sectionHeading.querySelector(
                ".section-description"
            ),
            heading.description
        );


        const note =
            sectionHeading.querySelector(
                ".pricing-note"
            );

        if (note) {

            const icon =
                note.querySelector("i");

            if (icon) {
                icon.className =
                    `bi ${heading.note.icon}`;
            }

            const noteSeparator =
                note.querySelector("span");

            const noteTextNodes =
                [...note.childNodes].filter(
                    (node) =>
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim()
                );

            if (noteTextNodes[0]) {
                noteTextNodes[0].textContent =
                    ` ${heading.note.text} `;
            }

            if (noteSeparator) {
                setText(
                    noteSeparator,
                    heading.note.separator
                );
            }

            if (noteTextNodes[1]) {
                noteTextNodes[1].textContent =
                    ` ${heading.note.suffix}`;
            }
        }
    };


    const setPlan = (card, plan) => {

        card.classList.toggle(
            "featured-pricing",
            Boolean(plan.featured)
        );


        const label =
            card.querySelector(
                ".pricing-plan-label"
            );

        const title =
            card.querySelector(
                ".pricing-card-top h3"
            );

        const icon =
            card.querySelector(
                ".pricing-icon i"
            );

        const price =
            card.querySelector(
                ".pricing-price strong"
            );

        const unit =
            card.querySelector(
                ".pricing-price span"
            );

        const description =
            card.querySelector(
                ".pricing-description"
            );


        setText(label, plan.code);
        setText(title, plan.title);
        setText(price, plan.price);
        setText(unit, plan.unit);
        setText(description, plan.description);


        if (icon) {
            icon.className =
                `bi ${plan.icon}`;
        }


        let popular =
            card.querySelector(
                ".pricing-popular"
            );


        if (plan.popularLabel) {

            if (!popular) {

                popular =
                    document.createElement("div");

                popular.className =
                    "pricing-popular";

                card.prepend(popular);
            }

            setText(
                popular,
                plan.popularLabel
            );

        } else if (popular) {

            popular.remove();
        }


        const featureElements =
            card.querySelectorAll(
                ".pricing-features li"
            );


        featureElements.forEach(
            (element, index) => {

                const feature =
                    plan.features[index];

                if (!feature) {
                    return;
                }


                element.classList.toggle(
                    "disabled",
                    !feature.enabled
                );


                const iconElement =
                    element.querySelector("i");

                if (iconElement) {

                    iconElement.className =
                        feature.enabled
                            ? "bi bi-check2"
                            : "bi bi-x";
                }


                const textElement =
                    element.querySelector("span");

                if (textElement) {

                    setText(
                        textElement,
                        feature.text
                    );

                } else {

                    const textNodes =
                        [...element.childNodes].filter(
                            (node) =>
                                node.nodeType === Node.TEXT_NODE
                        );

                    textNodes.forEach(
                        (node) => {
                            node.textContent =
                                feature.text;
                        }
                    );
                }
            }
        );


        const button =
            card.querySelector(
                ".pricing-btn"
            );

        if (button) {

            button.href =
                plan.buttonUrl;

            button.classList.toggle(
                "primary",
                plan.buttonStyle === "primary"
            );

            button.classList.toggle(
                "secondary",
                plan.buttonStyle !== "primary"
            );

            setInlineTextPreserveIcon(
                button,
                plan.buttonText
            );
        }
    };


    const setFaq = (faq) => {

        const items =
            document.querySelectorAll(
                "#pricing-faq .faq-item"
            );


        items.forEach((item, index) => {

            const data = faq[index];

            if (!data) {
                return;
            }


            const question =
                item.querySelector(
                    ".faq-question > span:first-child"
                );

            const answer =
                item.querySelector(
                    ".faq-answer p"
                );

            setText(question, data.question);
            setText(answer, data.answer);


            const isActive =
                Boolean(data.active);


            item.classList.toggle(
                "active",
                isActive
            );


            const button =
                item.querySelector(
                    ".faq-question"
                );

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    String(isActive)
                );
            }


            const toggleIcon =
                item.querySelector(
                    ".faq-toggle i"
                );

            if (toggleIcon) {

                toggleIcon.className =
                    isActive
                        ? "bi bi-dash"
                        : "bi bi-plus";
            }
        });
    };


    const setCta = (cta) => {

        const section =
            document.querySelector(
                ".program-access"
            );

        if (!section) {
            return;
        }


        const tag =
            section.querySelector(
                ".section-tag"
            );

        if (tag) {

            const textNode =
                [...tag.childNodes].find(
                    (node) =>
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim()
                );

            if (textNode) {
                textNode.textContent =
                    ` ${cta.tag}`;
            }
        }


        const title =
            section.querySelector(
                ".program-access-content h2"
            );

        if (title) {

            title.innerHTML = `
                ${cta.title}
                <span>${cta.titleAccent}</span>
            `;
        }


        setText(
            section.querySelector(
                ".program-access-content > p"
            ),
            cta.description
        );


        const features =
            section.querySelectorAll(
                ".access-feature"
            );

        features.forEach(
            (feature, index) => {

                const value =
                    cta.features[index];

                if (!value) {
                    return;
                }

                const textElement =
                    feature.querySelector("span");

                if (textElement) {
                    setText(textElement, value);
                } else {
                    setInlineTextPreserveIcon(
                        feature,
                        value
                    );
                }
            }
        );


        const primaryButton =
            section.querySelector(
                ".program-access-primary-btn"
            );

        const secondaryButton =
            section.querySelector(
                ".program-access-secondary-btn"
            );


        if (primaryButton) {

            primaryButton.href =
                cta.primaryButton.url;

            setInlineTextPreserveIcon(
                primaryButton,
                cta.primaryButton.text
            );
        }


        if (secondaryButton) {

            secondaryButton.href =
                cta.secondaryButton.url;

            setInlineTextPreserveIcon(
                secondaryButton,
                cta.secondaryButton.text
            );
        }


        const note =
            section.querySelector(
                ".program-access-note"
            );

        if (note) {

            const noteIcon =
                note.querySelector("i");

            if (noteIcon) {
                setInlineTextPreserveIcon(
                    note,
                    cta.note
                );
            } else {
                setText(note, cta.note);
            }
        }


        const visual =
            section.querySelector(
                ".access-visual-card"
            );

        if (visual) {

            const visualIcon =
                visual.querySelector(
                    ".access-visual-icon i"
                );

            const label =
                visual.querySelector("span");

            const value =
                visual.querySelector("strong");

            const description =
                visual.querySelector("small");


            if (visualIcon) {
                visualIcon.className =
                    `bi ${cta.visual.icon}`;
            }

            setText(
                label,
                cta.visual.label
            );

            setText(
                value,
                cta.visual.value
            );

            setText(
                description,
                cta.visual.description
            );
        }
    };


    const loadPricing = async () => {

        try {

            const response =
                await fetch(
                    "/api/pricing",
                    {
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Pricing API returned ${response.status}`
                );
            }


            const result =
                await response.json();


            if (
                !result?.success ||
                !result.data
            ) {

                throw new Error(
                    "Invalid pricing API response."
                );
            }


            const data =
                result.data;


            setHero(data.hero);

            setHeading(data.heading);


            const planCards =
                pricingSection.querySelectorAll(
                    ".pricing-card"
                );


            planCards.forEach(
                (card, index) => {

                    const plan =
                        data.plans[index];

                    if (!plan) {
                        return;
                    }

                    setPlan(card, plan);
                }
            );


            setFaq(data.faq);

            setCta(data.cta);


            pricingSection.dataset.apiLoaded =
                "true";


        } catch (error) {

            console.error(
                "Unable to load pricing data from API. Keeping HTML fallback data.",
                error
            );
        }
    };


    loadPricing();

})();