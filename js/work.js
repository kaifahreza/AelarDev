window.onload = () => {
    const overlay = document.querySelector(".page-transition-overlay");
    const cards = document.querySelectorAll(".project-card");
    const modal = document.querySelector(".project-modal");
    const modalContent = document.querySelector(".modal-content");
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    // --- 1. CURSOR LOGIC ---
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", e => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4 });
    });

    const addHoverEffect = (els) => {
        els.forEach(el => {
            el.addEventListener("mouseenter", () => follower.classList.add("cursor-active"));
            el.addEventListener("mouseleave", () => follower.classList.remove("cursor-active"));
        });
    };
    addHoverEffect(document.querySelectorAll("a, button, .project-card, .thumb-item, input, textarea"));

    // --- 2. ENTRY ANIMATIONS ---
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(overlay, { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
      .to(".page-title", { opacity: 1, y: 0, duration: 1 }, "-=0.4")
      .to(".subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
      .to(".tech-stack-section", { opacity: 1, duration: 0.8 }, "-=0.6")
      .to(".bar-fill", { width: (i, el) => el.getAttribute('data-percent'), duration: 1.5, stagger: 0.1 }, "-=0.8")
      .to(".filter-nav", { opacity: 1, duration: 0.5 }, "-=1")
      .to(cards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 }, "-=0.8");

    // --- 3. FILTER LOGIC ---
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.dataset.category;
            gsap.to(cards, {
                opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                    cards.forEach(card => {
                        const isMatch = category === 'all' || card.dataset.category === category;
                        card.style.display = isMatch ? "block" : "none";
                    });
                    gsap.to(".project-card[style*='display: block']", { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 });
                }
            });
        };
    });

    // --- 4. COMMENT SYSTEM (Direct Integration) ---
    const renderModalComments = (projectTitle) => {
        const container = document.getElementById('projectCommentList');
        if (!container) return;
        container.innerHTML = '';

        const allComments = JSON.parse(localStorage.getItem('aelar_comments') || '[]');
        const filtered = allComments.filter(c => c.project === projectTitle).reverse();

        if (filtered.length === 0) {
            container.innerHTML = '<p style="color: rgba(255,255,255,0.2); font-size: 0.8rem; text-align: center; padding: 20px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px;">BELUM ADA DISKUSI.</p>';
            return;
        }

        filtered.forEach(data => {
            const div = document.createElement('div');
            div.style.cssText = "background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s;";
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #fff; font-weight: 600; font-size: 0.85rem; text-transform: uppercase;">${data.name}</span>
                    <span style="color: rgba(255,255,255,0.2); font-size: 0.7rem;">${data.date}</span>
                </div>
                <div class="tech-bar" style="margin: 5px 0 10px; opacity: 0.2;"><div class="bar-fill" style="width: 30px; height: 1px; background: #1F22DA;"></div></div>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.8rem; line-height: 1.5;">${data.text}</p>
            `;
            div.onmouseenter = () => div.style.borderColor = "#1F22DA";
            div.onmouseleave = () => div.style.borderColor = "rgba(255,255,255,0.05)";
            container.appendChild(div);
        });
    };

    // --- 5. MODAL & TYPING ---
    function typeWriter(element, text) {
        element.innerHTML = "";
        let i = 0;
        clearInterval(element.typingInterval);
        element.typingInterval = setInterval(() => {
            if (i < text.length) { element.innerHTML += text.charAt(i); i++; }
            else { clearInterval(element.typingInterval); }
        }, 20);
    }

    cards.forEach(card => {
        card.onclick = () => {
            const title = card.querySelector("h3").innerText;
            const desc = card.querySelector("p").innerText;
            const images = card.dataset.screenshots.split(",");
            const modalImg = document.getElementById("modal-img-main");
            const thumbContainer = document.getElementById("modal-thumbnails");

            document.getElementById("modal-title").innerText = title;
            modalImg.src = images[0];
            thumbContainer.innerHTML = "";

            images.forEach((src, idx) => {
                const img = document.createElement("img");
                img.src = src;
                img.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
                img.onclick = (e) => {
                    e.stopPropagation();
                    modalImg.src = src;
                    document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
                    img.classList.add("active");
                };
                thumbContainer.appendChild(img);
            });

            addHoverEffect(document.querySelectorAll(".thumb-item, .close-modal"));
            modal.style.display = "flex";
            gsap.fromTo(modalContent, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" });
            typeWriter(document.getElementById("modal-desc"), desc);
            
            // Render komentar khusus proyek ini saat modal dibuka
            renderModalComments(title);
        };
    });

    // Handle pengiriman form komentar di modal
    const modalForm = document.getElementById('modalCommentForm');
    if (modalForm) {
        modalForm.onsubmit = (e) => {
            e.preventDefault();
            const projectTitle = document.getElementById('modal-title').innerText;
            const name = document.getElementById('modalUserName').value;
            const text = document.getElementById('modalCommentText').value;
            const date = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

            const newComment = { project: projectTitle, name, text, date };
            const comments = JSON.parse(localStorage.getItem('aelar_comments') || '[]');
            comments.push(newComment);
            localStorage.setItem('aelar_comments', JSON.stringify(comments));

            modalForm.reset();
            renderModalComments(projectTitle);
        };
    }

    const closeAll = () => {
        gsap.to(modalContent, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => { modal.style.display = "none"; } });
    };
    document.querySelector(".close-modal").onclick = closeAll;
    document.querySelector(".modal-backdrop").onclick = closeAll;
};