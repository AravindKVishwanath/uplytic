document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const dashboard = document.getElementById("dashboard");

    // Show Dashboard on Login
    loginBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");
    });

    // Show Dashboard on Sign Up
    signupBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        dashboard.classList.remove("hidden");
    });
});
