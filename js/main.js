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

    // Randomize hobby grid items order on each load for a varied layout
    const hobbyGrid = document.querySelector(".hobby-grid");
    if (hobbyGrid) {
        const items = Array.from(hobbyGrid.children);
        // Fisher-Yates shuffle
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        // Re-append in shuffled order
        items.forEach((el) => hobbyGrid.appendChild(el));

        // Lightbox setup
        const overlay = document.querySelector(".lightbox-overlay");
        const overlayImg = overlay ? overlay.querySelector(".lightbox-img") : null;
        const overlayClose = overlay ? overlay.querySelector(".lightbox-close") : null;

        function openLightbox(src, alt) {
            if (!overlay || !overlayImg) return;
            overlayImg.src = src;
            overlayImg.alt = alt || "Full-size image";
            overlay.classList.add("open");
            document.body.style.overflow = "hidden";
        }

        function closeLightbox() {
            if (!overlay || !overlayImg) return;
            overlay.classList.remove("open");
            overlayImg.src = "";
            document.body.style.overflow = "";
        }

        // Click on image opens lightbox
        hobbyGrid.querySelectorAll(".hobby-item img").forEach((img) => {
            img.addEventListener("click", () => openLightbox(img.src, img.alt));
            img.style.cursor = "zoom-in";
        });

        // Close button
        if (overlayClose) overlayClose.addEventListener("click", closeLightbox);

        // Click outside content closes
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) closeLightbox();
            });
        }
        // Escape key closes
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }
});
