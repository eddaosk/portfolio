document.addEventListener("DOMContentLoaded", () => {
    /* ══════════════════════════════════════════════════
       1. SCROLL REVEAL — IntersectionObserver
       ══════════════════════════════════════════════════ */
    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 },
        );

        reveals.forEach((el) => revealObserver.observe(el));
    } else {
        // If reduced motion or no reveals, show everything immediately
        reveals.forEach((el) => el.classList.add("is-visible"));
    }

    /* ══════════════════════════════════════════════════
       3. MOBILE MENU — toggle & auto-close
       ══════════════════════════════════════════════════ */
    const toggle = document.querySelector(".exam-topbar__toggle");
    const menu = document.querySelector(".exam-topbar__menu");

    if (toggle && menu) {
        const icon = toggle.querySelector("i");

        function closeMenu() {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            if (icon) icon.className = "fas fa-bars";
        }

        function openMenu() {
            menu.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
            if (icon) icon.className = "fas fa-times";
        }

        toggle.addEventListener("click", () => {
            menu.classList.contains("is-open") ? closeMenu() : openMenu();
        });

        // Close on link click
        menu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (menu.classList.contains("is-open") && !menu.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && menu.classList.contains("is-open")) {
                closeMenu();
                toggle.focus();
            }
        });
    }

    /* ══════════════════════════════════════════════════
       4. CAROUSELS
       ══════════════════════════════════════════════════ */
    function initCarousels() {
        document.querySelectorAll(".exam-case__carousel").forEach((carousel) => {
            const track = carousel.querySelector(".exam-case__carousel-track");
            const slides = carousel.querySelectorAll(".exam-case__slide");
            const counter = carousel.querySelector(".exam-case__carousel-counter");
            const prevBtn = carousel.querySelector(".exam-case__carousel-btn--prev");
            const nextBtn = carousel.querySelector(".exam-case__carousel-btn--next");

            if (!track || slides.length === 0) return;

            const total = slides.length;
            let current = 0;

            // No point showing controls for a single image
            if (total <= 1) {
                prevBtn?.remove();
                nextBtn?.remove();
                counter?.remove();
                return;
            }

            function goTo(index) {
                current = ((index % total) + total) % total;
                track.style.transform = `translateX(-${current * 100}%)`;
                if (counter) counter.textContent = `${current + 1} / ${total}`;
            }

            prevBtn?.addEventListener("click", () => goTo(current - 1));
            nextBtn?.addEventListener("click", () => goTo(current + 1));

            // Touch / swipe
            let touchStartX = 0;
            let touchStartY = 0;
            let isHorizontalSwipe = false;

            track.addEventListener(
                "touchstart",
                (e) => {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    isHorizontalSwipe = false;
                },
                { passive: true },
            );

            track.addEventListener(
                "touchmove",
                (e) => {
                    const dx = Math.abs(e.touches[0].clientX - touchStartX);
                    const dy = Math.abs(e.touches[0].clientY - touchStartY);
                    if (dx > dy && dx > 8) {
                        isHorizontalSwipe = true;
                        e.preventDefault(); // stop page scroll while swiping carousel
                    }
                },
                { passive: false },
            );

            track.addEventListener("touchend", (e) => {
                if (!isHorizontalSwipe) return;
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
            });
        });
    }

    /* ══════════════════════════════════════════════════
       5. CASE ACCORDIONS
       ══════════════════════════════════════════════════ */
    function initCaseAccordions() {
        // Exclude the visual card — it has no toggle
        const allCases = Array.from(document.querySelectorAll(".exam-case:not(.exam-case--visual)"));

        allCases.forEach((caseEl) => {
            const toggle = caseEl.querySelector(".exam-case__toggle");
            const body = caseEl.querySelector(".exam-case__body");
            const closeBtn = caseEl.querySelector(".exam-case__close");

            if (!toggle || !body) return;

            function closeCase(returnFocus = false) {
                body.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                if (returnFocus) toggle.focus();
            }

            function openCase() {
                // Collapse any other open case first
                allCases.forEach((other) => {
                    if (other === caseEl) return;
                    const otherToggle = other.querySelector(".exam-case__toggle");
                    const otherBody = other.querySelector(".exam-case__body");
                    if (otherBody?.classList.contains("is-open")) {
                        otherBody.classList.remove("is-open");
                        otherToggle?.setAttribute("aria-expanded", "false");
                    }
                });

                body.classList.add("is-open");
                toggle.setAttribute("aria-expanded", "true");

                // Nudge the card header into view after animation starts
                setTimeout(() => {
                    caseEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 80);
            }

            toggle.addEventListener("click", () => {
                toggle.getAttribute("aria-expanded") === "true" ? closeCase() : openCase();
            });

            // Close button returns focus to the toggle and scrolls back up
            closeBtn?.addEventListener("click", () => {
                closeCase(true);
                setTimeout(() => {
                    caseEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 50);
            });
        });
    }

    initCarousels();
    initCaseAccordions();
});
