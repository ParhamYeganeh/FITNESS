"use strict";

(() => {
    const programCards = document.querySelectorAll(
        ".programs-page .program-card"
    );


    /* =================================
       SAFETY CHECK
    ================================= */

    if (!programCards.length) {
        return;
    }


    /* =================================
       SET TEXT
    ================================= */

    const setText = (element, value) => {

        if (element) {
            element.textContent = value;
        }
    };


    /* =================================
       UPDATE PROGRAM CARD
    ================================= */

    const updateProgramCard = (card, program) => {

        const image =
            card.querySelector(".program-image img");

        const level =
            card.querySelector(".program-level");

        const category =
            card.querySelector(".program-category");

        const title =
            card.querySelector(".program-content h3");

        const description =
            card.querySelector(".program-content > p");

        const metaItems =
            card.querySelectorAll(".program-meta span");

        const button =
            card.querySelector(".program-btn");


        /* IMAGE */

        if (image) {

            image.src =
                `../${program.image.replace(/^\//, "")}`;

            image.alt =
                program.title;
        }


        /* LEVEL */

        setText(
            level,
            program.level
        );


        /* CATEGORY */

        if (category) {

            const icon =
                category.querySelector("i");


            category.textContent = "";


            if (icon) {
                category.appendChild(icon);
            }


            category.appendChild(
                document.createTextNode(
                    ` ${program.categoryTitle}`
                )
            );
        }


        /* TITLE */

        setText(
            title,
            program.title
        );


        /* DESCRIPTION */

        setText(
            description,
            program.description
        );


        /* DURATION */

        if (metaItems[0]) {

            const icon =
                metaItems[0].querySelector("i");


            metaItems[0].textContent = "";


            if (icon) {
                metaItems[0].appendChild(icon);
            }


            metaItems[0].appendChild(
                document.createTextNode(
                    ` ${program.durationWeeks} هفته`
                )
            );
        }


        /* DAYS PER WEEK */

        if (metaItems[1]) {

            const icon =
                metaItems[1].querySelector("i");


            metaItems[1].textContent = "";


            if (icon) {
                metaItems[1].appendChild(icon);
            }


            metaItems[1].appendChild(
                document.createTextNode(
                    ` ${program.daysPerWeek} روز در هفته`
                )
            );
        }


        /* DETAILS LINK */

        if (button) {

            button.href =
                `program-details.html?program=${encodeURIComponent(
                    program.slug
                )}`;
        }


        /* API STATUS */

        card.dataset.apiLoaded = "true";
    };


    /* =================================
       LOAD PROGRAMS
    ================================= */

    const loadPrograms = async () => {

        try {

            const response =
                await fetch("/api/programs", {
                    headers: {
                        Accept: "application/json"
                    }
                });


            if (!response.ok) {

                throw new Error(
                    `Programs API returned ${response.status}`
                );
            }


            const result =
                await response.json();


            if (
                !result?.success ||
                !Array.isArray(result.data) ||
                result.data.length === 0
            ) {

                throw new Error(
                    "Invalid programs API response."
                );
            }


            /* =============================
               MAP PROGRAMS BY ID
            ============================= */

            const programsById =
                new Map(
                    result.data.map(
                        (program) => [
                            String(program.id),
                            program
                        ]
                    )
                );


            /* =============================
               UPDATE CARDS
            ============================= */

            programCards.forEach(
                (card, index) => {

                    const programId =
                        card.dataset.programId ||
                        String(index + 1);


                    const program =
                        programsById.get(
                            String(programId)
                        );


                    if (program) {

                        updateProgramCard(
                            card,
                            program
                        );
                    }
                }
            );

        } catch (error) {

            console.error(
                "Unable to load programs from API. Keeping HTML fallback data.",
                error
            );
        }
    };


    /* =================================
       START
    ================================= */

    loadPrograms();

})();