// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer(s)
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".js-current-year").forEach((el) => {
        el.textContent = currentYear;
    });
});
