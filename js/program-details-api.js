"use strict";

(() => {

    const page =
        document.querySelector(".program-detail-hero");


    /* =================================
       SAFETY CHECK
    ================================= */

    if (!page) {
        return;
    }


    /* =================================
       GET PROGRAM SLUG
    ================================= */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const slug =
        (
            params.get("program") ||
            "muscle"
        )
        .trim()
        .toLowerCase();


    /* =================================
       SET TEXT
    ================================= */

    const setText = (
        selector,
        value
    ) => {

        const element =
            document.querySelector(
                selector
            );


        if (element) {
            element.textContent =
                value;
        }
    };


    /* =================================
       SET HEADLINE
    ================================= */

    const setHeadline = (
        selector,
        firstPart,
        accentPart
    ) => {

        const element =
            document.querySelector(
                selector
            );


        if (!element) {
            return;
        }


        const textNode =
            Array.from(
                element.childNodes
            ).find(
                (node) =>
                    node.nodeType ===
                    Node.TEXT_NODE &&
                    node.textContent.trim()
            );


        if (textNode) {

            textNode.textContent =
                `
                    ${firstPart}
                    `;
        }


        const accent =
            element.querySelector(
                "span"
            );


        if (accent) {
            accent.textContent =
                accentPart;
        }
    };


    /* =================================
       SET IMAGE
    ================================= */

    const setImage = (
        selector,
        src,
        alt
    ) => {

        const image =
            document.querySelector(
                selector
            );


        if (!image) {
            return;
        }


        const cleanSrc =
            String(src || "")
                .replace(
                    /^\//,
                    "../"
                );


        image.src =
            cleanSrc;


        image.alt =
            alt ||
            image.alt;
    };


    /* =================================
       ACCESS FEATURES
    ================================= */

    const setAccessFeatures = (
        features
    ) => {

        const elements =
            document.querySelectorAll(
                "[data-program-access-feature]"
            );


        elements.forEach(
            (element, index) => {

                if (features[index]) {

                    element.textContent =
                        features[index];
                }
            }
        );
    };


    /* =================================
       ICON + TEXT
    ================================= */

    const setIconText = (
        selector,
        value
    ) => {

        const element =
            document.querySelector(
                selector
            );


        if (!element) {
            return;
        }


        const icon =
            element.querySelector(
                "i"
            );


        element.textContent =
            "";


        if (icon) {
            element.appendChild(
                icon
            );
        }


        element.appendChild(
            document.createTextNode(
                `
          ${value}
        `
            )
        );
    };


    /* =================================
       HIGHLIGHTS
    ================================= */

    const setHighlights = (
        highlights
    ) => {

        const elements =
            document.querySelectorAll(
                "[data-program-highlight-value]"
            );


        elements.forEach(
            (element, index) => {

                const item =
                    highlights[index];


                if (item?.[1]) {

                    element.textContent =
                        item[1];
                }
            }
        );
    };


    /* =================================
       SUMMARY ROWS
    ================================= */

    const setSummaryRows = (
        program
    ) => {

        const duration =
            document.querySelector(
                '[data-program-summary="duration"]'
            );


        const days =
            document.querySelector(
                '[data-program-summary="days"]'
            );


        const session =
            document.querySelector(
                '[data-program-summary="session"]'
            );


        const level =
            document.querySelector(
                '[data-program-summary="level"]'
            );


        if (duration) {

            duration.textContent =
                `${program.durationWeeks} هفته`;
        }


        if (days) {

            days.textContent =
                `${program.daysPerWeek} جلسه در هفته`;
        }


        if (session) {

            session.textContent =
                `حدود ${program.sessionMinutes} دقیقه`;
        }


        if (level) {

            level.textContent =
                program.level;
        }
    };


    /* =================================
       RENDER PROGRAM
    ================================= */

    const renderProgram = (
        program
    ) => {

        document.title =
            `FITNESS | ${program.title}`;


        /* IMAGE */

        setImage(
            '[data-program-field="image"]',
            program.image,
            program.title
        );


        /* BASIC INFO */

        setText(
            '[data-program-field="categoryTitle"]',
            program.categoryTitle
        );


        setText(
            '[data-program-field="level"]',
            program.level
        );


        setText(
            '[data-program-field="badge"]',
            program.badge
        );


        setText(
            '[data-program-field="description"]',
            program.description
        );


        /* HEADLINE */

        setHeadline(
            '[data-program-field="headline"]',
            program.headline,
            program.headlineAccent
        );


        /* META */

        setText(
            '[data-program-field="durationText"]',
            `${program.durationWeeks} هفته`
        );


        setText(
            '[data-program-field="levelText"]',
            program.level
        );


        setText(
            '[data-program-field="daysText"]',
            `${program.daysPerWeek} روز`
        );


        setText(
            '[data-program-field="sessionText"]',
            `${program.sessionMinutes} دقیقه`
        );


        /* TRAINER */

        setImage(
            '[data-program-field="trainerImage"]',
            program.trainer.image,
            program.trainer.name
        );


        setImage(
            '[data-program-field="trainerImageMain"]',
            program.trainer.image,
            program.trainer.name
        );


        setText(
            '[data-program-field="trainerName"]',
            program.trainer.name
        );


        setText(
            '[data-program-field="trainerNameMain"]',
            program.trainer.name
        );


        setText(
            '[data-program-field="trainerRole"]',
            program.trainer.role
        );


        setText(
            '[data-program-field="trainerDescription"]',
            program.trainer.description
        );


        /* TRAINER LINK */

        const trainerLink =
            document.querySelector(
                '[data-program-field="trainerLink"]'
            );


        if (trainerLink) {

            trainerLink.href =
                `trainer-details.html?id=${encodeURIComponent(
                    program.trainer.id
                )}`;
        }


        const trainerLinkMain =
            document.querySelector(
                '[data-program-field="trainerLinkMain"]'
            );


        if (trainerLinkMain) {

            trainerLinkMain.href =
                `trainer-details.html?id=${encodeURIComponent(
                    program.trainer.id
                )}`;
        }


        /* OVERVIEW TITLE */

        setHeadline(
            '[data-program-field="overviewTitle"]',
            program.overviewTitle,
            program.overviewTitleAccent
        );


        /* OVERVIEW PARAGRAPHS */

        const overviewParagraphs =
            document.querySelectorAll(
                '[data-program-field="overviewParagraph"]'
            );


        overviewParagraphs.forEach(
            (paragraph, index) => {

                if (
                    program.overviewParagraphs[index]
                ) {

                    paragraph.textContent =
                        program.overviewParagraphs[index];
                }
            }
        );


        /* HIGHLIGHTS */

        setHighlights(
            program.highlights
        );


        /* SUMMARY */

        setSummaryRows(
            program
        );


        setText(
            '[data-program-field="summaryNote"]',
            program.note
        );


        /* ACCESS */

        setText(
            '[data-program-field="accessDuration"]',
            `${program.durationWeeks} هفته`
        );


        setAccessFeatures(
            program.accessFeatures
        );


        setIconText(
            '[data-program-field="accessNote"]',
            `بعد از فعال‌سازی حساب، دسترسی برنامه ${program.durationWeeks} هفته‌ای برای شما ثبت خواهد شد.`
        );


        /* TRAINER TAGS */

        const tags =
            document.querySelectorAll(
                "[data-program-trainer-tag]"
            );


        tags.forEach(
            (tag, index) => {

                const icon =
                    tag.querySelector(
                        "i"
                    );


                const text =
                    program
                        .trainer
                        .tags[index];


                if (!text) {
                    return;
                }


                tag.textContent =
                    "";


                if (icon) {
                    tag.appendChild(
                        icon
                    );
                }


                tag.appendChild(
                    document.createTextNode(
                        `
            ${text}
          `
                    )
                );
            }
        );
    };


    /* =================================
       ERROR
    ================================= */

    const showError = (
        message
    ) => {

        console.error(
            message
        );
    };


    /* =================================
       LOAD PROGRAM
    ================================= */

    const loadProgram =
        async () => {

            try {

                const response =
                    await fetch(
                        `/api/programs/${encodeURIComponent(
                            slug
                        )}`,
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Program API returned ${response.status}`
                    );
                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result.data
                ) {

                    throw new Error(
                        "Invalid program API response."
                    );
                }


                renderProgram(
                    result.data
                );

            } catch (error) {

                showError(
                    "Unable to load program details from API. Keeping HTML fallback data."
                );


                console.error(
                    error
                );
            }
        };


    /* =================================
       START
    ================================= */

    loadProgram();

})();