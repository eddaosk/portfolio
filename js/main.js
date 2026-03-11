// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== "undefined") {
        AOS.init({
            once: true,
            duration: 800,
            offset: 60,
        });
    }

    // Navbar scroll behavior — add .scrolled class on scroll
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        function onScroll() {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

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

        if (totalEl) totalEl.textContent = String(items.length);
        const activeIndex = Array.from(items).findIndex((i) => i.classList.contains("active"));
        if (currentEl && activeIndex >= 0) currentEl.textContent = String(activeIndex + 1);

        carouselEl.addEventListener("slid.bs.carousel", (evt) => {
            const target = evt.target;
            const active = target.querySelector(".carousel-item.active");
            const idx = Array.from(target.querySelectorAll(".carousel-item")).indexOf(active);
            if (currentEl && idx >= 0) currentEl.textContent = String(idx + 1);
        });
    });

    // Hobby grid: shuffle all items, show only 6 at a time
    const hobbyGrid = document.querySelector(".hobby-grid");
    if (hobbyGrid) {
        const VISIBLE_COUNT = 6;
        const allItems = Array.from(hobbyGrid.children);

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        function showRandomSubset() {
            shuffleArray(allItems);
            allItems.forEach((el, i) => {
                hobbyGrid.appendChild(el);
                if (i < VISIBLE_COUNT) {
                    el.classList.remove("hobby-hidden");
                    el.classList.add("hobby-visible");
                } else {
                    el.classList.remove("hobby-visible");
                    el.classList.add("hobby-hidden");
                }
            });
        }

        showRandomSubset();

        // Refresh button
        const refreshBtn = document.querySelector(".hobby-refresh-btn");
        if (refreshBtn) {
            refreshBtn.addEventListener("click", () => {
                hobbyGrid.classList.add("hobby-fade-out");
                setTimeout(() => {
                    showRandomSubset();
                    hobbyGrid.classList.remove("hobby-fade-out");
                }, 300);
            });
        }

        // Lightbox
        const overlay = document.querySelector(".lightbox-overlay");
        const overlayImg = overlay ? overlay.querySelector(".lightbox-img") : null;
        const overlayClose = overlay ? overlay.querySelector(".lightbox-close") : null;

        let lastFocusedEl = null;

        function isLightboxOpen() {
            return !!(overlay && overlay.classList.contains("open"));
        }

        function setOverlayA11y(open) {
            if (!overlay) return;
            overlay.setAttribute("aria-hidden", open ? "false" : "true");
            overlay.setAttribute("aria-modal", open ? "true" : "false");
            overlay.tabIndex = open ? -1 : -1;
        }

        function openLightbox(src, alt) {
            if (!overlay || !overlayImg) return;
            lastFocusedEl = document.activeElement;
            overlayImg.src = src;
            overlayImg.alt = alt || "Full-size image";
            overlay.classList.add("open");
            setOverlayA11y(true);
            document.body.style.overflow = "hidden";

            if (overlayClose) {
                overlayClose.focus();
            } else {
                overlay.focus();
            }
        }

        function closeLightbox() {
            if (!overlay || !overlayImg) return;
            overlay.classList.remove("open");
            setOverlayA11y(false);
            overlayImg.src = "";
            document.body.style.overflow = "";

            if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
                lastFocusedEl.focus();
            }
        }

        hobbyGrid.querySelectorAll(".hobby-item img").forEach((img) => {
            img.addEventListener("click", () => openLightbox(img.src, img.alt));
            img.style.cursor = "zoom-in";
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", `Open image: ${img.alt || "Hobby image"}`);
            img.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(img.src, img.alt);
                }
            });
        });

        if (overlayClose) overlayClose.addEventListener("click", closeLightbox);

        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) closeLightbox();
            });
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && isLightboxOpen()) closeLightbox();
        });
    }
});
