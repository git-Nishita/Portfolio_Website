/**
 * INTERACTIVE.JS - Advanced Interactive Features for Nishita G's Portfolio
 * 1. Live Terminal Emulator in About Section
 * 2. Dynamic Typewriter Headline in Hero
 * 3. 3D Card Tilt & Mouse Spotlight Reflection
 * 4. Theme Accent Palette Customizer (Violet, Emerald, Rose, Amber)
 * 5. Skill Category Filter Tabs & Interactive Code Peek Modals
 * 6. Canvas Confetti Celebration Engine
 * 7. Live Character Counter for Contact Form
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DYNAMIC TYPEWRITER IN HERO
  // =========================================================================
  const typewriterElement = document.getElementById('hero-typewriter');
  if (typewriterElement) {
    const roles = [
      'Aspiring Developer',
      'ISE Engineering Student @ BIT',
      'Problem Solver & Tech Explorer',
      'Passionate about C & Python',
      'Turning Ideas into Solutions'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeStep() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
        typingSpeed = 45;
      } else {
        charIndex++;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        // Switch to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeStep, typingSpeed);
    }

    setTimeout(typeStep, 600);
  }

  // =========================================================================
  // 2. THEME ACCENT PALETTE CUSTOMIZER
  // =========================================================================
  const themePickerBtn = document.getElementById('theme-picker-btn');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptBtns = document.querySelectorAll('.theme-opt-btn');
  const activeThemeDot = document.getElementById('theme-active-dot');

  const themeColors = {
    default: '#A78BFA',
    emerald: '#34D399',
    rose: '#F472B6',
    amber: '#F59E0B'
  };

  function applyTheme(themeKey, notify = false) {
    if (themeKey === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeKey);
    }

    localStorage.setItem('nishita_portfolio_theme', themeKey);

    if (activeThemeDot && themeColors[themeKey]) {
      activeThemeDot.style.background = themeColors[themeKey];
      activeThemeDot.style.boxShadow = `0 0 8px ${themeColors[themeKey]}`;
    }

    // Notify particle background if it supports dynamic color update
    if (window.updateCanvasThemeColors) {
      window.updateCanvasThemeColors(themeKey);
    }

    if (notify && window.showToast) {
      const names = {
        default: 'Electric Violet',
        emerald: 'Cyber Emerald',
        rose: 'Neon Rose',
        amber: 'Sunset Amber'
      };
      window.showToast(`Theme changed to ${names[themeKey]}!`);
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('nishita_portfolio_theme') || 'default';
  applyTheme(savedTheme, false);

  if (themePickerBtn && themeDropdown) {
    themePickerBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function () {
      themeDropdown.classList.remove('open');
    });

    themeOptBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const selectedTheme = this.getAttribute('data-theme-choice');
        applyTheme(selectedTheme, true);
        themeDropdown.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 2B. LIGHT / DARK MODE TOGGLE (WHITE THEME SUPPORT)
  // =========================================================================
  const modeToggleBtns = document.querySelectorAll('.mode-toggle-btn');
  const sunIcons = document.querySelectorAll('.mode-icon-sun');
  const moonIcons = document.querySelectorAll('.mode-icon-moon');
  const modeLabels = document.querySelectorAll('.mode-label');

  function applyColorMode(mode, notify = false) {
    if (mode === 'light') {
      document.documentElement.setAttribute('data-mode', 'light');
      sunIcons.forEach(icon => icon.style.display = 'none');
      moonIcons.forEach(icon => icon.style.display = 'inline-block');
      modeLabels.forEach(label => label.textContent = 'Dark');
    } else {
      document.documentElement.removeAttribute('data-mode');
      sunIcons.forEach(icon => icon.style.display = 'inline-block');
      moonIcons.forEach(icon => icon.style.display = 'none');
      modeLabels.forEach(label => label.textContent = 'Light');
    }

    localStorage.setItem('nishita_portfolio_mode', mode);

    if (window.updateCanvasColorMode) {
      window.updateCanvasColorMode(mode);
    }

    if (notify && window.showToast) {
      window.showToast(mode === 'light' ? 'Switched to Light (White) Theme!' : 'Switched to Dark Theme!');
    }
  }

  // Initialize saved mode (default to dark if not set, or light if user requested)
  const savedMode = localStorage.getItem('nishita_portfolio_mode') || 'dark';
  applyColorMode(savedMode, false);

  window.toggleColorMode = function () {
    const isLight = document.documentElement.getAttribute('data-mode') === 'light';
    applyColorMode(isLight ? 'dark' : 'light', true);
  };

  modeToggleBtns.forEach(function (btn) {
    btn.addEventListener('click', window.toggleColorMode);
  });

  // =========================================================================
  // 3. INTERACTIVE LIVE TERMINAL EMULATOR
  // =========================================================================
  const tabCodeBtn = document.getElementById('tab-code-btn');
  const tabCliBtn = document.getElementById('tab-cli-btn');
  const termViewCode = document.getElementById('term-view-code');
  const termViewCli = document.getElementById('term-view-cli');
  const cliInput = document.getElementById('terminal-cli-input');
  const termOutput = document.getElementById('terminal-output');
  const termChips = document.querySelectorAll('.term-chip-btn');

  window.switchTerminalTab = function (tab) {
    if (tab === 'cli') {
      if (tabCodeBtn) tabCodeBtn.classList.remove('active');
      if (tabCliBtn) tabCliBtn.classList.add('active');
      if (termViewCode) termViewCode.style.display = 'none';
      if (termViewCli) {
        termViewCli.classList.add('active');
        if (cliInput) setTimeout(() => cliInput.focus(), 80);
      }
    } else {
      if (tabCliBtn) tabCliBtn.classList.remove('active');
      if (tabCodeBtn) tabCodeBtn.classList.add('active');
      if (termViewCli) termViewCli.classList.remove('active');
      if (termViewCode) termViewCode.style.display = 'block';
    }
  };

  const commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: `Available Commands:
  • about      - Introduction, BIT college & ISE degree
  • skills     - View technical toolkit summary
  • projects   - List featured starter projects
  • bit        - Information about Bangalore Institute of Technology
  • contact    - Contact info & links
  • date       - Show current system date & time
  • confetti   - Trigger a celebration confetti explosion
  • clear      - Clear terminal screen`,

    about: `Nishita G | Engineering Student (Class of 2030)
Department: Information Science and Engineering (ISE)
College:    Bangalore Institute of Technology (BIT), Bengaluru
Focus:      Programming fundamentals (C, Python), Problem-Solving & Web UI
Philosophy: Clean code, solid logic foundations, continuous curiosity.`,

    skills: `Technical Toolkit Breakdown:
┌─────────────────────────┬────────────────────────────┐
│ Category                │ Technologies               │
├─────────────────────────┼────────────────────────────┤
│ Programming Languages   │ C Programming, Python      │
│ Web Technologies        │ HTML5, CSS3, DOM JS        │
│ Database Management     │ SQL (Relational Queries)   │
│ Productivity & Workflow │ Microsoft Excel, Git, VSCode│
└─────────────────────────┴────────────────────────────┘`,

    projects: `Starter Projects:
1. [Python Calculator]          - Console application with modular arithmetic & division-by-zero protection.
2. [Random Number Guessing Game]- Interactive CLI game with random hints & attempt tracking.
3. [Student Portal (Upcoming)]  - Full-stack web application with SQL backend (In Development).
Tip: Scroll down to #projects or click 'Live Demo' on any card!`,

    bit: `Bangalore Institute of Technology (BIT):
Location:    K.R. Road, V.V. Puram, Bengaluru, Karnataka
Affiliation: Visvesvaraya Technological University (VTU)
Department:  Information Science and Engineering (ISE)
Graduation:  2030
Hub:         Located in the heart of Bengaluru, India's Silicon Valley.`,

    contact: `Connect with Nishita G:
• Email:    nishita.g.dev@example.com (Placeholder)
• GitHub:   https://github.com/git-Nishita
• LinkedIn: https://linkedin.com/in/your-username
• Location: Bengaluru, Karnataka, India`,

    date: function () {
      return new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },

    confetti: function () {
      if (window.triggerConfetti) window.triggerConfetti();
      return '🎉 Boom! Confetti particles deployed!';
    }
  };

  function executeTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    // Append to command history
    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;

    // Print user command
    const userLine = document.createElement('div');
    userLine.className = 'term-line-user';
    userLine.innerHTML = `<span class="term-prompt-txt">nishita@bit:~$</span> <span>${escapeHtml(cmdRaw)}</span>`;
    termOutput.appendChild(userLine);

    // Process output
    if (cmd === 'clear') {
      termOutput.innerHTML = '';
      if (cliInput) cliInput.value = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'term-line-output';

    if (terminalCommands[cmd]) {
      const res = typeof terminalCommands[cmd] === 'function' ? terminalCommands[cmd]() : terminalCommands[cmd];
      outputLine.textContent = res;
    } else {
      outputLine.innerHTML = `<span style="color: #EF4444;">Command not found: '${escapeHtml(cmd)}'. Type <strong style="color: var(--accent-purple-light);">'help'</strong> to see available commands.</span>`;
    }

    termOutput.appendChild(outputLine);

    // Scroll to bottom
    const historyContainer = document.getElementById('term-history-log');
    if (historyContainer) {
      historyContainer.scrollTop = historyContainer.scrollHeight;
    }

    if (cliInput) {
      cliInput.value = '';
    }
  }

  if (cliInput) {
    cliInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        executeTerminalCommand(cliInput.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          cliInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          cliInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          cliInput.value = '';
        }
      }
    });
  }

  // Clickable command chips
  termChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const cmd = this.getAttribute('data-cmd');
      if (cmd) {
        if (!termViewCli.classList.contains('active')) {
          switchTerminalTab('cli');
        }
        executeTerminalCommand(cmd);
      }
    });
  });

  // =========================================================================
  // 4. 3D CARD TILT & MOUSE SPOTLIGHT PARALLAX
  // =========================================================================
  function init3DCardTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute 3D tilt angles (max +/- 7 degrees for tasteful subtle effect)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  init3DCardTilt();

  // =========================================================================
  // 5. SKILL CATEGORY FILTER & INTERACTIVE CODE PEEK
  // =========================================================================
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCategoryGroups = document.querySelectorAll('.skills-category-group');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      skillCategoryGroups.forEach(function (group) {
        const groupCategory = group.getAttribute('data-category');
        if (filter === 'all' || filter === groupCategory) {
          group.style.display = 'block';
          group.style.animation = 'fadeInUp 0.35s ease-out';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // Interactive Code Peek on Skill Cards
  const skillSnippets = {
    c: {
      title: 'C Programming • Pointer & Memory Logic',
      code: `// C Programming: Pointer manipulation & struct fundamentals
// Written by Nishita G | BIT ISE '30

#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[32];
    int rollNo;
    float gpa;
} Student;

// Swapping values using pointers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 25;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x=%d, y=%d\\n", x, y);

    // Dynamic memory allocation
    Student *s1 = (Student *)malloc(sizeof(Student));
    if (s1 != NULL) {
        snprintf(s1->name, sizeof(s1->name), "Nishita G");
        s1->rollNo = 101;
        s1->gpa = 9.4;
        printf("Student: %s (Roll: %d)\\n", s1->name, s1->rollNo);
        free(s1); // Always free dynamically allocated memory
    }
    return 0;
}`
    },
    python: {
      title: 'Python • Logic & Data Structures',
      code: `# Python: Clean data processing & comprehension
# Written by Nishita G | BIT ISE '30

def process_engineering_scores(scores):
    """Filter and calculate statistics for student scores."""
    # List comprehension with condition
    passing = [s for s in scores if s >= 40]
    
    # Dictionary aggregation
    stats = {
        "total_students": len(scores),
        "passed": len(passing),
        "pass_rate": f"{(len(passing) / len(scores)) * 100:.1f}%",
        "highest": max(scores),
        "average": round(sum(scores) / len(scores), 2)
    }
    return stats

data = [88, 92, 79, 45, 95, 34, 67, 85]
report = process_engineering_scores(data)

for key, value in report.items():
    print(f"{key.replace('_', ' ').title()}: {value}")`
    },
    html: {
      title: 'HTML5 • Semantic Web Structure',
      code: `<!-- HTML5: Semantic, accessible layout architecture -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Engineering Student Portfolio</title>
</head>
<body>
  <header>
    <nav aria-label="Primary Navigation">
      <a href="#home">NG Monogram</a>
    </nav>
  </header>
  <main>
    <article aria-labelledby="project-heading">
      <h2 id="project-heading">Featured Engineering Projects</h2>
      <p>Exploring algorithmic problem solving and accessible UI.</p>
    </article>
  </main>
</body>
</html>`
    },
    css: {
      title: 'CSS3 • Glassmorphism & Custom Properties',
      code: `/* Modern CSS: Custom properties & frosted glass card */
