"use strict";

(() => {


    /* =================================
       PAGE CHECK
    ================================= */

    const page =
        document.querySelector(
            ".program-detail-hero"
        );


    if (!page) {
        return;
    }


    /* =================================
       GET TRAINER ID
    ================================= */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const requestedId =
        Number(
            params.get("id")
        );


    const trainerId =
        Number.isInteger(
            requestedId
        ) &&
        requestedId >= 1
            ? requestedId
            : 1;


    /* =================================
       FALLBACK MESSAGE
    ================================= */

    const renderFallbackMessage = () => {

        const badgeNote =
            document.querySelector(
                '[data-trainer-field="badge-note"]'
            );


        if (badgeNote) {

            badgeNote.textContent =
                "اطلاعات مربی در این نسخه از API دریافت نشد.";

        }

    };


    /* =================================
       LOAD TRAINER
    ================================= */

    const loadTrainer =
        async () => {

            try {

                const response =
                    await fetch(
                        `/api/trainers/${encodeURIComponent(
                            trainerId
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
                        `Trainer API returned ${response.status}`
                    );

                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result.data
                ) {

                    throw new Error(
                        "Invalid trainer API response."
                    );

                }


                /* =============================
                   CHECK RENDERER
                ============================= */

                if (
                    !window.FitnessTrainerDetails ||
                    typeof
                        window
                            .FitnessTrainerDetails
                            .render !==
                        "function"
                ) {

                    throw new Error(
                        "Trainer renderer is unavailable."
                    );

                }


                /* =============================
                   RENDER
                ============================= */

                window
                    .FitnessTrainerDetails
                    .render(
                        result.data
                    );

            } catch (
                error
            ) {

                console.error(
                    "Unable to load trainer details from API. Keeping HTML fallback data.",
                    error
                );


                renderFallbackMessage();

            }

        };


    /* =================================
       START
    ================================= */

    loadTrainer();

})();