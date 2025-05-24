const zyadUser = JSON.parse(localStorage.getItem('zyad_user') || 'null');
if(zyadUser && zyadUser.name) {
  document.getElementById('commentName').value = zyadUser.name;
  document.getElementById('commentName').readOnly = true;
}

document.getElementById('googleSignInBtn').onclick = function() {
  google.accounts.id.initialize({
    client_id: "436010504275-8ac6ms5120rg25k1v9741ejgib17s61l.apps.googleusercontent.com",
    callback: (response) => {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      localStorage.setItem('zyad_user', JSON.stringify({name: payload.name, picture: payload.picture}));
      document.getElementById('commentName').value = payload.name;
      document.getElementById('commentName').readOnly = true;
    }
  });
  google.accounts.id.prompt();
};

function renderComments() {
  fetch('comments.php')
    .then(res => res.json())
    .then(comments => {
      const list = document.getElementById('commentsList');
      list.innerHTML = '';
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
    });
}

document.getElementById('commentForm').onsubmit = e => {
  e.preventDefault();
  fetch('comments.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: document.getElementById('commentName').value,
      text: document.getElementById('commentText').value
    })
  }).then(() => {
    document.getElementById('commentForm').reset();
    if(zyadUser && zyadUser.name) {
      document.getElementById('commentName').value = zyadUser.name;
    }
    renderComments();
  });
};

renderComments();