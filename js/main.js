// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer(s)
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".js-current-year").forEach((el) => {
        el.textContent = currentYear;
    });

    // Initialize slide counters for all project carousels
    const carousels = document.querySelectorAll(".project-carousel");
    carousels.forEach((carouselEl) => {
        const wrapper = carouselEl.closest(".carousel-wrapper");
        if (!wrapper) return;

        const totalEl = wrapper.querySelector(".total-slides");
        const currentEl = wrapper.querySelector(".current-slide");
        const items = carouselEl.querySelectorAll(".carousel-item");

        // On load: set total and current
        if (totalEl) totalEl.textContent = String(items.length);
        const activeIndex = Array.from(items).findIndex((i) => i.classList.contains("active"));
        if (currentEl && activeIndex >= 0) currentEl.textContent = String(activeIndex + 1);

        // On change: update current on Bootstrap's slid event
        carouselEl.addEventListener("slid.bs.carousel", (evt) => {
            const target = evt.target;
            const active = target.querySelector(".carousel-item.active");
            const idx = Array.from(target.querySelectorAll(".carousel-item")).indexOf(active);
            if (currentEl && idx >= 0) currentEl.textContent = String(idx + 1);
        });
    });
});
