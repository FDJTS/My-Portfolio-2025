// Simple public comments using localStorage (for demo, not secure for production)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commentForm');
  const list = document.getElementById('commentList');

  function renderComments() {
    list.innerHTML = '';
    const comments = JSON.parse(localStorage.getItem('zyad_comments') || '[]');
    comments.reverse().forEach(c => {
      const div = document.createElement('div');
      div.className = 'comment-item fade-in';
      div.innerHTML = `
        <span class="comment-author">${c.name}</span>
        <span class="comment-date">${new Date(c.date).toLocaleString()}</span>
        <div class="comment-text">${c.text.replace(/</g, "&lt;")}</div>
      `;
      list.appendChild(div);
    });
  }

  form.onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById('commentName').value.trim() || 'Anonymous';
    const text = document.getElementById('commentText').value.trim();
    if (!text) return;
    const comments = JSON.parse(localStorage.getItem('zyad_comments') || '[]');
    comments.push({ name, text, date: new Date() });
    localStorage.setItem('zyad_comment', JSON.stringify(comments));
    form.reset();
    renderComments();
  };

  renderComments();
});