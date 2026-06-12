// article-view.js — loads and renders a single markdown article

function getArticleIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function renderArticle() {
    const articleId = getArticleIdFromURL();
    const articleView = document.getElementById('article-view');

    const article = articlesData.find(a => a.id === articleId);

    if (!article) {
        articleView.innerHTML = `
            <div class="empty-state">
                <h3>Article not found</h3>
                <p>The article you're looking for doesn't exist.</p>
                <p style="margin-top: 24px;"><a class="btn btn-ghost" href="articles.html">Back to articles</a></p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`articles/${article.filename}`);
        if (!response.ok) {
            throw new Error('Article file not found');
        }
        const markdownContent = await response.text();
        const htmlContent = marked.parse(markdownContent);

        document.title = `${article.title} — Faizan Ansari`;
        articleView.innerHTML = `
            <div class="article-header">
                <h1>${article.title}</h1>
                <div class="article-info">
                    <span>${formatDate(article.date)}</span>
                    <span>${article.readTime} min read</span>
                </div>
            </div>
            <div class="article-content">
                ${htmlContent}
            </div>
            <p style="margin-top: 48px;"><a class="btn btn-ghost" href="articles.html">Back to articles</a></p>
        `;
    } catch (error) {
        articleView.innerHTML = `
            <div class="empty-state">
                <h3>Error loading article</h3>
                <p>There was a problem loading this article's content.</p>
                <p style="margin-top: 24px;"><a class="btn btn-ghost" href="articles.html">Back to articles</a></p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', renderArticle);
