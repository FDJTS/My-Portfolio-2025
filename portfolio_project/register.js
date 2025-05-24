document.getElementById('manualRegisterForm').onsubmit = function(e) {
  e.preventDefault();
  fetch('register.php', {
    method: 'POST',
    body: new FormData(this)
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      localStorage.setItem('zyad_user', JSON.stringify({name: data.name, picture: ""}));
      window.location = "index.html";
    } else {
      alert(data.message || "Registration failed!");
    }
  });
};

// Google Sign-Up
document.getElementById('googleSignUpBtn').onclick = function() {
  google.accounts.id.initialize({
    client_id: "436010504275-8ac6ms5120rg25k1v9741ejgib17s61l.apps.googleusercontent.com",
    callback: (response) => {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      localStorage.setItem('zyad_user', JSON.stringify({name: payload.name, picture: payload.picture}));
      window.location = "index.html";
    }
  });
  google.accounts.id.prompt();
};