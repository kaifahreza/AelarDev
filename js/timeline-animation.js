gsap.registerPlugin(ScrollTrigger);

function initTimeline() {
    const items = document.querySelectorAll(".timeline-item");

    items.forEach((item) => {
        const isLeft = item.classList.contains("left");
        const content = item.querySelector(".timeline-content");
        const dot = item.querySelector(".timeline-dot");

        // Animasi Box Konten
        gsap.fromTo(content, 
            { 
                x: isLeft ? -100 : 100, 
                opacity: 0,
                skewX: isLeft ? 5 : -5 
            }, 
            { 
                x: 0, 
                opacity: 1, 
                skewX: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animasi Dot
        gsap.fromTo(dot, 
            { scale: 0 }, 
            { 
                scale: 1, 
                duration: 0.5, 
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            }
        );
    });

    // Animasi Garis Tengah (Tumbuh ke bawah)
    gsap.fromTo(".timeline-line", 
        { scaleY: 0 }, 
        { 
            scaleY: 1, 
            transformOrigin: "top center",
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top 70%",
                end: "bottom 70%",
                scrub: 1
            }
        }
    );
}

document.addEventListener("DOMContentLoaded", initTimeline);