// KeyFlow - Timer logic
let mode = 15;
let words = [];
let currentWord = 0;
let currentChar = 0;
let typedHistory = [];
let started = false;
let finished = false;
let timeLeft = 15;
let timerInterval = null;
let startTime = null;

const timerDisplay = document.getElementById('timerDisplay');
const wordsDisplay = document.getElementById('wordsDisplay');
const hiddenInput  = document.getElementById('hiddenInput');
const resetBtn     = document.getElementById('resetBtn');

function updateTimerDisplay() {
  if (mode === 'free') {
    timerDisplay.textContent = 'âˆž';
    timerDisplay.style.fontSize = '2rem';
    timerDisplay.className = 'timer-display';
  } else {
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.fontSize = '';
    timerDisplay.className = 'timer-display' + (timeLeft <= 5 ? ' urgent' : '');
  }
}

function startTimer() {
  if (mode === 'free') return;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endTest();
    }
  }, 1000);
}

function endTest() {
  finished = true;
  clearInterval(timerInterval);
  hiddenInput.blur();
  alert('Time is up! Refresh or press Tab to try again.');
}

function renderWords() {
  wordsDisplay.innerHTML = '<div class="click-hint' + (started ? ' hidden' : '') + '">Click here or press any key to start</div>';
  words.forEach((word, wi) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'word';
    wordEl.id = `w${wi}`;
    const typed = typedHistory[wi] || [];

    word.split('').forEach((ch, ci) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      if (wi < currentWord) {
        span.className = 'letter ' + (typed[ci] === ch ? 'correct' : 'wrong');
      } else if (wi === currentWord) {
        if (ci < typed.length) span.className = 'letter ' + (typed[ci] === ch ? 'correct' : 'wrong');
        else if (ci === typed.length) span.className = 'letter cursor-char';
      }
      wordEl.appendChild(span);
    });
    if (wi === currentWord && typed.length > word.length) {
      for (let ei = word.length; ei < typed.length; ei++) {
        const span = document.createElement('span');
        span.className = 'letter wrong-extra';
        span.textContent = typed[ei];
        wordEl.appendChild(span);
      }
    }
    wordsDisplay.appendChild(wordEl);
  });
  const wordEl = document.getElementById(`w${currentWord}`);
  if (wordEl) wordsDisplay.scrollTop = Math.max(0, wordEl.offsetTop - 40);
}

hiddenInput.addEventListener('input', (e) => {
  if (finished) return;
  const val = hiddenInput.value;
  if (!val) return;
  const ch = val[val.length - 1];
  hiddenInput.value = '';

  if (!started) {
    started = true;
    startTime = Date.now();
    startTimer();
    document.querySelector('.click-hint')?.classList.add('hidden');
  }

  if (ch === ' ') {
    if (typedHistory[currentWord] && typedHistory[currentWord].length > 0) {
      currentWord++;
      currentChar = 0;
      if (currentWord >= words.length) { endTest(); return; }
      typedHistory[currentWord] = typedHistory[currentWord] || [];
    }
  } else {
    if (!typedHistory[currentWord]) typedHistory[currentWord] = [];
    typedHistory[currentWord].push(ch);
    currentChar = typedHistory[currentWord].length;
  }
  renderWords();
});

hiddenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); resetTest(); return; }
  if (e.key === 'Backspace') {
    e.preventDefault();
    const typed = typedHistory[currentWord];
    if (typed && typed.length > 0) { typed.pop(); currentChar = typed.length; }
    else if (currentWord > 0) { currentWord--; currentChar = (typedHistory[currentWord] || []).length; }
    renderWords();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') { e.preventDefault(); resetTest(); }
  if (!finished && !started && e.key.length === 1) hiddenInput.focus();
});

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

resetBtn.addEventListener('click', resetTest);

function resetTest() {
  clearInterval(timerInterval);
  words = generateWords();
  currentWord = 0; currentChar = 0; typedHistory = [];
  started = false; finished = false;
  timeLeft = typeof mode === 'number' ? mode : 0;
  updateTimerDisplay();
  wordsDisplay.scrollTop = 0;
  renderWords();
  hiddenInput.value = '';
  hiddenInput.focus();
}

resetTest();
