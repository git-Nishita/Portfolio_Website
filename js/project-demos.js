/**
 * PROJECT-DEMOS.JS - Interactive Project Demos & Code Viewers
 * Provides real playable simulations of Nishita's starter Python projects
 */

(function () {
  // Modal Elements
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  // Open modal helper
  function openModal(title, contentHtml) {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal helper
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close when clicking backdrop
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 1. PYTHON CALCULATOR INTERACTIVE DEMO
  // ==========================================
  window.openCalculatorDemo = function () {
    const html = `
      <div style="text-align: center; margin-bottom: 16px;">
        <span style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-purple); background: rgba(167, 139, 250, 0.1); padding: 4px 12px; border-radius: 999px;">
          Interactive Simulation
        </span>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 8px;">
          Simulating the logic of the Python CLI Calculator with structured error prevention.
        </p>
      </div>
      <div class="calc-widget">
        <div class="calc-display" id="calc-screen">0</div>
        <div class="calc-grid">
          <button class="calc-btn op" onclick="calcClear()">C</button>
          <button class="calc-btn op" onclick="calcBackspace()">⌫</button>
          <button class="calc-btn op" onclick="calcAppend('%')">%</button>
          <button class="calc-btn op" onclick="calcAppend('/')">÷</button>

          <button class="calc-btn" onclick="calcAppend('7')">7</button>
          <button class="calc-btn" onclick="calcAppend('8')">8</button>
          <button class="calc-btn" onclick="calcAppend('9')">9</button>
          <button class="calc-btn op" onclick="calcAppend('*')">×</button>

          <button class="calc-btn" onclick="calcAppend('4')">4</button>
          <button class="calc-btn" onclick="calcAppend('5')">5</button>
          <button class="calc-btn" onclick="calcAppend('6')">6</button>
          <button class="calc-btn op" onclick="calcAppend('-')">−</button>

          <button class="calc-btn" onclick="calcAppend('1')">1</button>
          <button class="calc-btn" onclick="calcAppend('2')">2</button>
          <button class="calc-btn" onclick="calcAppend('3')">3</button>
          <button class="calc-btn op" onclick="calcAppend('+')">+</button>

          <button class="calc-btn" onclick="calcAppend('0')">0</button>
          <button class="calc-btn" onclick="calcAppend('.')">.</button>
          <button class="calc-btn equals" onclick="calcEvaluate()">=</button>
        </div>
      </div>
    `;
    openModal('Python Calculator • Live Demo', html);
  };

  // Calculator Logic
  let calcExpression = '0';

  window.calcClear = function () {
    calcExpression = '0';
    updateCalcDisplay();
  };

  window.calcBackspace = function () {
    if (calcExpression.length <= 1 || calcExpression === 'Error') {
      calcExpression = '0';
    } else {
      calcExpression = calcExpression.slice(0, -1);
    }
    updateCalcDisplay();
  };

  window.calcAppend = function (val) {
    if (calcExpression === '0' || calcExpression === 'Error') {
      if ('+-*/%'.includes(val)) {
        calcExpression = '0' + val;
      } else {
        calcExpression = val;
      }
    } else {
      // Prevent consecutive operators
      const lastChar = calcExpression.slice(-1);
      if ('+-*/%'.includes(lastChar) && '+-*/%'.includes(val)) {
        calcExpression = calcExpression.slice(0, -1) + val;
      } else {
        calcExpression += val;
      }
    }
    updateCalcDisplay();
  };

  window.calcEvaluate = function () {
    try {
      // Basic expression sanitization
      if (!/^[0-9+\-*/. %()]+$/.test(calcExpression)) {
        calcExpression = 'Error';
      } else {
        // Prevent division by zero
        if (/\/0(?![0-9])/.test(calcExpression)) {
          calcExpression = 'Cannot div by 0';
        } else {
          // Compute
          const cleanExpr = calcExpression.replace(/%/g, '/100');
          // eslint-disable-next-line no-eval
          const result = Function('"use strict";return (' + cleanExpr + ')')();
          calcExpression = String(Math.round(result * 100000) / 100000);
        }
      }
    } catch (err) {
      calcExpression = 'Error';
    }
    updateCalcDisplay();
  };

  function updateCalcDisplay() {
    const screen = document.getElementById('calc-screen');
    if (screen) {
      screen.textContent = calcExpression;
    }
  }

  // ==========================================
  // 2. NUMBER GUESSING GAME INTERACTIVE DEMO
  // ==========================================
  let targetNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const maxAttempts = 7;
  let gameOver = false;

  window.openGameDemo = function () {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    const html = `
      <div class="game-widget">
        <p class="game-instructions">
          I've generated a random secret number between <strong>1 and 100</strong>.<br>
          Can you guess it within <strong>${maxAttempts} attempts</strong>?
        </p>

        <div class="game-feedback" id="game-feedback-text">
          Enter your first guess below!
        </div>

        <div class="game-input-row" id="game-controls">
          <input type="number" id="game-guess-input" class="game-input" min="1" max="100" placeholder="1 - 100" />
          <button class="btn btn-primary" onclick="handleGameGuess()">Guess</button>
        </div>

        <div class="game-stats">
          <span>Attempts Left: <strong id="game-attempts-left" style="color: var(--accent-purple-light);">${maxAttempts}</strong></span>
          <span>Target Range: <strong style="color: var(--text-white);">1 - 100</strong></span>
        </div>

        <div id="game-restart-wrap" style="margin-top: 24px; display: none;">
          <button class="btn btn-secondary" onclick="restartGame()">Play Again</button>
        </div>
      </div>
    `;
    openModal('Random Number Guessing Game • Play', html);

    // Auto focus and enter key binding
    setTimeout(() => {
      const input = document.getElementById('game-guess-input');
      if (input) {
        input.focus();
        input.addEventListener('keyup', function (e) {
          if (e.key === 'Enter') handleGameGuess();
        });
      }
    }, 100);
  };

  window.handleGameGuess = function () {
    if (gameOver) return;

    const input = document.getElementById('game-guess-input');
    const feedback = document.getElementById('game-feedback-text');
    const attemptsDisplay = document.getElementById('game-attempts-left');
    const restartWrap = document.getElementById('game-restart-wrap');
    const controls = document.getElementById('game-controls');

    if (!input || !feedback) return;

    const guess = parseInt(input.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      feedback.innerHTML = '<span style="color: #EF4444;">Please enter a valid number from 1 to 100.</span>';
      return;
    }

    attempts++;
    const remaining = maxAttempts - attempts;
    attemptsDisplay.textContent = Math.max(0, remaining);

    if (guess === targetNumber) {
      feedback.innerHTML = `
        <span style="color: #10B981; font-size: 1.15rem;">
          🎉 Fantastic! You found ${targetNumber} in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!
        </span>
      `;
      gameOver = true;
      if (restartWrap) restartWrap.style.display = 'block';
      if (controls) controls.style.display = 'none';
    } else if (remaining <= 0) {
      feedback.innerHTML = `
        <span style="color: #EF4444;">
          Game Over! The target number was <strong>${targetNumber}</strong>.
        </span>
      `;
      gameOver = true;
      if (restartWrap) restartWrap.style.display = 'block';
      if (controls) controls.style.display = 'none';
    } else if (guess < targetNumber) {
      feedback.innerHTML = `
        <span style="color: #60A5FA;">
          📉 Too Low! Go higher than ${guess}.
        </span>
      `;
    } else {
      feedback.innerHTML = `
        <span style="color: #F59E0B;">
          📈 Too High! Go lower than ${guess}.
        </span>
      `;
    }

    input.value = '';
    input.focus();
  };

  window.restartGame = function () {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    const feedback = document.getElementById('game-feedback-text');
    const attemptsDisplay = document.getElementById('game-attempts-left');
    const restartWrap = document.getElementById('game-restart-wrap');
    const controls = document.getElementById('game-controls');
    const input = document.getElementById('game-guess-input');

    if (feedback) feedback.textContent = 'New number generated! Guess a number between 1 and 100.';
    if (attemptsDisplay) attemptsDisplay.textContent = maxAttempts;
    if (restartWrap) restartWrap.style.display = 'none';
    if (controls) controls.style.display = 'flex';
    if (input) {
      input.value = '';
      input.focus();
    }
  };

  // ==========================================
  // 3. SOURCE CODE VIEWERS FOR STARTER PROJECTS
  // ==========================================
  window.viewCalculatorCode = function () {
    const code = `# Python Calculator
# Author: Nishita G | Bangalore Institute of Technology (ISE '30)
# A clean, modular command-line calculator with robust error handling

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ZeroDivisionError("Error: Division by zero is undefined.")
    return x / y

def display_menu():
    print("\\n==============================")
    print("      PYTHON CALCULATOR       ")
    print("==============================")
    print("1. Add (+)")
    print("2. Subtract (-)")
    print("3. Multiply (*)")
    print("4. Divide (/)")
    print("5. Exit")
    print("==============================")

def main():
    while True:
        display_menu()
        choice = input("Enter choice (1-5): ").strip()

        if choice == '5':
            print("Thank you for using Python Calculator. Goodbye!")
            break

        if choice not in ('1', '2', '3', '4'):
            print("Invalid input. Please choose an option between 1 and 5.")
            continue

        try:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            if choice == '1':
                print(f"Result: {num1} + {num2} = {add(num1, num2)}")
            elif choice == '2':
                print(f"Result: {num1} - {num2} = {subtract(num1, num2)}")
            elif choice == '3':
                print(f"Result: {num1} * {num2} = {multiply(num1, num2)}")
            elif choice == '4':
                print(f"Result: {num1} / {num2} = {divide(num1, num2)}")

        except ValueError:
            print("Invalid input! Please enter numeric values only.")
        except ZeroDivisionError as e:
            print(e)

if __name__ == "__main__":
    main()`;

    const html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">calculator.py</span>
          <button class="btn btn-secondary btn-sm" onclick="copySnippetToClipboard(\`${escapeForAttr(code)}\`)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Code
          </button>
        </div>
        <pre class="code-viewer-pre"><code>${escapeHtml(code)}</code></pre>
        <div style="margin-top: 16px; padding: 12px; background: rgba(167, 139, 250, 0.08); border-radius: 8px; border: 1px solid rgba(167, 139, 250, 0.2); font-size: 0.8rem; color: var(--text-secondary);">
          <strong>Repository:</strong> To publish on GitHub, create a repository named <code>python-calculator</code> and push this file as <code>main.py</code>.
        </div>
      </div>
    `;
    openModal('Source Code: Python Calculator', html);
  };

  window.viewGuessingGameCode = function () {
    const code = `# Random Number Guessing Game
# Author: Nishita G | Bangalore Institute of Technology (ISE '30)
# Interactive terminal game with dynamic range and attempt limit

import random

def play_game():
    lower_bound = 1
    upper_bound = 100
    max_attempts = 7

    secret_number = random.randint(lower_bound, upper_bound)
    attempts_taken = 0

    print("\\n========================================")
    print("     RANDOM NUMBER GUESSING GAME        ")
    print("========================================")
    print(f"I am thinking of a number between {lower_bound} and {upper_bound}.")
    print(f"You have {max_attempts} attempts to guess it.\\n")

    while attempts_taken < max_attempts:
        attempts_left = max_attempts - attempts_taken
        try:
            guess = int(input(f"[Attempts left: {attempts_left}] Enter your guess: "))
        except ValueError:
            print("Please enter a valid integer!")
            continue

        if guess < lower_bound or guess > upper_bound:
            print(f"Please guess within the range {lower_bound} to {upper_bound}.")
            continue

        attempts_taken += 1

        if guess == secret_number:
            print(f"🎉 Congratulations! You guessed the number in {attempts_taken} attempts!")
            return True
        elif guess < secret_number:
            print("📉 Too Low! Try a higher number.")
        else:
            print("📈 Too High! Try a lower number.")

    print(f"\\nGame Over! You ran out of attempts. The number was {secret_number}.")
    return False

def main():
    while True:
        play_game()
        replay = input("\\nWould you like to play again? (y/n): ").strip().lower()
        if replay != 'y':
            print("Thanks for playing! Keep coding!")
            break

if __name__ == "__main__":
    main()`;

    const html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">guessing_game.py</span>
          <button class="btn btn-secondary btn-sm" onclick="copySnippetToClipboard(\`${escapeForAttr(code)}\`)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Code
          </button>
        </div>
        <pre class="code-viewer-pre"><code>${escapeHtml(code)}</code></pre>
        <div style="margin-top: 16px; padding: 12px; background: rgba(96, 165, 250, 0.08); border-radius: 8px; border: 1px solid rgba(96, 165, 250, 0.2); font-size: 0.8rem; color: var(--text-secondary);">
          <strong>Repository:</strong> To publish on GitHub, create a repository named <code>number-guessing-game</code> and push this file as <code>main.py</code>.
        </div>
      </div>
    `;
    openModal('Source Code: Number Guessing Game', html);
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  function escapeForAttr(text) {
    return text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }

  window.copySnippetToClipboard = function (text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) {
          window.showToast('Code copied to clipboard!');
        } else {
          alert('Code copied to clipboard!');
        }
      });
    }
  };
})();
