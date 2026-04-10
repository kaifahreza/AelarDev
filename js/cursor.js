document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    // Pastikan GSAP sudah ter-load
    if (typeof gsap !== 'undefined') {
        
        // 1. Pergerakan Kursor
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        window.addEventListener("mousemove", e => {
            gsap.to(cursor, { 
                x: e.clientX, 
                y: e.clientY, 
                duration: 0.1 
            });
            gsap.to(follower, { 
                x: e.clientX, 
                y: e.clientY, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        });

        // 2. Efek Hover untuk elemen interaktif
        const interactiveElements = document.querySelectorAll(
            "a, button, .work-item, .floating-menu-toggle, .menu-link, .social-icons span"
        );

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                follower.classList.add("cursor-active");
                gsap.to(cursor, { scale: 0.5, duration: 0.3 });
            });
            el.addEventListener("mouseleave", () => {
                follower.classList.remove("cursor-active");
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });

        // 3. Sembunyikan kursor saat mouse keluar dari window
        document.addEventListener("mouseleave", () => {
            gsap.to([cursor, follower], { opacity: 0 });
        });
        document.addEventListener("mouseenter", () => {
            gsap.to([cursor, follower], { opacity: 1 });
        });
    }
});