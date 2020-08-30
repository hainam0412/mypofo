/* Slider Code start */
function mainSlider() {
  const sliderContainer = document.querySelector(".slider-container");

  if (sliderContainer) {
    const mySlider = document.querySelector(".my-slider");
    let sliders = document.querySelectorAll(".splide__slide");
    const prevB = document.getElementById("prev-button");
    const nextB = document.getElementById("next-button");
    const sliderControl = document.getElementsByName("slider");
    let index = 1;
    let c = 0;

    let sliderContents = document.querySelectorAll(".splide__slide .content");
    let slideId;
    const interval = 10000;

    // Clone the last and first slide
    const firstClone = sliders[0].cloneNode(true);
    const lastClone = sliders[sliders.length - 1].cloneNode(true);

    firstClone.id = "first-clone";
    lastClone.id = "last-clone";

    //Push clone to list sliders
    mySlider.append(firstClone);
    mySlider.prepend(lastClone);

    //Get slide width
    const slideHeight = sliders[index].clientHeight;

    mySlider.style.transform = `translateY(${-slideHeight * index}px)`;

    //Auto Slider

    const startSlide = () => {
      slideId = setInterval(() => {
        nextSlide();
      }, interval);
    };

    startSlide();

    sliderContainer.addEventListener("mouseenter", () => {
      clearInterval(slideId);
    });

    sliderContainer.addEventListener("mouseleave", () => {
      startSlide();
    });

    const getSlides = () => document.querySelectorAll(".splide__slide");

    mySlider.addEventListener("transitionend", () => {
      sliders = getSlides();

      if (sliders[index].id === firstClone.id) {
        mySlider.style.transition = "none";
        index = 1;
        mySlider.style.transform = `translateY(${-slideHeight * index}px)`;
      }

      if (sliders[index].id === lastClone.id) {
        mySlider.style.transition = "none";
        index = sliders.length - 2;
        mySlider.style.transform = `translateY(${-slideHeight * index}px)`;
      }
    });

    // move to next slide
    const nextSlide = () => {
      sliders = getSlides();

      if (index >= sliders.length - 1) return;
      index++;
      c++;
      if (c >= sliders.length - 2) {
        c = 0;
      }
      controlSlider(c);
      pagination(c);
      changStyle(index);

      mySlider.style.transition = ".7s ease-out";
      mySlider.style.transform = `translateY(${-slideHeight * index}px)`;
    };

    //Move to previous slide
    const prevSlide = () => {
      sliders = getSlides();

      if (index <= 0) return;
      index--;
      c--;
      if (c < 0) c = sliders.length - 3;
      controlSlider(c);
      pagination(c);

      changStyle(index);

      mySlider.style.transition = "1s ease-out";
      mySlider.style.transform = `translateY(${-slideHeight * index}px)`;
    };

    //Add event listener
    nextB.addEventListener("click", nextSlide);
    prevB.addEventListener("click", prevSlide);

    // Add style to content of slide
    function changStyle(index) {
      sliderContents = document.querySelectorAll(".splide__slide .content");
      for (let i = 0; i < sliderContents.length; i++) {
        if (index == i) {
          sliderContents[i].style.animation = "swipeLeft  .7s";
        } else {
          sliderContents[i].style.animation = "";
        }
      }
    }

    // Animate slider dot
    function controlSlider(index) {
      sliders = getSlides();

      for (let i = 0; i < sliderControl.length; i++) {
        if (index == i) {
          sliderControl[i].checked = true;
        } else {
          sliderControl[i].checked = false;
        }
      }
    }

    // Animate the section bottom counter
    function pagination(index) {
      sliders = getSlides();
      const sliderCounter = document.querySelectorAll(".slider-info__number .counter div");

      for (let i = 0; i < sliderCounter.length; i++) {
        if (index == i) {
          sliderCounter[i].classList.add("show");
        } else {
          sliderCounter[i].classList.remove("show");
        }
      }
    }

    pagination(c);

    // Control slider by dot
    function sliderRadio() {
      for (let i = 0; i < sliderControl.length; i++) {
        let input = sliderControl[i];

        input.addEventListener("click", () => {
          let value = input.value;
          index = value;
          c = value - 1;
          controlSlider(c);
          pagination(c);
          changStyle(value);
          mySlider.style.transition = "1s ease-out";
          mySlider.style.transform = `translateY(${-slideHeight * value}px)`;
        });
      }
    }

    sliderRadio();
    controlSlider(c);
  }
}

mainSlider();

/* =================== Slider Code end ============== */

