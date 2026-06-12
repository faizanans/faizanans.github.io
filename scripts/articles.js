// articles.js — renders the article list from articles-data.js

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');

    const sortedArticles = [...articlesData].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sortedArticles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="empty-state">
                <h3>Nothing published yet</h3>
                <p>Writing is in progress — check back soon.</p>
            </div>
        `;
        return;
    }

    articlesGrid.innerHTML = sortedArticles.map(article => `
        <div class="article-card" onclick="viewArticle('${article.id}')">
            <div class="article-meta">
                <span>${formatDate(article.date)}</span>
                <span>${article.readTime} min read</span>
            </div>
            <h2 class="article-title">${article.title}</h2>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
    `).join('');
}

function viewArticle(id) {
    window.location.href = `article-view.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', renderArticles);
