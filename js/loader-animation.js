document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "HELLO",      // Inggris
        "HALO",       // Indonesia
        "你好",        // Cina
        "HOLA",       // Spanyol
        "KONNICHIWA", // Jepang
        "BONJOUR",    // Prancis
    ];

    const loaderText = document.querySelector(".loader-text");
    const loaderWrapper = document.querySelector(".loader-wrapper");
    let currentIndex = 0;

    function updateText() {
        if (currentIndex < words.length) {
            loaderText.textContent = words[currentIndex];
            
            // Animasi teks muncul
            gsap.fromTo(loaderText, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
            );

            currentIndex++;

            // Jika masih ada kata, lanjut ganti
            if (currentIndex < words.length) {
                setTimeout(updateText, 450); // Kecepatan ganti kata
            } else {
                // Jika kata terakhir (ARCSHIN) sudah muncul, tutup loader
                setTimeout(closeLoader, 800); 
            }
        }
    }

    function closeLoader() {
        gsap.to(loaderWrapper, {
            y: "-100%",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
                document.body.classList.remove("is-loading");
            }
        });
    }

    // Mulai animasi
    updateText();
});