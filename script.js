// 1. GERAR PARTÍCULAS
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
    particle.style.animationDelay = `${Math.random() * 7}s`;
    particlesContainer.appendChild(particle);
  }
}

// 2. ABERTURA DO ENVELOPE
const envelopeContainer = document.getElementById('envelope-container');
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');
const gatekeeper = document.getElementById('gatekeeper');
const mainContent = document.getElementById('main-content');
const errorMsg = document.getElementById('error-msg');

function checkPassword() {
  const val = passInput.value.trim().toLowerCase();
  
  if (val === 'linda') {
    errorMsg.style.display = 'none';
    
    // Adiciona a classe que abre o envelope
    envelopeContainer.classList.add('open');

    // Transição suave para a tela principal
    setTimeout(() => {
      gatekeeper.style.opacity = '0';
      setTimeout(() => {
        gatekeeper.style.visibility = 'hidden';
        mainContent.style.opacity = '1';
      }, 800);
    }, 1100);

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

// 3. ABRIR E FECHAR MODAIS
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

// 4. BISCOITO DA SORTE
const frasesSorte = [
  "Seu sorriso ilumina qualquer lugar! ✨",
  "Sorte a minha de ter você por perto. 💜",
  "Uma dose extra de carinho está chegando para você!",
  "Você é o meu pensamento favorito do dia! 💖"
];

function crackCookie() {
  const cookieBox = document.getElementById('cookie-box');
  const fortuneText = document.getElementById('fortune-text');
  
  if (cookieBox && !cookieBox.classList.contains('cracked')) {
    const sorte = frasesSorte[Math.floor(Math.random() * frasesSorte.length)];
    if (fortuneText) fortuneText.textContent = sorte;
    cookieBox.classList.add('cracked');
  }
}

function resetCookie() {
  const cookieBox = document.getElementById('cookie-box');
  if (cookieBox) cookieBox.classList.remove('cracked');
}

// 5. MINI GAME
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

  const oldHearts = canvas.querySelectorAll('.game-heart');
  oldHearts.forEach(h => h.remove());

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
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.textContent = '💖';
    heart.style.left = `${Math.random() * (canvas.clientWidth - 30)}px`;
    heart.style.top = '0px';
    canvas.appendChild(heart);

    let top = 0;
    const fall = setInterval(() => {
      top += 3;
      heart.style.top = `${top}px`;

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
  }, 750);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  const overlay = document.getElementById('game-overlay-msg');
  if (overlay) {
    overlay.style.display = 'flex';
    overlay.textContent = `Fim de Jogo! Pontuação: ${score} 💖`;
  }
}
