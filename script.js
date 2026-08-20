"use strict";

/* =========================================================
   SUKHCHAIN SINGH - PORTFOLIO JAVASCRIPT
   No external JavaScript libraries required.
   ========================================================= */


/* =========================
   DOM ELEMENTS
========================= */

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

const mobileNavLinks = mobileNav
    ? mobileNav.querySelectorAll("a")
    : [];

const navigationLinks = document.querySelectorAll(
    '.nav-link[href^="#"]'
);

const sections = document.querySelectorAll(
    "main section[id]"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);

const currentYearElement = document.getElementById(
    "current-year"
);


/* =========================
   CURRENT YEAR
========================= */

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}


/* =========================
   HEADER BACKGROUND ON SCROLL
========================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

updateHeader();

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* =========================
   MOBILE MENU
========================= */

function openMobileMenu() {

    if (!menuToggle || !mobileNav) {
        return;
    }

    menuToggle.classList.add("active");
    mobileNav.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add("menu-open");
}


function closeMobileMenu() {

    if (!menuToggle || !mobileNav) {
        return;
    }

    menuToggle.classList.remove("active");
    mobileNav.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove("menu-open");
}


if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const menuIsOpen =
                mobileNav.classList.contains("active");

            if (menuIsOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        }
    );
}


/* =========================
   CLOSE MOBILE MENU
   AFTER CLICKING A LINK
========================= */

mobileNavLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {
            closeMobileMenu();
        }
    );

});


/* =========================
   CLOSE MENU WITH ESC KEY
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    }
);


/* =========================
   CLOSE MOBILE MENU
   WHEN SCREEN BECOMES DESKTOP
========================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 820) {
            closeMobileMenu();
        }

    }
);


/* =========================
   ACTIVE NAVIGATION LINK
========================= */

function updateActiveNavigation() {

    if (!sections.length) {
        return;
    }

    let activeSectionId = "";

    const scrollPosition =
        window.scrollY + 170;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            activeSectionId =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (
            linkTarget ===
            `#${activeSectionId}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);

updateActiveNavigation();


/* =========================
   REDUCED MOTION CHECK
========================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

if (prefersReducedMotion) {

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

} else if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
       Fallback for older browsers
       without IntersectionObserver.
    */

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================
   PLACEHOLDER LINKS
========================= */

/*
   LinkedIn URL is currently not available.

   Any link with:
   class="placeholder-link"

   and:
   href="#"

   will not navigate anywhere.

   Later, when you add your real LinkedIn URL,
   it will work normally.
*/

const placeholderLinks =
    document.querySelectorAll(
        ".placeholder-link"
    );


placeholderLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href.trim() === "#"
            ) {

                event.preventDefault();

            }

        }
    );

});


/* =========================
   SMOOTH INTERNAL LINKS
========================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );


internalLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });

        }
    );

});
