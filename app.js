let mode = 15;

const timerDisplay = document.getElementById('timerDisplay');

function updateTimerDisplay() {
  if (mode === 'free') {
    timerDisplay.textContent = 'âˆž';
    timerDisplay.style.fontSize = '2rem';
    timerDisplay.style.letterSpacing = '0.1em';
    timerDisplay.className = 'timer-display';
  } else {
    timerDisplay.textContent = mode;
    timerDisplay.style.fontSize = '';
    timerDisplay.style.letterSpacing = '';
    timerDisplay.className = 'timer-display';
  }
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const m = btn.dataset.mode;
    mode = m === 'free' ? 'free' : parseInt(m);
    updateTimerDisplay();
  });
});

updateTimerDisplay();
