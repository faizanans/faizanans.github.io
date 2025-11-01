// Article view script

// Get article ID from URL
function getArticleIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fetch and render article
async function renderArticle() {
    const articleId = getArticleIdFromURL();
    const articleView = document.getElementById('article-view');

    // Find article metadata
    const article = articlesData.find(a => a.id === articleId);

    if (!article) {
        articleView.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <i class="fa-solid fa-exclamation-triangle" style="font-size: 4rem; color: #a78bfa; margin-bottom: 1rem;"></i>
                <h2 style="color: #2d2d2d; margin-bottom: 1rem;">Article not found</h2>
                <p style="color: #6b7280; margin-bottom: 2rem;">The article you're looking for doesn't exist.</p>
                <a href="articles.html" class="read-more-btn">
                    <i class="fa-solid fa-arrow-left"></i> Back to Articles
                </a>
            </div>
        `;
        return;
    }

    try {
        // Fetch markdown file
        const response = await fetch(`articles/${article.filename}`);
        if (!response.ok) {
            throw new Error('Article file not found');
        }
        const markdownContent = await response.text();

        // Parse markdown to HTML
        const htmlContent = marked.parse(markdownContent);

        articleView.innerHTML = `
            <div class="article-header">
                <h1>${article.title}</h1>
                <div class="article-info">
                    <span><i class="fa-regular fa-calendar"></i> ${formatDate(article.date)}</span>
                    <span><i class="fa-regular fa-clock"></i> ${article.readTime} min read</span>
                </div>
            </div>
            <div class="article-content">
                ${htmlContent}
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                <a href="articles.html" class="read-more-btn">
                    <i class="fa-solid fa-arrow-left"></i> Back to Articles
                </a>
            </div>
        `;
    } catch (error) {
        articleView.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem;">
                <i class="fa-solid fa-exclamation-triangle" style="font-size: 4rem; color: #a78bfa; margin-bottom: 1rem;"></i>
                <h2 style="color: #2d2d2d; margin-bottom: 1rem;">Error loading article</h2>
                <p style="color: #6b7280; margin-bottom: 2rem;">There was an error loading the article content.</p>
                <a href="articles.html" class="read-more-btn">
                    <i class="fa-solid fa-arrow-left"></i> Back to Articles
                </a>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderArticle();
});
