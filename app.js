let controller;
let slideScene;
let pageScene;

function animateSlides() {
  controller = new ScrollMagic.Controller();
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  sliders.forEach((slide, index, slides) => {
    const img = slide.querySelector("img");
    const revealImg = slide.querySelector(".reveal-img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    tl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    tl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    tl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.5");
    tl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(tl)
      .addTo(controller);
    //New animation
    const pageTl = gsap.timeline();

    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setTween(pageTl)
      .addTo(controller);
  });
}

function cursor(e) {
  let mouse = document.querySelector(".cursor");
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "405", y: 5 });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5 });
    gsap.to(".nav", 1, { clipPath: "circle(3500px at 100% -10%" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: -0 });
    gsap.to(".nav", 1, { clipPath: "circle(0px at 100% -10%" });
    document.body.classList.remove("hide");
  }
}

const burger = document.querySelector(".burger");

window.addEventListener("mousemove", cursor);
burger.addEventListener("click", navToggle);

const links = document.querySelectorAll(".link");
links.forEach((link) =>
  link.addEventListener("click", function (e) {
    burger.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: -0 });
    gsap.to(".nav", 1, { clipPath: "circle(0px at 100% -10%" });
    document.body.classList.remove("hide");
  })
);

// mobile

//Barba Page transitions

const logo = document.querySelector("#logo");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
    {
      namespace: "dunks",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
    {
      namespace: "airmax",
      beforeEnter() {
        logo.href = "../index.html";
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //scrollUp
        window.scrollTo(0, 0);
        //animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        window.scrollTo(0, 0);
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        tl.fromTo(
          ".swipe",
          0.75,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});
