// 1. GERAR PARTÍCULAS DE FUNDO
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particlesContainer.appendChild(particle);
  }
}

// 2. ENVELOPE COM ANIMAÇÃO E SENHA
const envelopeWrapper = document.getElementById('envelope-wrapper');
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');
const gatekeeper = document.getElementById('gatekeeper');
const mainContent = document.getElementById('main-content');
const errorMsg = document.getElementById('error-msg');

function checkPassword() {
  const val = passInput.value.trim().toLowerCase();
  if (val === 'linda') {
    // Anima a abertura do envelope
    envelopeWrapper.classList.add('open');
    errorMsg.style.display = 'none';

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

// 3. ABRIR E FECHAR MODAIS COM BLUR NO FUNDO
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

// 4. LÓGICA DO BISCOITO DA SORTE 3D
const frasesSorte = [
  "Seu sorriso deixa qualquer dia comum bem mais bonito! ✨",
  "Sorte a minha de ter você por perto. 💖",
  "Uma dose extra de carinho está vindo para você hoje!",
  "Você é o meu pensamento favorito de todos os dias. 💜"
];

function crackCookie() {
  const cookie3d = document.getElementById('cookie-3d');
  const fortuneText = document.getElementById('fortune-text');
  if (cookie3d && !cookie3d.classList.contains('cracked')) {
    const sorte = frasesSorte[Math.floor(Math.random() * frasesSorte.length)];
    if (fortuneText) fortuneText.textContent = sorte;
    cookie3d.classList.add('cracked');
  }
}

function resetCookie() {
  const cookie3d = document.getElementById('cookie-3d');
  if (cookie3d) cookie3d.classList.remove('cracked');
}

// 5. MINI GAME REFORMULADO (PEGA CORAÇÃO COM CESTA)
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

  // Remover corações anteriores
  const oldHearts = canvas.querySelectorAll('.game-heart-item');
  oldHearts.forEach(h => h.remove());

  // Mover cesta com o mouse/dedo
  const catcher = document.getElementById('game-catcher');
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    catcher.style.left = `${Math.max(20, Math.min(x, rect.width - 20))}px`;
  };

  // Timer
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('game-timer').textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Spawn de Corações
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'game-heart-item';
    heart.textContent = '💖';
    heart.style.left = `${Math.random() * (canvas.clientWidth - 30)}px`;
    heart.style.top = '0px';
    canvas.appendChild(heart);

    let top = 0;
    const fall = setInterval(() => {
      top += 4;
      heart.style.top = `${top}px`;

      // Detecção de colisão com a cesta
      const catcherRect = catcher.getBoundingClientRect();
      const heartRect = heart.getBoundingClientRect();

      if (
        heartRect.bottom >= catcherRect.top &&
        heartRect.left <= catcherRect.right &&
        heartRect.right >= catcherRect.left
      ) {
        score += 10;
        document.getElementById('game-score').textContent = score;
        heart.remove();
        clearInterval(fall);
      }

      if (top > canvas.clientHeight) {
        heart.remove();
        clearInterval(fall);
      }
    }, 25);
  }, 800);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  const overlay = document.getElementById('game-overlay-msg');
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.textContent = `Fim de Jogo! Pontuação Final: ${score} 💖`;
  }
}
