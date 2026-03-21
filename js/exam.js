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
       2. ACTIVE NAV — highlight link on scroll
       ══════════════════════════════════════════════════ */
    const navLinks = document.querySelectorAll(".exam-topbar__link[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;

        let current = "";
        sections.forEach((section) => {
            if (scrollY >= section.offsetTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
        });
    }

    if (navLinks.length && sections.length) {
        window.addEventListener("scroll", updateActiveNav, { passive: true });
        updateActiveNav();
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
});
