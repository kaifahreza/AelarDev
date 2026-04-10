document.addEventListener("DOMContentLoaded", () => {
    const mainHeader = document.querySelector(".main-header");
    const floatingToggle = document.querySelector(".floating-menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuClose = document.querySelector(".menu-close");

    // 1. Logika Scroll Header
    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            floatingToggle.classList.add("active");
            if(mainHeader) mainHeader.style.opacity = "0";
        } else {
            floatingToggle.classList.remove("active");
            if(mainHeader) mainHeader.style.opacity = "1";
        }
    });

    // 2. Timeline GSAP untuk Overlay
    const tlMenu = gsap.timeline({ 
        paused: true,
        onStart: () => {
            menuOverlay.style.visibility = "visible";
            menuOverlay.style.pointerEvents = "auto";
        },
        onReverseComplete: () => {
            menuOverlay.style.visibility = "hidden";
            menuOverlay.style.pointerEvents = "none";
        }
    });

    // Ganti bagian animasi .from Anda dengan ini:
    tlMenu.to(menuOverlay, {
        duration: 0.8,
        clipPath: "circle(150% at 100% 0%)",
        ease: "power3.inOut"
    })
    .from(".menu-link", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power4.out",
        clearProps: "all" // Penting: Membersihkan gaya setelah animasi
    }, "-=0.3");

    // 3. Event Listeners
    if(floatingToggle) {
        floatingToggle.onclick = () => tlMenu.play();
    }
    
    if(menuClose) {
        menuClose.onclick = () => tlMenu.reverse();
    }

    // Tutup menu jika link diklik
    document.querySelectorAll(".menu-link").forEach(link => {
        link.onclick = () => tlMenu.reverse();
    });
});