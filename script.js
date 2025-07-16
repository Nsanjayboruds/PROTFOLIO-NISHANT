

function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true, 
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from("#page1", { opacity: 0, duration: 0.2, delay: 0.2 })
      .from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
      })
      .from("nav", { opacity: 0, delay: -0.2 })
      .from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
      });
}

function navAnimation() {
    var nav = document.querySelector("nav");
    nav.addEventListener("mouseenter", () => {
        let tl = gsap.timeline();
        tl.to("#nav-bottom", { height: "21vh", duration: 0.5 })
          .to(".nav-part2 h5", { display: "block", duration: 0.1 })
          .to(".nav-part2 h5 span", { y: 0, stagger: { amount: 0.5 } });
    });
    nav.addEventListener("mouseleave", () => {
        let tl = gsap.timeline();
        tl.to(".nav-part2 h5 span", { y: 25, stagger: { amount: 0.2 } })
          .to(".nav-part2 h5", { display: "none", duration: 0.1 })
          .to("#nav-bottom", { height: 0, duration: 0.2 });
    });
}

function page2Animation() {
    const rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach((elem) => {
        const img = elem.querySelector("img");
        elem.addEventListener("mouseenter", () => {
            gsap.to(img, { opacity: 1, scale: 1 });
        });
        elem.addEventListener("mouseleave", () => {
            gsap.to(img, { opacity: 0, scale: 0 });
        });
        elem.addEventListener("mousemove", (dets) => {
            gsap.to(img, {
                x: dets.offsetX - 90,
                y: dets.offsetY - 90
            });
        });
    });
}

function page3VideoAnimation() {
    const page3Center = document.querySelector(".page3-center");
    const video = document.querySelector("#page3 video");

    page3Center.addEventListener("click", () => {
        video.play();
        gsap.to(video, {
            scaleX: 1, scaleY: 1, opacity: 1, borderRadius: 0
        });
    });

    video.addEventListener("click", () => {
        video.pause();
        gsap.to(video, {
            scaleX: 0.7, scaleY: 0, opacity: 0, borderRadius: "30px"
        });
    });
}

function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    });
}


locomotiveAnimation();
navAnimation();
page2Animation();
page3VideoAnimation();
page6Animations();
loadingAnimation();
const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(animate);
}

animate();

