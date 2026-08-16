/* ==========================================================
   PART 3A
   NAVBAR + ACTIVE MENU + BACK TO TOP
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENT
    ===================================== */

    const navbar = document.getElementById("navbar");

    const topBtn = document.getElementById("topBtn");

    const navLinks = document.querySelectorAll("#navbar a");

    const sections = document.querySelectorAll("section");

    /* =====================================
       SCROLL EVENT
    ===================================== */

    function handleScroll() {

        const scrollY = window.scrollY;

        /* Navbar */

        if (scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

        /* Back To Top */

        if (scrollY > 400) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

        /* Active Menu */

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    /* =====================================
       BACK TO TOP
    ===================================== */

    topBtn.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetID = this.getAttribute("href");

            const target = document.querySelector(targetID);

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        });

    });

});

/* ==========================================================
   PART 3B
   LIGHTBOX GALLERY
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENT
    ===================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const closeLightbox = document.getElementById("closeLightbox");


    /* =====================================
       OPEN LIGHTBOX
    ===================================== */

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function (e) {

            e.preventDefault();

            const imageURL = this.getAttribute("href");

            if (!imageURL) return;

            lightboxImage.src = imageURL;

            lightbox.classList.add("show");

            document.body.classList.add("lightbox-open");

        });

    });


    /* =====================================
       CLOSE LIGHTBOX - BUTTON X
    ===================================== */

    closeLightbox.addEventListener("click", function () {

        closeLightboxFunction();

    });


    /* =====================================
       CLOSE LIGHTBOX - CLICK BACKGROUND
    ===================================== */

    lightbox.addEventListener("click", function (e) {

        if (e.target === lightbox) {

            closeLightboxFunction();

        }

    });


    /* =====================================
       CLOSE LIGHTBOX - ESC KEY
    ===================================== */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            closeLightboxFunction();

        }

    });


    /* =====================================
       CLOSE FUNCTION
    ===================================== */

    function closeLightboxFunction() {

        lightbox.classList.remove("show");

        document.body.classList.remove("lightbox-open");

        setTimeout(function () {

            lightboxImage.src = "";

        }, 300);

    }

});

/* ==========================================================
   PART 3C
   LIGHTBOX NAVIGATION
   PREVIOUS / NEXT / KEYBOARD / SWIPE
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENT
    ===================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById("lightboxImage");

    const prevImage = document.getElementById("prevImage");

    const nextImage = document.getElementById("nextImage");

    const imageCounter = document.getElementById("imageCounter");


    /* =====================================
       CHECK ELEMENT
    ===================================== */

    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !prevImage ||
        !nextImage ||
        !imageCounter
    ) {

        return;

    }


    /* =====================================
       CURRENT IMAGE
    ===================================== */

    let currentIndex = 0;


    /* =====================================
       TOTAL IMAGE
    ===================================== */

    const totalImages = galleryItems.length;


    /* =====================================
       GET IMAGE URL
    ===================================== */

    function getImageURL(index) {

        return galleryItems[index].getAttribute("href");

    }


    /* =====================================
       SHOW IMAGE
    ===================================== */

    function showImage(index) {

        if (index < 0) {

            index = totalImages - 1;

        }

        if (index >= totalImages) {

            index = 0;

        }

        currentIndex = index;


        const imageURL = getImageURL(currentIndex);


        if (!imageURL) return;


        lightboxImage.src = imageURL;


        imageCounter.textContent =
            (currentIndex + 1) + " / " + totalImages;


        /* Preload next image */

        const nextIndex =
            (currentIndex + 1) % totalImages;

        const preloadNext = new Image();

        preloadNext.src = getImageURL(nextIndex);


        /* Preload previous image */

        const previousIndex =
            (currentIndex - 1 + totalImages) % totalImages;

        const preloadPrevious = new Image();

        preloadPrevious.src = getImageURL(previousIndex);

    }


    /* =====================================
       OPEN IMAGE
    ===================================== */

    galleryItems.forEach(function (item, index) {

        item.addEventListener("click", function () {

            currentIndex = index;

            showImage(currentIndex);

        });

    });


    /* =====================================
       NEXT IMAGE
    ===================================== */

    nextImage.addEventListener("click", function (e) {

        e.stopPropagation();

        showImage(currentIndex + 1);

    });


    /* =====================================
       PREVIOUS IMAGE
    ===================================== */

    prevImage.addEventListener("click", function (e) {

        e.stopPropagation();

        showImage(currentIndex - 1);

    });


    /* =====================================
       KEYBOARD NAVIGATION
    ===================================== */

    document.addEventListener("keydown", function (e) {

        if (!lightbox.classList.contains("show")) {

            return;

        }


        if (e.key === "ArrowRight") {

            showImage(currentIndex + 1);

        }


        if (e.key === "ArrowLeft") {

            showImage(currentIndex - 1);

        }

    });


    /* =====================================
       TOUCH / SWIPE
    ===================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener("touchstart", function (e) {

        touchStartX =
            e.changedTouches[0].screenX;

    });


    lightbox.addEventListener("touchend", function (e) {

        touchEndX =
            e.changedTouches[0].screenX;

        handleSwipe();

    });


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Swipe minimum 50px */

        if (Math.abs(swipeDistance) < 50) {

            return;

        }


        /* Swipe LEFT */

        if (swipeDistance < 0) {

            showImage(currentIndex + 1);

        }


        /* Swipe RIGHT */

        else {

            showImage(currentIndex - 1);

        }

    }


    /* =====================================
       COUNTER INITIALIZATION
    ===================================== */

    imageCounter.textContent =
        "1 / " + totalImages;

});