/* ================== Sticky section nav bar ======== */
function stickySectionNavBar() {
  const sectionNav = document.querySelector(".section-nav-bar");
  if (sectionNav) {
    const t =
      sectionNav.offsetTop +
      parseInt(window.getComputedStyle(sectionNav).height) +
      parseInt(window.getComputedStyle(sectionNav).height) / 2;

    const endP =
      document.getElementById("home-section-6").offsetTop +
      document.getElementById("home-section-6").getBoundingClientRect().height -
      120 -
      140;
    let lastScroll = 0;

    window.addEventListener("scroll", function () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0 && lastScroll <= currentScroll) {
        if (currentScroll >= t) {
          sectionNav.classList.add("section-nav-bar__stick");
        }

        lastScroll = currentScroll;
      } else {
        if (currentScroll <= t) {
          sectionNav.classList.remove("section-nav-bar__stick");
        }
        lastScroll = currentScroll;
      }
    });
  }
}

stickySectionNavBar();

/* =============== End of sticky section nav bar ===== */

/* =============== Skill progress ==================== */
function getWidthSkillBox() {
  const skillBox = document.querySelectorAll(".home-section-4__develop-inner");
  if (skillBox) {
    const skillProgress = document.querySelectorAll(".home-section-4__develop-number");

    let skillArray = [];

    for (let item of skillProgress) {
      skillArray.push(item.innerHTML.slice(0, 2));
    }

    for (let i = 0; i < skillBox.length; i++) {
      skillBox[i].setAttribute("style", `--width: ${skillArray[i]}%`);
    }
  }
}

getWidthSkillBox();

/* =================== End of skill progress ========= */

/* ==================== scroll section ============== */
function controlSectionBySectionNavBar() {
  const sectionNavBar = document.querySelector(".section-nav-bar");
  const scrollElements = document.querySelectorAll(".scroll-element");

  if (sectionNavBar) {
    const stUp = document.getElementById("section-up");
    const stDn = document.getElementById("section-down");
    let scp = 0;
    const posArr = [];

    for (let e of scrollElements) {
      let pos = e.getBoundingClientRect().top - 220;
      posArr.push(pos);
    }

    function getOffsetTop(e) {
      const children = e.querySelector(".section-padding");
      const style = window.getComputedStyle(children);
      return e.offsetTop - parseInt(style.paddingTop);
    }

    function scrollToSection(index) {
      for (let i = 0; i < scrollElements.length; i++) {
        let sc = scrollElements[i];
        let offset = getOffsetTop(sc);
        if (index == i) {
          window.scrollTo(0, offset);
        }
      }
    }

    stDn.addEventListener("click", () => {
      scp++;
      scrollToSection(scp);

      if (scp >= scrollElements.length - 1) {
        scp = scrollElements.length - 1;
      }
      styleNavLinks(scp);
    });

    stUp.addEventListener("click", () => {
      scp--;
      scrollToSection(scp);

      if (scp <= 0) {
        scp = 0;
      }
      styleNavLinks(scp);
    });

    window.addEventListener("scroll", () => {
      let c = document.body.scrollTop || document.documentElement.scrollTop;

      let s = -1;

      if (c <= posArr[0]) {
        s = -1;
        scp = s;
        styleNavLinks(scp);
      }

      if (c >= posArr[0]) {
        s = 0;
        scp = s;
        styleNavLinks(scp);
      }

      if (c >= posArr[1]) {
        s = 1;
        scp = s;
        styleNavLinks(scp);
      }

      if (c >= posArr[2]) {
        s = 2;
        scp = s;
        styleNavLinks(scp);
      }

      if (c >= posArr[3]) {
        s = 3;
        scp = s;
        styleNavLinks(scp);
      }

      if (c >= posArr[4]) {
        s = 4;
        scp = s;
        styleNavLinks(scp);
      }
    });

    const navLinks = document.querySelectorAll(".section-nav-bar li");

    navLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        scrollToSection(index);
        styleNavLinks(index);
        scp = index;
      });
    });

    function styleNavLinks(index) {
      for (let i = 0; i < navLinks.length; ++i) {
        if (index == i) {
          navLinks[i].classList.add("is-select");
        } else {
          navLinks[i].classList.remove("is-select");
        }
      }
    }
  }
}

controlSectionBySectionNavBar();
/* ================= End scroll section ============== */

/* ================= Window progress bar ============= */
function windowProgressScroll() {
  const inner = document.getElementById("progress-window");
  if (inner) {
    const p = inner.closest(".window-scroll-progress");

    const height = parseInt(window.getComputedStyle(document.body).height);

    window.addEventListener("scroll", () => {
      let c = document.body.scrollTop || document.documentElement.scrollTop;

      let progress = (c / height) * 100;

      progress >= 85 ? (p.style.display = "none") : (p.style.display = "");

      inner.style.width = progress + "%";
    });
  }
}

windowProgressScroll();

/* ==============End Window progress bar ============= */

/* ============== Footer style ======================= */
function footerHeight() {
  const div = document.getElementById("footer-height");
  const footer = document.querySelector("footer");

  if (footer && div) {
    const height = parseInt(window.getComputedStyle(footer).height);
    div.style.height = height + "px";
  }
}
footerHeight();

