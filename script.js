// 1. ENVELOPE COM LACRE E ABERTURA SUAVE
const envelope = document.getElementById('envelope');
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');
const gatekeeper = document.getElementById('gatekeeper');
const mainContent = document.getElementById('main-content');
const errorMsg = document.getElementById('error-msg');

function checkPassword() {
  const val = passInput.value.trim().toLowerCase();
  
  if (val === 'linda') {
    errorMsg.style.display = 'none';
    
    // Abre o envelope
    envelope.classList.add('open');

    // Desaparece a tela inicial e mostra o painel principal
    setTimeout(() => {
      gatekeeper.style.opacity = '0';
      setTimeout(() => {
        gatekeeper.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
      }, 800);
    }, 1200);

  } else {
    errorMsg.style.display = 'block';
  }
}

if (unlockBtn) unlockBtn.addEventListener('click', checkPassword);
if (passInput) {
  passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
}

// 2. MODAIS COM BLUR NO FUNDO
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// 3. BISCOITO DA SORTE DE PAPEL
const frasesSorte = [
  "Seu sorriso ilumina qualquer dia cinzento! ✨",
  "Sorte a minha de ter você ao meu lado. 💖",
  "Uma dose extra de carinho está chegando para você!",
  "Você é o meu pensamento favorito de todos os dias. 💜"
];

function crackCookie() {
  const cookiePaper = document.getElementById('cookie-paper');
  const fortuneText = document.getElementById('fortune-text');
  
  if (cookiePaper && !cookiePaper.classList.contains('open')) {
    const sorte = frasesSorte[Math.floor(Math.random() * frasesSorte.length)];
    if (fortuneText) fortuneText.textContent = sorte;
    cookiePaper.classList.add('open');
  }
}

function resetCookie() {
  const cookiePaper = document.getElementById('cookie-paper');
  if (cookiePaper) cookiePaper.classList.remove('open');
}

// 4. MINI GAME REFORMULADO
let score = 0;
let timeLeft = 20;
let gameInterval;
let timerInterval;

function startGame() {
  score = 0;
  timeLeft = 20;
  document.getElementById('game-score').textContent = score;
  document.getElementById('game-timer').textContent = `${timeLeft}s`;
  
  const canvas = document.getElementById('game-canvas');
  const overlay = document.getElementById('game-overlay-msg');
  if (overlay) overlay.style.display = 'none';

  const oldItems = canvas.querySelectorAll('.falling-item');
  oldItems.forEach(item => item.remove());

  const catcher = document.getElementById('game-catcher');
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    catcher.style.left = `${Math.max(20, Math.min(x, rect.width - 20))}px`;
  };

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('game-timer').textContent = `${timeLeft}s`;
    if (timeLeft <= 0) endGame();
  }, 1000);

  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.textContent = '💖';
    item.style.left = `${Math.random() * (canvas.clientWidth - 30)}px`;
    item.style.top = '0px';
    canvas.appendChild(item);

    let top = 0;
    const fall = setInterval(() => {
      top += 3;
      item.style.top = `${top}px`;

      const catcherRect = catcher.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (
        itemRect.bottom >= catcherRect.top &&
        itemRect.left <= catcherRect.right &&
        itemRect.right >= catcherRect.left
      ) {
        score += 10;
        document.getElementById('game-score').textContent = score;
        item.remove();
        clearInterval(fall);
      }

      if (top > canvas.clientHeight) {
        item.remove();
        clearInterval(fall);
      }
    }, 25);
  }, 700);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  const overlay = document.getElementById('game-overlay-msg');
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.textContent = `Fim de jogo! Você pegou ${score} mimos! 💖`;
  }
}
