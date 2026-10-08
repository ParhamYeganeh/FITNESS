"use strict";

(() => {
    const registerForm = document.querySelector("#registerForm");

    const nameInput = document.querySelector("#register-name");
    const emailInput = document.querySelector("#register-email");
    const passwordInput = document.querySelector("#register-password");
    const confirmInput = document.querySelector("#register-password-confirm");

    const feedback = document.querySelector("#registerFeedback");

    const toggleButtons = document.querySelectorAll(
        ".register-password-toggle"
    );


    /* =================================
       SAFETY CHECK
    ================================= */

    if (
        !registerForm ||
        !nameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmInput
    ) {
        return;
    }


    /* =================================
       FIELD STATE
    ================================= */

    const setFieldState = (input, message = "") => {

        const group =
            input.closest(".form-group");

        const error =
            group?.querySelector(".form-error");


        if (!group || !error) {
            return;
        }


        group.classList.toggle(
            "has-error",
            Boolean(message)
        );


        group.classList.toggle(
            "has-success",
            !message &&
            input.value.trim() !== ""
        );


        error.textContent = message;
    };


    /* =================================
       CLEAR FEEDBACK
    ================================= */

    const clearFeedback = () => {

        if (!feedback) {
            return;
        }


        feedback.textContent = "";

        feedback.classList.remove(
            "show"
        );
    };


    /* =================================
       NAME VALIDATION
    ================================= */

    const validateName = () => {

        const value =
            nameInput.value.trim();


        if (!value) {

            setFieldState(
                nameInput,
                "لطفاً نام و نام خانوادگی خود را وارد کنید."
            );

            return false;
        }


        if (value.length < 3) {

            setFieldState(
                nameInput,
                "نام باید حداقل ۳ کاراکتر باشد."
            );

            return false;
        }


        setFieldState(nameInput);

        return true;
    };


    /* =================================
       EMAIL VALIDATION
    ================================= */

    const validateEmail = () => {

        const value =
            emailInput.value.trim();


        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!value) {

            setFieldState(
                emailInput,
                "لطفاً ایمیل خود را وارد کنید."
            );

            return false;
        }


        if (!pattern.test(value)) {

            setFieldState(
                emailInput,
                "فرمت ایمیل صحیح نیست."
            );

            return false;
        }


        setFieldState(emailInput);

        return true;
    };


    /* =================================
       PASSWORD VALIDATION
    ================================= */

    const validatePassword = () => {

        const value =
            passwordInput.value;


        if (!value) {

            setFieldState(
                passwordInput,
                "لطفاً رمز عبور خود را وارد کنید."
            );

            return false;
        }


        if (value.length < 6) {

            setFieldState(
                passwordInput,
                "رمز عبور باید حداقل ۶ کاراکتر باشد."
            );

            return false;
        }


        setFieldState(passwordInput);

        return true;
    };


    /* =================================
       CONFIRM PASSWORD VALIDATION
    ================================= */

    const validateConfirm = () => {

        const value =
            confirmInput.value;


        if (!value) {

            setFieldState(
                confirmInput,
                "لطفاً تکرار رمز عبور را وارد کنید."
            );

            return false;
        }


        if (value !== passwordInput.value) {

            setFieldState(
                confirmInput,
                "رمزهای عبور با یکدیگر مطابقت ندارند."
            );

            return false;
        }


        setFieldState(confirmInput);

        return true;
    };


    /* =================================
       VALIDATORS
    ================================= */

    const validators = [
        [nameInput, validateName],
        [emailInput, validateEmail],
        [passwordInput, validatePassword],
        [confirmInput, validateConfirm]
    ];


    /* =================================
       INPUT EVENTS
    ================================= */

    validators.forEach(
        ([input, validator]) => {

            input.addEventListener(
                "blur",
                validator
            );


            input.addEventListener(
                "input",
                () => {

                    setFieldState(
                        input,
                        ""
                    );

                    clearFeedback();


                    if (
                        input === passwordInput &&
                        confirmInput.value
                    ) {
                        setFieldState(
                            confirmInput,
                            ""
                        );
                    }
                }
            );
        }
    );


    /* =================================
       PASSWORD TOGGLE
    ================================= */

    toggleButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const targetId =
                        button.dataset.target;


                    const target =
                        document.querySelector(
                            `#${targetId}`
                        );


                    if (!target) {
                        return;
                    }


                    const showing =
                        target.type === "password";


                    target.type =
                        showing
                            ? "text"
                            : "password";


                    button.textContent =
                        showing
                            ? "مخفی کردن"
                            : "نمایش رمز عبور";


                    button.setAttribute(
                        "aria-pressed",
                        String(showing)
                    );
                }
            );
        }
    );


    /* =================================
       FORM SUBMIT
    ================================= */

    registerForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            clearFeedback();


            const isNameValid =
                validateName();


            const isEmailValid =
                validateEmail();


            const isPasswordValid =
                validatePassword();


            const isConfirmValid =
                validateConfirm();


            if (
                !isNameValid ||
                !isEmailValid ||
                !isPasswordValid ||
                !isConfirmValid
            ) {
                return;
            }


            if (!feedback) {
                return;
            }


            feedback.textContent =
                "اطلاعات ثبت‌نام معتبر است؛ ساخت حساب واقعی در مرحله Backend انجام می‌شود.";


            feedback.classList.add(
                "show"
            );
        }
    );

})();