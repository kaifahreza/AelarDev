particlesJS("particles-js", {
    "particles": {
        "number": { 
            "value": 80, // Jumlah partikel sedikit ditambah agar tidak sepi
            "density": { "enable": true, "value_area": 800 } 
        },
        "color": { "value": "#1F22DA" }, // Warna Biru Sky menyesuaikan grid
        "shape": { "type": "circle" },
        "opacity": { 
            "value": 0.4,
            "random": true,
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": { 
            "value": 3, 
            "random": true,
            "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false }
        },
        "line_linked": { 
            "enable": true, 
            "distance": 150, 
            "color": "#1F22DA", 
            "opacity": 0.2, // Garis dibuat sangat tipis agar tidak mengganggu grid
            "width": 1 
        },
        "move": { 
            "enable": true, 
            "speed": 1.5, // Sedikit lebih cepat agar dinamis
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "window", // Ubah ke window agar lebih responsif
        "events": {
            "onhover": { 
                "enable": true, 
                "mode": "bubble" // Efek bubble bikin partikel membesar saat didekati kursor
            },
            "onclick": { 
                "enable": true, 
                "mode": "push" // Menambah partikel saat diklik
            }
        },
        "modes": {
            "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8, "speed": 3 },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});