// Mengambil elemen span berdasarkan ID
const yearElement = document.getElementById('current-year');

// Mendapatkan tahun saat ini secara otomatis
const currentYear = new Date().getFullYear();

// Mengganti teks di HTML dengan tahun terbaru
if (yearElement) {
    yearElement.textContent = currentYear;
}