document.querySelectorAll(".carousel").forEach((carousel) => {
    const itemsCount = carousel.querySelectorAll(".carousel-item").length;

    if (!carousel.classList.contains("carousel-no-navigation")) {
        addNavigation();
    }

    function addNavigation() {
        const navigation = document.querySelector(".slider-nav");
        const sec_navigation = document.querySelector(".sec-nav");

        for (let i = 0; i < itemsCount; i++) {
            const btn = document.createElement("a");
            btn.setAttribute("href", "#");
            btn.setAttribute("class", "carousel-navigation-btn");
            navigation.append(btn);
            //sec_navigation.append(btn);
            btn.onclick = function (e) {
                e.preventDefault();
                showSlide(i);
            };
        }
    }

    let previousItem, activeItem, nextItem;
    showSlide(0);

    function showSlide(index) {
        if (index >= itemsCount) {
            activeItem = 0;
        } else if (index < 0) {
            activeItem = itemsCount - 1;
        } else {
            activeItem = index;
        }
        nextItem = activeItem + 1 >= itemsCount ? 0 : activeItem + 1;
        previousItem = activeItem - 1 < 0 ? itemsCount - 1 : activeItem - 1;
        removeClasses();
        addClasses();
    }

    function removeClasses() {
        carousel.querySelectorAll(".carousel-item").forEach((slide) => {
            slide.classList.remove("previous", "active", "next");
        });
        document.querySelectorAll(".carousel-navigation-btn").forEach((btn) => {
            btn.classList.remove("active");
        });
    }

    function addClasses() {
        carousel.querySelectorAll(".carousel-item")[activeItem].classList.add("active");
        carousel.querySelectorAll(".carousel-item")[previousItem].classList.add("previous");
        carousel.querySelectorAll(".carousel-item")[nextItem].classList.add("next");
        document.querySelectorAll(".carousel-navigation-btn")[activeItem].classList.add("active");
    }

    const arrowLeft = document.querySelector(".carousel-arrow-left");
    arrowLeft.onclick = function (e) {
        e.preventDefault();
        showSlide(activeItem - 1);
    };

    const arrowRight = document.querySelector(".carousel-arrow-right");
    arrowRight.onclick = function (e) {
        e.preventDefault();
        showSlide(activeItem + 1);
    };

    const sec_arrowLeft = document.querySelector(".sec-arrow-left");
    sec_arrowLeft.onclick = function (e) {
        e.preventDefault();
        showSlide(activeItem - 1);
    };

    const sec_arrowRight = document.querySelector(".sec-arrow-right");
    sec_arrowRight.onclick = function (e) {
        e.preventDefault();
        showSlide(activeItem + 1);
    };
});