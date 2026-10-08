"use strict";

(() => {


    /* =================================
       ESCAPE HTML
    ================================= */

    const escapeHtml = (
        value
    ) => {

        return String(
            value ?? ""
        )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
    };


    /* =================================
       SET TEXT
    ================================= */

    const setText = (
        field,
        value
    ) => {

        const elements =
            document.querySelectorAll(
                `[data-trainer-field="${field}"]`
            );


        elements.forEach(
            (element) => {

                element.textContent =
                    value;

            }
        );
    };


    /* =================================
       SET IMAGE
    ================================= */

    const setImage = (
        image,
        src,
        alt
    ) => {

        if (!image) {
            return;
        }


        image.src =
            String(
                src || ""
            )
            .replace(
                /^\//,
                "../"
            );


        image.alt =
            alt ||
            image.alt;
    };


    /* =================================
       RENDER FOCUS
    ================================= */

    const renderFocus = (
        focus = []
    ) => {

        const elements =
            document.querySelectorAll(
                "[data-trainer-focus]"
            );


        elements.forEach(
            (
                element,
                index
            ) => {

                const item =
                    focus[index];


                if (!item) {
                    return;
                }


                const title =
                    element.querySelector(
                        ".overview-highlight-title"
                    );


                const description =
                    element.querySelector(
                        ".overview-highlight-text"
                    );


                if (title) {

                    title.textContent =
                        item[0];

                }


                if (description) {

                    description.textContent =
                        item[1];

                }

            }
        );
    };


    /* =================================
       CREATE PROGRAM CARD
    ================================= */

    const createProgramCard = (
        program
    ) => {

        const article =
            document.createElement(
                "article"
            );


        article.className =
            `program-card${
                program.featured
                    ? " featured"
                    : ""
            }`;


        article.innerHTML = `

            ${
                program.featured
                    ? `
                        <div class="featured-badge">
                            پیشنهاد مربی
                        </div>
                    `
                    : ""
            }


            <div class="program-card-top">

                <div class="program-icon">

                    <i class="bi ${escapeHtml(
                        program.icon
                    )}"></i>

                </div>


                <span class="program-level">

                    ${escapeHtml(
                        program.level
                    )}

                </span>

            </div>


            <div class="program-card-content">

                <span class="program-number">

                    ${escapeHtml(
                        program.number
                    )}

                </span>


                <h3>

                    ${escapeHtml(
                        program.title
                    )}

                </h3>


                <p>

                    ${escapeHtml(
                        program.description
                    )}

                </p>

            </div>


            <div class="program-card-bottom">

                <div class="program-meta">

                    <span>

                        <i class="bi bi-calendar3"></i>

                        ${escapeHtml(
                            program.duration
                        )}

                    </span>


                    <span>

                        <i class="bi bi-bar-chart"></i>

                        ${escapeHtml(
                            program.sessions
                        )}

                    </span>

                </div>


                <a
                    href="program-details.html?program=${encodeURIComponent(
                        program.key
                    )}"
                    class="program-link"
                    aria-label="مشاهده ${escapeHtml(
                        program.title
                    )}"
                >

                    <i class="bi bi-arrow-left"></i>

                </a>

            </div>

        `;


        return article;
    };


    /* =================================
       RENDER PROGRAMS
    ================================= */

    const renderPrograms = (
        programs = []
    ) => {

        const grid =
            document.querySelector(
                "#trainer-programs-grid"
            );


        if (!grid) {
            return;
        }


        grid.innerHTML =
            "";


        programs.forEach(
            (program) => {

                grid.appendChild(
                    createProgramCard(
                        program
                    )
                );

            }
        );
    };


    /* =================================
       RENDER SOCIAL
    ================================= */

    const renderSocial = (
        trainer
    ) => {

        const links =
            document.querySelectorAll(
                "[data-trainer-social]"
            );


        links.forEach(
            (link) => {

                link.href =
                    "#";


                link.setAttribute(
                    "aria-label",
                    `Instagram ${trainer.name}`
                );

            }
        );
    };


    /* =================================
       RENDER TRAINER
    ================================= */

    const renderTrainer = (
        trainer
    ) => {

        if (!trainer) {
            return;
        }


        /* PAGE TITLE */

        document.title =
            `FITNESS | ${trainer.name}`;


        /* HERO */

        setText(
            "name",
            trainer.name
        );


        setText(
            "role",
            trainer.role
        );


        setText(
            "badge",
            trainer.badge
        );


        setText(
            "badge-note",
            `مسیر تمرینی متناسب با تخصص ${trainer.name}`
        );


        setText(
            "description",
            trainer.description
        );


        setText(
            "years",
            trainer.years
        );


        setText(
            "students",
            trainer.students
        );


        setText(
            "specialization",
            trainer.specialization
        );


        setText(
            "coaching",
            trainer.coaching
        );


        /* IMAGES */

        document
            .querySelectorAll(
                "[data-trainer-image]"
            )
            .forEach(
                (image) => {

                    setImage(
                        image,
                        trainer.image,
                        `${trainer.name} - ${trainer.role}`
                    );

                }
            );


        /* SOCIAL */

        renderSocial(
            trainer
        );


        /* ABOUT */

        setText(
            "about-title",
            trainer.aboutTitle
        );


        setText(
            "about-title-accent",
            trainer.aboutTitleAccent
        );


        setText(
            "about-1",
            trainer.about1
        );


        setText(
            "about-2",
            trainer.about2
        );


        /* FOCUS */

        renderFocus(
            trainer.focus
        );


        /* RELATED PROGRAMS */

        renderPrograms(
            trainer.programs
        );

    };


    /* =================================
       PUBLIC RENDER API
    ================================= */

    window.FitnessTrainerDetails = {

        render:
            renderTrainer

    };


})();