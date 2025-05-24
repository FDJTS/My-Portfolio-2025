# Zyad Mohamed | Personal Portfolio Website

Welcome to the personal website of Ziad Mohamed!  
This site showcases my profile, projects, public comments, and allows you to contact me directly.

---

## Website Features

- **Home:** Introduction, welcome image, and profile info.
- **Projects:** A page to display my programming projects.
- **Comments:** Any visitor can add a comment that is visible to everyone.
- **Login / Register:**  
  - Register a new account or log in with your credentials.
  - Google Login (OAuth) supported (requires proper setup).
  - After login, your name appears on the site and you receive a welcome email.
- **Contact:** Send a message directly to my personal email.
- **Language Switch:** Supports Arabic and English.
- **Dark Mode:** Toggle between light and dark themes.

---

## Technologies Used

- **Frontend:**  
  - HTML, CSS (modern, responsive design)
  - JavaScript (dynamic interactions)
- **Backend:**  
  - Node.js + Express (API for registration and contact)
  - PHP (optional for contact form)
  - Nodemailer (for sending emails)
  - Google OAuth (for Google login)
  - Users and comments stored in a file or database (as configured)

---

## How to Run Locally

1. **Install requirements:**
   - Node.js
   - Run: `npm install express nodemailer cors body-parser`

2. **Edit settings:**
   - Set your email and app password in `node.js` or `contact.php`.
   - Set your Google Client ID in the login page.

3. **Start the server:**
   ```
   node node.js
   ```
   Or upload files to a hosting that supports PHP and/or Node.js.

4. **Open the website:**
   - Open `index.html` in your browser or via your local server.

---

## Images

- Header image in every page (`images/header.jpg`)
- Welcome image on the home page (`images/welcome.jpg`)
- Profile photo (`profile.jpg`)
- Custom images for each section (you can change as you like)

---

## Notes

- All comments are public and visible to everyone (via database or file).
- You receive an email when you register or send a contact message.
- Google login requires proper OAuth Client ID setup.
- Supports dark mode and language switching.

---

## Contact

For any questions or suggestions:  
[fdjts1@gmail.com](mailto:fdjts1@gmail.com)

---

## Lisence

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

**Developed entirely by Zyad Mohamed.**
