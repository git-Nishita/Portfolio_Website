# Nishita G — Personal Developer Portfolio

> A modern, minimal, Apple-inspired personal developer portfolio website designed for **Nishita G**, Information Science & Engineering student at **Bangalore Institute of Technology**, Bengaluru (Class of 2030).

---

## 🌟 Highlights & Interactive Features

- **Design Philosophy**: Minimal, Apple-inspired aesthetics with refined typography, glassmorphism, and subtle ambient glows.
- **Dual Display Modes (Dark & White / Light Mode)**:
  - **Light (White) Theme**: Crisp Apple-inspired bright UI featuring soft white surfaces (`#F8FAFC` & `#FFFFFF`), deep slate typography (`#0F172A`), elegant card shadows, and high-contrast violet/blue accents.
  - **Dark Theme**: Deep black (`#0B0B0F`) and dark charcoal (`#15151D`) with subtle neon glow.
  - *Click the Sun ☀️ / Moon 🌙 button in the top navigation bar (or mobile menu) to toggle between Light and Dark mode instantly!*
- **Color Palette & Live Customizer**:
  - **Electric Violet** (Default): `#A78BFA` & `#60A5FA`
  - **Cyber Emerald**: `#34D399` & `#38BDF8`
  - **Neon Rose**: `#F472B6` & `#C084FC`
  - **Sunset Amber**: `#F59E0B` & `#FB923C`
  - *Click the "Theme" button to live-switch the accent palette in both Dark and Light modes!*
- **Interactive Highlights**:
  - **Hero Landing Screen**:
    - **Dynamic Typewriter**: Continuously cycles through roles with a blinking cursor: *"Aspiring Developer"*, *"ISE Engineering Student @ BIT"*, *"Problem Solver & Tech Explorer"*, *"Passionate about C & Python"*.
    - **Interactive Constellation Canvas**: Glowing connection lines from particles directly to the mouse cursor, with expanding click shockwaves.
  - **About Me Section**:
    - **Dual-Mode Interactive Terminal**: Switch between `profile.json` (code view) and `terminal.sh` (a real interactive terminal emulator!). Type commands like `help`, `about`, `skills`, `projects`, `bit`, `date`, `confetti`, or click the quick command chips!
  - **Skills Section ("My Technical Toolkit")**:
    - **Interactive Category Filters**: Toggle between *All*, *Languages*, *Web Tech*, *Database*, and *Productivity*.
    - **Code Inspection Modals**: Click on any skill card (C, Python, HTML, CSS, SQL, Excel) to open an educational code snippet modal with a **"Copy Snippet"** button.
  - **3D Card Perspective & Spotlight**:
    - Moving your mouse over cards creates a subtle 3D tilt with a realistic radial flashlight reflection that follows your cursor.
  - **Featured Projects**:
    - **Python Calculator**: Live playable browser calculator simulation + source code viewer with one-click copy.
    - **Random Number Guessing Game**: Live playable number guessing game with attempts counter, hot/cold hints, and victory celebration + source code viewer.
    - **Upcoming Project**: Full-Stack Student Portal card.
  - **Celebration Confetti**:
    - Particle confetti burst triggers upon winning the guessing game, submitting the contact form, or typing `confetti` in the terminal!
  - **Contact Form**:
    - Real-time character counter (`0 / 500 characters`), client-side validation, and instant toast confirmations.

---

## 📁 Project Structure

```
d:\Hands-on\
├── index.html            # Main semantic HTML5 single-page application
├── css/
│   ├── style.css         # Theme variables, layouts, glassmorphism, responsive breakpoints
│   └── animations.css    # Keyframe animations, pulse effects, and scroll-reveal transitions
├── js/
│   ├── main.js           # ScrollSpy, navbar blur, mobile drawer, form validation, toast notifications
│   ├── background.js     # Responsive interactive particle canvas constellation with mouse links
│   ├── project-demos.js  # Live playable interactive modals for Python projects
│   └── interactive.js    # Live terminal emulator, theme switcher, 3D tilt, filters, confetti
├── assets/
│   └── favicon.svg       # Custom geometric NG monogram vector icon
└── README.md             # Project documentation and guide
```

---

## 🚀 Running the Website Locally

You can run this website on your local machine using any of the following methods:

### Option 1: Using Python (Recommended)
Open PowerShell in `d:\Hands-on` and run:
```powershell
& "C:\Users\Nishita\AppData\Local\Python\pythoncore-3.14-64\python.exe" -m http.server 3000
```
Then open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Using VS Code "Live Server" Extension
1. Install the **Live Server** extension by *Ritwick Dey* in VS Code.
2. Right-click `index.html` in the file explorer.
3. Click **"Open with Live Server"**.

### Option 3: Direct File Opening
You can simply double-click `index.html` in your Windows File Explorer to open it directly in Chrome, Edge, Firefox, or Safari.

---

## 🛠️ How to Customize & Personalize

### 1. Update Social & Profile Links
In `index.html`, search for `your-username` and replace it with your actual profile links:
- GitHub: `https://github.com/<your-github-username>`
- LinkedIn: `https://linkedin.com/in/<your-linkedin-username>`
- Email: Replace `nishita.g.dev@example.com` with your actual email address.

### 2. Connect the Contact Form to Receive Emails
To receive real emails when someone submits the contact form, you can use **Formspree** (free):
1. Register at [formspree.io](https://formspree.io).
2. Create a new form and copy your unique form endpoint URL (e.g., `https://formspree.io/f/xyz...`).
3. In `index.html`, update `<form id="contact-form">` to:
   ```html
   <form id="contact-form" action="https://formspree.io/f/your_form_id" method="POST">
   ```

---

## 🌐 Deploying to the Web for Free

### Option A: GitHub Pages
1. Create a repository on GitHub (e.g., `portfolio`).
2. Push this folder's code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings** > **Pages**.
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Your website will be live at: `https://<your-username>.github.io/portfolio/`!

### Option B: Vercel or Netlify
- Drag and drop your project folder onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub via [Vercel](https://vercel.com) for instant deployment with free SSL.

---

## 📄 License & Credits
Designed and built for **Nishita G** | Information Science & Engineering, Bangalore Institute of Technology.