:root {
  --accent-purple: #A78BFA;
  --accent-blue: #60A5FA;
  --glass-bg: rgba(21, 21, 29, 0.75);
}

.developer-card {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.developer-card:hover {
  transform: translateY(-4px);
  border-color: rgba(167, 139, 250, 0.35);
}`
    },
    sql: {
      title: 'SQL • Relational Schema & Querying',
      code: `-- SQL: Relational queries & schema joins
-- Author: Nishita G | ISE Department, BIT

-- Create Department Table
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

-- Query students enrolled in ISE with GPA ranking
SELECT 
    s.student_id,
    s.full_name,
    d.dept_name,
    s.gpa
FROM Students s
INNER JOIN Departments d ON s.dept_id = d.dept_id
WHERE d.dept_name = 'Information Science & Engineering'
  AND s.gpa >= 8.5
ORDER BY s.gpa DESC;`
    },
    excel: {
      title: 'Microsoft Excel • Dynamic Formulas & Analysis',
      code: `// Microsoft Excel Formula & Data Modelling Patterns
// Structured analysis for academic data

1. Dynamic Search (XLOOKUP):
   =XLOOKUP(A2, Students[RollNo], Students[Grade], "Not Found")

2. Conditional Analysis:
   =COUNTIFS(Grades[Course], "C Programming", Grades[Score], ">=75")

3. Summary Aggregation:
   =AVERAGEIF(Students[Department], "ISE", Students[CGPA])`
    }
  };

  window.inspectSkill = function (skillKey) {
    const item = skillSnippets[skillKey];
    if (!item) return;

    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalOverlay = document.getElementById('project-modal');

    if (!modalTitle || !modalBody || !modalOverlay) return;

    modalTitle.textContent = item.title;
    modalBody.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.8rem; color: var(--accent-purple-light); font-family: var(--font-mono);">Practical Code Sample</span>
          <button class="btn btn-secondary btn-sm" onclick="copySnippetToClipboard(\`${escapeForAttr(item.code)}\`)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Snippet
          </button>
        </div>
        <pre class="code-viewer-pre"><code>${escapeHtml(item.code)}</code></pre>
        <p style="margin-top: 14px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
          This code sample reflects practical exercises and foundational concepts taught in Information Science &amp; Engineering.
        </p>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // =========================================================================
  // 6. CANVAS CONFETTI CELEBRATION ENGINE
  // =========================================================================
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
  }

  function resizeConfetti() {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  }

  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  class ConfettiPiece {
    constructor() {
      this.x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
      this.y = window.innerHeight * 0.45;
      this.size = Math.random() * 8 + 5;
      this.color = ['#A78BFA', '#60A5FA', '#34D399', '#F472B6', '#FBBF24', '#FFFFFF'][Math.floor(Math.random() * 6)];
      this.vx = (Math.random() - 0.5) * 16;
      this.vy = -(Math.random() * 12 + 6);
      this.gravity = 0.35;
      this.drag = 0.96;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.alpha = 1;
    }

    update() {
      this.vx *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.alpha -= 0.012;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      ctx.restore();
    }
  }

  window.triggerConfetti = function () {
    if (!confettiCtx) return;

    confettiParticles = [];
    for (let i = 0; i < 90; i++) {
      confettiParticles.push(new ConfettiPiece());
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

    function loop() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      for (let i = 0; i < confettiParticles.length; i++) {
        confettiParticles[i].update();
        confettiParticles[i].draw(confettiCtx);
      }

      confettiParticles = confettiParticles.filter(p => p.alpha > 0);

      if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(loop);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }

    loop();
  };

  // Wire confetti to Guessing Game victory
  const origHandleGameGuess = window.handleGameGuess;
  if (origHandleGameGuess) {
    window.handleGameGuess = function () {
      origHandleGameGuess();
      const feedback = document.getElementById('game-feedback-text');
      if (feedback && feedback.innerHTML.includes('Fantastic')) {
        window.triggerConfetti();
      }
    };
  }

  // =========================================================================
  // 7. LIVE CHARACTER COUNTER FOR CONTACT FORM
  // =========================================================================
  const messageInput = document.getElementById('sender-message');
  const charCounter = document.getElementById('char-counter');
  const maxChars = 500;

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', function () {
      const length = this.value.length;
      charCounter.textContent = `${length} / ${maxChars}`;

      if (length > maxChars * 0.9) {
        charCounter.style.color = '#F59E0B';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // Hook Confetti to successful contact form submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      setTimeout(() => {
        if (window.triggerConfetti) window.triggerConfetti();
      }, 950);
    });
  }

  // Helper escape
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  function escapeForAttr(text) {
    return text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }
})();
