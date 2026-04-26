// CONFIGURATION
const GITHUB_USERNAME = 'sairootsmusic';
const REPO_NAME = 'sairootsmusic.com';

document.addEventListener('DOMContentLoaded', () => {
    loadLatestPosts();
    initSearch();
});

// 1. FUNGSI LOAD POSTINGAN TERBARU (OTOMATIS)
async function loadLatestPosts() {
    const feedContainer = document.getElementById('index-feed');
    if (!feedContainer) return;

    try {
        // Mengambil daftar file dari folder /article di GitHub
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/article`);
        const files = await response.json();

        // Ambil 5 file terbaru (berdasarkan urutan alfabet/tanggal di nama file)
        const latestFiles = files.reverse().slice(0, 5);

        feedContainer.innerHTML = ''; // Hapus pesan 'Memuat konten...'

        latestFiles.forEach(file => {
            if (file.name.endsWith('.html')) {
                const title = file.name.replace(/-/g, ' ').replace('.html', '');
                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <div style="background: var(--card-bg); padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 2px solid var(--primary-color);">
                        <h3 style="text-transform: capitalize; margin-bottom: 5px;">${title}</h3>
                        <a href="/article/${file.name.replace('.html', '')}" style="color: var(--primary-color); text-decoration: none; font-size: 0.9rem;">Baca Selengkapnya →</a>
                    </div>
                `;
                feedContainer.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Gagal memuat konten:', error);
        feedContainer.innerHTML = '<p style="color: var(--text-gray);">Belum ada postingan terbaru.</p>';
    }
}

// 2. SISTEM PENCARIAN PINTAR
function initSearch() {
    const searchInput = document.getElementById('siteSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase();
            // Redirect ke halaman pencarian atau filter konten (Simple version)
            alert('Mencari: ' + query + '... (Fitur ini akan aktif setelah folder /lyric dan /article terisi)');
        }
    });
}

// 3. CLEAN URL LOGIC (Helper)
// Jika user akses /about, GitHub Pages akan cari folder /about/index.html
// Pastikan link di HTML tidak menggunakan .html
