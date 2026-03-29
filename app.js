// KeyFlow - Word rendering
let mode = 15;
let words = [];

const timerDisplay = document.getElementById('timerDisplay');
const wordsDisplay = document.getElementById('wordsDisplay');
const hiddenInput  = document.getElementById('hiddenInput');
const clickHint    = document.getElementById('clickHint');

function updateTimerDisplay() {
  if (mode === 'free') {
    timerDisplay.textContent = 'âˆž';
    timerDisplay.style.fontSize = '2rem';
    timerDisplay.className = 'timer-display';
  } else {
    timerDisplay.textContent = mode;
    timerDisplay.style.fontSize = '';
    timerDisplay.className = 'timer-display';
  }
}

function renderWords() {
  wordsDisplay.innerHTML = '<div class="click-hint" id="clickHint">Click here or press any key to start</div>';
  words.forEach((word, wi) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'word';
    wordEl.id = `w${wi}`;
    wordEl.style.display = 'inline-block';
    wordEl.style.marginRight = '0.55em';
    word.split('').forEach(ch => {
      const span = document.createElement('span');
      span.style.color = 'var(--pending)';
      span.textContent = ch;
      wordEl.appendChild(span);
    });
    wordsDisplay.appendChild(wordEl);
  });
}

function resetTest() {
  words = generateWords();
  updateTimerDisplay();
  renderWords();
  hiddenInput.value = '';
  hiddenInput.focus();
}

wordsDisplay.addEventListener('click', () => hiddenInput.focus());

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const m = btn.dataset.mode;
    mode = m === 'free' ? 'free' : parseInt(m);
    resetTest();
  });
});

resetTest();
