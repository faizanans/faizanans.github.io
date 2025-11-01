// Articles management script

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Render articles
function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');

    // Sort articles by date (newest first)
    const sortedArticles = [...articlesData].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedArticles.length === 0) {
        articlesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem;">
                <i class="fa-solid fa-file-pen" style="font-size: 4rem; color: #a78bfa; margin-bottom: 1rem;"></i>
                <h3 style="color: #2d2d2d; margin-bottom: 1rem;">No articles yet</h3>
                <p style="color: #6b7280;">Check back soon for new content!</p>
            </div>
        `;
        return;
    }

    articlesGrid.innerHTML = sortedArticles.map(article => `
        <div class="article-card" onclick="viewArticle('${article.id}')">
            <div class="article-meta">
                <span><i class="fa-regular fa-calendar"></i> ${formatDate(article.date)}</span>
                <span class="read-time"><i class="fa-regular fa-clock"></i> ${article.readTime} min read</span>
            </div>
            <h2 class="article-title">${article.title}</h2>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
    `).join('');
}

// View article
function viewArticle(id) {
    window.location.href = `article-view.html?id=${id}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
});
