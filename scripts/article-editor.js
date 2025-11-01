// Article editor script

// Get articles from localStorage
function getArticles() {
    const articles = localStorage.getItem('articles');
    return articles ? JSON.parse(articles) : [];
}

// Save articles to localStorage
function saveArticles(articles) {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Calculate read time
function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Update preview
function updatePreview() {
    const content = document.getElementById('content').value;
    const preview = document.getElementById('preview');

    if (content.trim() === '') {
        preview.innerHTML = '<p style="color: #6b7280; text-align: center;">Start typing to see preview...</p>';
        return;
    }

    const htmlContent = marked.parse(content);
    preview.innerHTML = htmlContent;
}

// Save draft
function saveDraft() {
    const title = document.getElementById('title').value.trim();
    const excerpt = document.getElementById('excerpt').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !excerpt || !content) {
        alert('Please fill in all fields before saving.');
        return;
    }

    // Save to localStorage as draft
    localStorage.setItem('articleDraft', JSON.stringify({
        title,
        excerpt,
        content
    }));

    alert('Draft saved successfully!');
}

// Publish article
function publishArticle() {
    const title = document.getElementById('title').value.trim();
    const excerpt = document.getElementById('excerpt').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !excerpt || !content) {
        alert('Please fill in all fields before publishing.');
        return;
    }

    const articles = getArticles();
    const newArticle = {
        id: generateId(),
        title,
        excerpt,
        content,
        date: new Date().toISOString(),
        readTime: calculateReadTime(content)
    };

    articles.push(newArticle);
    saveArticles(articles);

    // Clear draft
    localStorage.removeItem('articleDraft');

    alert('Article published successfully!');
    window.location.href = 'articles.html';
}

// Load draft if exists
function loadDraft() {
    const draft = localStorage.getItem('articleDraft');
    if (draft) {
        const { title, excerpt, content } = JSON.parse(draft);
        document.getElementById('title').value = title;
        document.getElementById('excerpt').value = excerpt;
        document.getElementById('content').value = content;
        updatePreview();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDraft();

    // Add event listener for content changes
    const contentTextarea = document.getElementById('content');
    contentTextarea.addEventListener('input', updatePreview);

    // Initial preview update
    updatePreview();
});
