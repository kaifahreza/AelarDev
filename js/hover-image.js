document.addEventListener("DOMContentLoaded", () => {
    const workItems = document.querySelectorAll(".work-item");
    const imageContainer = document.querySelector(".hover-image-container");
    const hoverImage = document.getElementById("hover-image");

    workItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const imageUrl = item.getAttribute("data-image");
            hoverImage.src = imageUrl;
            imageContainer.style.opacity = "1";
            imageContainer.style.transform = "scale(1)";
        });

        item.addEventListener("mouseleave", () => {
            imageContainer.style.opacity = "0";
            imageContainer.style.transform = "scale(0.8)";
        });

        item.addEventListener("mousemove", (e) => {
            // Posisi gambar mengikuti kursor dengan sedikit offset
            const x = e.clientX + 20;
            const y = e.clientY - (imageContainer.offsetHeight / 2);
            
            gsap.to(imageContainer, {
                x: x,
                y: y,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});