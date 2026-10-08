"use strict";

(() => {
    const loginForm = document.querySelector("#loginForm");

    const emailInput = document.querySelector("#login-email");
    const passwordInput = document.querySelector("#login-password");

    const passwordToggle = document.querySelector("#passwordToggle");
    const forgotPasswordLink = document.querySelector("#forgotPasswordLink");

    const feedback = document.querySelector("#loginFeedback");


    /* =================================
       SAFETY CHECK
    ================================= */

    if (!loginForm || !emailInput || !passwordInput) {
        return;
    }


    /* =================================
       FIELD STATE
    ================================= */

    const setFieldState = (input, message = "") => {

        const group = input.closest(".form-group");
        const error = group?.querySelector(".form-error");

        if (!group || !error) {
            return;
        }

        group.classList.toggle(
            "has-error",
            Boolean(message)
        );

        group.classList.toggle(
            "has-success",
            !message && input.value.trim() !== ""
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
       BLUR + INPUT EVENTS
    ================================= */

    [
        emailInput,
        passwordInput
    ].forEach((input, index) => {

        input.addEventListener(
            "blur",
            index === 0
                ? validateEmail
                : validatePassword
        );


        input.addEventListener(
            "input",
            () => {

                setFieldState(
                    input,
                    ""
                );

                clearFeedback();
            }
        );

    });


    /* =================================
       PASSWORD TOGGLE
    ================================= */

    passwordToggle?.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type === "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            passwordToggle.textContent =
                isPassword
                    ? "مخفی کردن رمز عبور"
                    : "نمایش رمز عبور";


            passwordToggle.setAttribute(
                "aria-pressed",
                String(isPassword)
            );
        }
    );


    /* =================================
       FORGOT PASSWORD
    ================================= */

    forgotPasswordLink?.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (!feedback) {
                return;
            }


            feedback.textContent =
                "بازیابی رمز عبور در این نسخه هنوز به سرویس واقعی متصل نشده است.";


            feedback.classList.add(
                "show"
            );
        }
    );


    /* =================================
       LOGIN SUBMIT
    ================================= */

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            clearFeedback();


            const isEmailValid =
                validateEmail();

            const isPasswordValid =
                validatePassword();


            if (
                !isEmailValid ||
                !isPasswordValid
            ) {
                return;
            }


            feedback.textContent =
                "اطلاعات ورود معتبر است؛ اتصال به API در مرحله Backend انجام می‌شود.";


            feedback.classList.add(
                "show"
            );
        }
    );

})();