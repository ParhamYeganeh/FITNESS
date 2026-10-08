"use strict";

(() => {

    const tabsContainer =
        document.querySelector(
            "#workout-week-tabs"
        );


    const contentContainer =
        document.querySelector(
            ".workout-week-content"
        );


    const heroSection =
        document.querySelector(
            ".program-detail-hero"
        );


    if (
        !tabsContainer ||
        !contentContainer ||
        !heroSection
    ) {

        return;
    }


    /* =================================
       PROGRAM SLUG
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
       HELPERS
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


    const renderExerciseList = (
        exercises
    ) => {

        return exercises
            .map(
                (
                    exercise,
                    index
                ) => {

                    return `
                        <div class="exercise-item">

                            <div class="exercise-item-number">
                                ${String(index + 1).padStart(2, "0")}
                            </div>

                            <div class="exercise-item-info">

                                <strong>
                                    ${escapeHtml(
                                        exercise.name
                                    )}
                                </strong>

                                <div class="exercise-item-meta">

                                    <span>
                                        <i class="bi bi-layers"></i>
                                        ${escapeHtml(
                                            exercise.sets
                                        )}
                                    </span>

                                    <span>
                                        <i class="bi bi-repeat"></i>
                                        ${escapeHtml(
                                            exercise.reps
                                        )}
                                    </span>

                                    <span>
                                        <i class="bi bi-stopwatch"></i>
                                        ${escapeHtml(
                                            exercise.rest
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>
                    `;
                }
            )
            .join("");
    };


    const renderWorkoutCards = (
        workouts
    ) => {

        return workouts
            .map(
                (workout) => {

                    return `
                        <article class="workout-card">

                            <div class="workout-card-top">

                                <div class="workout-card-number">
                                    ${escapeHtml(
                                        workout.number
                                    )}
                                </div>

                                <span class="workout-card-status">
                                    <i class="bi ${escapeHtml(
                                        workout.statusIcon
                                    )}"></i>

                                    ${escapeHtml(
                                        workout.status
                                    )}
                                </span>

                            </div>


                            <div class="workout-card-icon">

                                <i class="bi ${escapeHtml(
                                    workout.icon
                                )}"></i>

                            </div>


                            <span class="workout-card-day">
                                ${escapeHtml(
                                    workout.day
                                )}
                            </span>


                            <h4 class="workout-card-title">
                                ${escapeHtml(
                                    workout.title
                                )}
                            </h4>


                            <p class="workout-card-description">
                                ${escapeHtml(
                                    workout.description
                                )}
                            </p>


                            <div class="workout-card-meta">

                                <span>
                                    <i class="bi bi-list-check"></i>

                                    ${escapeHtml(
                                        workout.exercises
                                    )}
                                </span>


                                <span>
                                    <i class="bi bi-clock"></i>

                                    ${escapeHtml(
                                        workout.duration
                                    )}
                                </span>

                            </div>


                            <div class="workout-exercise-details">

                                <div class="exercise-details-header">

                                    <div>

                                        <span>
                                            جزئیات جلسه
                                        </span>

                                        <strong>
                                            ${workout.exerciseDetails.length}
                                            حرکت نمونه
                                        </strong>

                                    </div>

                                    <i
                                        class="bi bi-chevron-down exercise-details-icon"
                                    ></i>

                                </div>


                                <div class="exercise-details-content">

                                    ${renderExerciseList(
                                        workout.exerciseDetails
                                    )}

                                </div>

                            </div>


                            <button
                                type="button"
                                class="workout-card-btn workout-details-btn"
                                aria-expanded="false"
                            >

                                مشاهده تمرین

                                <i class="bi bi-chevron-down"></i>

                            </button>

                        </article>
                    `;
                }
            )
            .join("");
    };


    const renderTabs = (
        weeks
    ) => {

        tabsContainer.innerHTML =
            weeks
                .map(
                    (
                        week,
                        index
                    ) => {

                        const active =
                            index === 0;


                        return `
                            <button
                                type="button"
                                class="workout-week-tab${
                                    active
                                        ? " active"
                                        : ""
                                }"
                                id="workout-week-tab-${week.number}"
                                data-week="${week.number}"
                                role="tab"
                                aria-selected="${
                                    active
                                        ? "true"
                                        : "false"
                                }"
                                aria-controls="workout-week-panel-${week.number}"
                            >

                                <span>
                                    هفته
                                </span>

                                <strong>
                                    ${String(
                                        week.number
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </strong>

                            </button>
                        `;
                    }
                )
                .join("");
    };


    const renderWeek = (
        week
    ) => {

        contentContainer.innerHTML = `

            <div
                class="workout-week-panel active"
                id="workout-week-panel-${week.number}"
                data-week-panel="${week.number}"
                role="tabpanel"
                aria-labelledby="workout-week-tab-${week.number}"
            >

                <div class="workout-week-header">

                    <div>

                        <span class="workout-week-label">
                            ${escapeHtml(
                                week.label
                            )}
                        </span>

                        <h3>
                            ${escapeHtml(
                                week.title
                            )}
                        </h3>

                    </div>


                    <div class="workout-week-progress">

                        <i class="bi bi-check2-circle"></i>

                        <span>
                            ${escapeHtml(
                                week.sessions
                            )}
                        </span>

                    </div>

                </div>


                <div class="workout-grid">

                    ${renderWorkoutCards(
                        week.workouts
                    )}

                </div>

            </div>
        `;
    };


    const updateTabsForWeek = (
        weekNumber
    ) => {

        const tabs =
            tabsContainer.querySelectorAll(
                ".workout-week-tab"
            );


        tabs.forEach(
            (tab) => {

                const active =
                    String(
                        tab.dataset.week
                    ) ===
                    String(
                        weekNumber
                    );


                tab.classList.toggle(
                    "active",
                    active
                );


                tab.setAttribute(
                    "aria-selected",
                    String(active)
                );


                tab.tabIndex =
                    active
                        ? 0
                        : -1;
            }
        );
    };


    const bindTabs = (
        weeks
    ) => {

        tabsContainer.addEventListener(
            "click",
            (event) => {

                const tab =
                    event.target.closest(
                        ".workout-week-tab"
                    );


                if (!tab) {
                    return;
                }


                const weekNumber =
                    Number(
                        tab.dataset.week
                    );


                const week =
                    weeks.find(
                        (item) =>
                            item.number ===
                            weekNumber
                    );


                if (!week) {
                    return;
                }


                updateTabsForWeek(
                    weekNumber
                );


                renderWeek(
                    week
                );
            }
        );
    };


    const renderLoading = () => {

        tabsContainer.innerHTML = "";


        contentContainer.innerHTML = `

            <div
                class="workout-week-panel active"
                role="tabpanel"
            >

                <div class="workout-week-header">

                    <div>

                        <span class="workout-week-label">
                            در حال دریافت
                        </span>

                        <h3>
                            برنامه تمرینی
                        </h3>

                    </div>


                    <div class="workout-week-progress">

                        <i class="bi bi-arrow-repeat"></i>

                        <span>
                            لطفاً کمی صبر کنید
                        </span>

                    </div>

                </div>

            </div>
        `;
    };


    const renderError = () => {

        tabsContainer.innerHTML = "";


        contentContainer.innerHTML = `

            <div
                class="workout-week-panel active"
                role="tabpanel"
            >

                <div class="workout-week-header">

                    <div>

                        <span class="workout-week-label">
                            خطا
                        </span>

                        <h3>
                            دریافت برنامه تمرینی ممکن نشد.
                        </h3>

                    </div>


                    <div class="workout-week-progress">

                        <i class="bi bi-exclamation-circle"></i>

                        <span>
                            اتصال به API برقرار نشد
                        </span>

                    </div>

                </div>

            </div>
        `;
    };


    const renderProgramWorkoutMeta = (
        plan
    ) => {

        const title =
            document.querySelector(
                '[data-workout-field="title"]'
            );


        const description =
            document.querySelector(
                '[data-workout-field="description"]'
            );


        if (title) {

            const accent =
                title.querySelector(
                    "span"
                );


            title.textContent =
                plan.title;


            if (accent) {

                title.appendChild(
                    document.createTextNode(
                        " "
                    )
                );


                title.appendChild(
                    accent
                );
            }
        }


        if (description) {

            description.textContent =
                plan.description;
        }
    };


    const loadWorkouts =
        async () => {

            renderLoading();


            try {

                const response =
                    await fetch(
                        `/api/programs/${encodeURIComponent(
                            slug
                        )}/workouts`,
                        {
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `Workout API returned ${response.status}`
                    );
                }


                const result =
                    await response.json();


                if (
                    !result?.success ||
                    !result.data ||
                    !Array.isArray(
                        result.data.weeks
                    ) ||
                    result.data.weeks.length ===
                        0
                ) {

                    throw new Error(
                        "Invalid workout API response."
                    );
                }


                renderProgramWorkoutMeta(
                    result.data
                );


                renderTabs(
                    result.data.weeks
                );


                renderWeek(
                    result.data.weeks[0]
                );


                bindTabs(
                    result.data.weeks
                );

            } catch (error) {

                console.error(
                    "Unable to load workout plan from API.",
                    error
                );


                renderError();
            }
        };


    loadWorkouts();

})();