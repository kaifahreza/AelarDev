// File: js/scroll-animation.js
gsap.registerPlugin(ScrollTrigger);

function initMarquee() {
    const row1 = document.querySelector(".row-1 .scroll-content");
    const row2 = document.querySelector(".row-2 .scroll-content");

    if (!row1 || !row2) return;

    // Setup Animasi Looping Dasar
    const loop1 = gsap.to(row1, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
    });

    const loop2 = gsap.to(row2, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
    }).reverse();

    // Kontrol ScrollTrigger untuk Velocity & Direction
    ScrollTrigger.create({
        onUpdate: (self) => {
            let vel = self.getVelocity() / 600; 
            
            gsap.to([row1, row2], {
                skewX: vel, 
                duration: 0.5, 
                ease: "power3.out"
            });

            if (self.direction === 1) { // Scroll Down
                gsap.to(loop1, {timeScale: 1, duration: 0.8});
                gsap.to(loop2, {timeScale: -1, duration: 0.8});
            } else if (self.direction === -1) { // Scroll Up
                gsap.to(loop1, {timeScale: -1, duration: 0.8});
                gsap.to(loop2, {timeScale: 1, duration: 0.8});
            }
        }
    });

    window.addEventListener("scroll", () => {
        gsap.to([row1, row2], {skewX: 0, duration: 0.6, delay: 0.1});
    });
}

function initFooter() {
    gsap.from(".footer-heading", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".footer-section",
            start: "top 80%",
        }
    });
}

// Inisialisasi semua fungsi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
    initMarquee();
    initFooter();
});