/* =============== scroll to top ===================== */
function scrollToTop() {
  const button = document.getElementById("to-top-btn");
  if (button) {
    button.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
}

scrollToTop();
/* =============== scroll to top ===================== */

/* =============== menu button ======================= */
function navMenuControl() {
  const mB = document.getElementById("nav__menu-button");
  if (mB) {
    const menu = document.getElementById("nav__menu-block");
    if (window.innerWidth <= 767) {
      menu.setAttribute("data-width", "100");
    }
    const width = menu.getAttribute("data-width");
    const filter = document.getElementById("filter");

    mB.addEventListener("click", () => {
      if (!mB.classList.contains("clicked")) {
        mB.classList.add("clicked");
        if (window.innerWidth <= 767) {
          menu.style.width = width + "%";
        } else {
          menu.style.width = width + "rem";
        }

        filter.style.display = "block";
      } else {
        mB.classList.remove("clicked");
        menu.style.width = "";
        filter.style.display = "none";
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target == filter) {
        mB.classList.remove("clicked");
        menu.style.width = "";
        filter.style.display = "none";
      }
    });

    const hasSubs = document.querySelectorAll(".has-sub > span");
    hasSubs.forEach((item) => {
      item.addEventListener("click", (e) => {
        const p = item.parentElement.querySelector(".sub-menu");

        if (p) {
          const height = parseInt(window.getComputedStyle(p).height);
          const p1 = item.closest(".nav__menu-list");
          p1.style.height = height + "px";
          p.style.transform = "translateX(0)";

          window.addEventListener("click", (e) => {
            if (e.target == filter || e.target == mB) {
              p.style.transform = "translateX(100%)";
              p1.style.height = "";
            }
          });
        }
      });
    });

    const subBacks = document.querySelectorAll(".sub-menu__back");

    for (let b of subBacks) {
      b.addEventListener("click", () => {
        const p1 = b.closest(".sub-menu");
        const p2 = b.closest(".nav__menu-list");
        p1.style.transform = "translateX(100%)";
        p2.style.height = "";
      });
    }
  }
}

navMenuControl();

/* =============== End menu button =================== */

/* =============== Animate Skill Pie ================= */

function animateSkillPie() {
  const pies = document.querySelectorAll("circle:not(.circle-block)");
  if (pies.length) {
    //Set inner percent inside the pie
    for (let pie of pies) {
      const span = pie.closest(".home-section-4__language-icon").querySelector("span");
      span.innerText = pie.getAttribute("data-pie");
    }

    function pieGoing(e, time, reserve = false) {
      let w = 0;
      setInterval(tikTok, time);
      const percent = e.getAttribute("data-pie");

      function tikTok() {
        if (reserve === true) {
          if (w <= 0) {
            w = percent;
          } else {
            e.setAttribute("style", `--width : ${w}`);
            w--;
          }
        } else {
          if (w >= percent) {
            w = 0;
          } else {
            e.setAttribute("style", `--width : ${w}`);
            w++;
          }
        }
      }
    }

    pieGoing(pies[0], 10, true);
    pieGoing(pies[1], 150);
    pieGoing(pies[2], 50, true);
    pieGoing(pies[3], 100);
  }
}

animateSkillPie();

/* =============== End Animate Skill Pie ============= */

function gallery() {
  const page = document.getElementById("gallery");

  if (page) {
    const navBar = document.querySelector(".gallery-nav-bar");
    const height = parseInt(getStyle(navBar).height);
    const container = document.querySelector(".gallery-container");
    const total = document.querySelector(".total");
    const current = document.querySelector(".current");

    if (window.innerWidth >= 992) {
      container.style.paddingTop = height + 5 + "px";
    } else {
      container.style.paddingTop = 0.5 + "rem";
    }

    const items = container.querySelectorAll(".gallery-item");

    current.innerText = items.length;
    total.innerText = items.length;

    for (let item of items) {
      const btn = document.createElement("button");
      btn.classList.add("item-search");
      btn.innerHTML = `<i class="t-orange fa fa-search" aria-hidden="true"></i>`;

      item.appendChild(btn);
      item.appendChild(filter);
    }
  }
}

gallery();

/* ================= Global function ================= */

//Get computed style
function getStyle(e) {
  return window.getComputedStyle(e);
}

/* ================= Contact form ==================== */
function contactForm() {
  const form = document.getElementById("contact-form");

  if (form) {
    const formInput = document.querySelectorAll(".form-control");

    for (let f of formInput) {
      f.addEventListener("blur", (e) => {
        const label = f.parentElement.querySelector("label");

        e.target.value != "" ? label.classList.add("isFocus") : label.classList.remove("isFocus");
      });
    }
  }
}

contactForm();

/* ============= End Contact form ==================== */
