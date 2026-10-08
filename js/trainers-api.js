"use strict";

(() => {

    const trainerCards =
        document.querySelectorAll(
            ".trainers-grid .trainer-card[data-trainer-id]"
        );


    /* =================================
       SAFETY CHECK
    ================================= */

    if (!trainerCards.length) {

        return;

    }


    /* =================================
       HELPERS
    ================================= */

    const setText = (
        element,
        value
    ) => {

        if (element) {

            element.textContent =
                value;

        }

    };


    /* =================================
       UPDATE TRAINER CARD
    ================================= */

    const updateTrainerCard = (
        card,
        trainer
    ) => {

        const image =
            card.querySelector(
                ".trainer-image"
            );


        const badge =
            card.querySelector(
                ".trainer-badge"
            );


        const role =
            card.querySelector(
                ".trainer-role"
            );


        const name =
            card.querySelector(
                ".trainer-info h3"
            );


        const description =
            card.querySelector(
                ".trainer-info p"
            );


        const metaItems =
            card.querySelectorAll(
                ".trainer-meta span"
            );


        const link =
            card.querySelector(
                '.trainer-info a[href*="trainer-details.html"]'
            );


        /* IMAGE */

        if (image) {

            image.src =
                `../${trainer.image.replace(
                    /^\//,
                    ""
                )}`;


            image.alt =
                `${trainer.name} - ${trainer.role}`;

        }


        /* BADGE */

        if (badge) {

            setText(
                badge,
                trainer.badge
            );

        }


        /* ROLE */

        setText(
            role,
            trainer.role
        );


        /* NAME */

        setText(
            name,
            trainer.name
        );


        /* DESCRIPTION */

        setText(
            description,
            trainer.description
        );


        /* EXPERIENCE */

        if (metaItems[0]) {

            const icon =
                metaItems[0].querySelector(
                    "i"
                );


            metaItems[0].textContent =
                "";


            if (icon) {

                metaItems[0].appendChild(
                    icon
                );

            }


            metaItems[0].appendChild(
                document.createTextNode(
                    ` ${trainer.years} تجربه`
                )
            );

        }


        /* STUDENTS */

        if (metaItems[1]) {

            const icon =
                metaItems[1].querySelector(
                    "i"
                );


            metaItems[1].textContent =
                "";


            if (icon) {

                metaItems[1].appendChild(
                    icon
                );

            }


            metaItems[1].appendChild(
                document.createTextNode(
                    ` ${trainer.students} شاگرد`
                )
            );

        }


        /* DETAIL LINK */

        if (link) {

            link.href =
                `trainer-details.html?id=${encodeURIComponent(
                    trainer.id
                )}`;


            link.setAttribute(
                "aria-label",
                `مشاهده پروفایل ${trainer.name}`
            );

        }


        /* API STATUS */

        card.dataset.apiLoaded =
            "true";

    };


    /* =================================
       LOAD TRAINERS
    ================================= */

    const loadTrainers =
        async () => {

            try {

                const response =
                    await fetch(
                        "/api/trainers",
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Trainers API returned ${response.status}`
                    );

                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !Array.isArray(
                        result.data
                    ) ||
                    result.data.length ===
                        0
                ) {

                    throw new Error(
                        "Invalid trainers API response."
                    );

                }


                /* =============================
                   MAP TRAINERS BY ID
                ============================= */

                const trainersById =
                    new Map(
                        result.data.map(
                            (trainer) => [
                                String(
                                    trainer.id
                                ),
                                trainer
                            ]
                        )
                    );


                /* =============================
                   UPDATE CARDS
                ============================= */

                trainerCards.forEach(
                    (card) => {

                        const trainerId =
                            card.dataset.trainerId;


                        const trainer =
                            trainersById.get(
                                String(
                                    trainerId
                                )
                            );


                        if (trainer) {

                            updateTrainerCard(
                                card,
                                trainer
                            );

                        }

                    }
                );

            } catch (error) {

                console.error(
                    "Unable to load trainers from API. Keeping HTML fallback data.",
                    error
                );

            }

        };


    /* =================================
       START
    ================================= */

    loadTrainers();

})();