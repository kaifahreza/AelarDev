document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector('.lanyard-card');
    const container = document.querySelector('.left-side');

    // 1. Tilt Effect 3D (Hanya Gerak saat Mouse di Area Kiri)
    container.addEventListener('mousemove', (e) => {
        // Hitung posisi kursor relatif terhadap area container
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xAxis = (rect.width / 2 - x) / 15; 
        const yAxis = (rect.height / 2 - y) / 15;
        
        gsap.to(card, {
            rotateY: xAxis,
            rotateX: yAxis,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Reset posisi kartu saat kursor keluar
    container.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        });
    });

    // 2. Entrance Animation (Muncul pertama kali)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".lanyard-card", {
        y: 80,
        opacity: 0,
        duration: 1.8
    })
    .from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1.2
    }, "-=1.2")
    .from(".content-block p, .label, .tech-item, .exp-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1
    }, "-=0.8");
});