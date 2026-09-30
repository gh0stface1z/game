// 1. GERAR PARTÍCULAS NO FUNDO
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particlesContainer.appendChild(particle);
  }
}

// 2. LÓGICA DE SENHA E DESBLOQUEIO
const unlockBtn = document.getElementById('unlock-btn');
const passInput = document.getElementById('password-input');
const gatekeeper = document.getElementById('gatekeeper');
const mainContent = document.getElementById('main-content');
const errorMsg = document.getElementById('error-msg');

function checkPassword() {
  const val = passInput.value.trim().toLowerCase();
  if (val === 'linda') {
    gatekeeper.style.opacity = '0';
    setTimeout(() => {
      gatekeeper.style.visibility = 'hidden';
      mainContent.style.opacity = '1';
    }, 800);
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
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// 4. LÓGICA DO BISCOITO DA SORTE
const biscoitoBtn = document.getElementById('biscoito-btn');
const biscoitoResposta = document.getElementById('biscoito-resposta');
const frasesSorte = [
  "Seu sorriso deixa qualquer dia comum mais bonito. ✨",
  "Sorte a minha de ter você por perto!",
  "Uma dose extra de carinho está vindo para você hoje.",
  "Você é o pensamento bom de alguém hoje. 💜"
];

if (biscoitoBtn) {
  biscoitoBtn.addEventListener('click', () => {
    const sorte = frasesSorte[Math.floor(Math.random() * frasesSorte.length)];
    if (biscoitoResposta) biscoitoResposta.textContent = sorte;
    biscoitoBtn.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => biscoitoBtn.style.transform = 'scale(1)', 200);
  });
}

// 5. LÓGICA DO MINI GAME PEGA CORAÇÃO
let score = 0;
let gameInterval;
function startGame() {
  score = 0;
  const scoreDisplay = document.getElementById('game-score');
  if (scoreDisplay) scoreDisplay.textContent = score;
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  canvas.innerHTML = '';
  
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * (canvas.clientWidth - 30) + 'px';
    heart.style.top = '0px';

    heart.onclick = () => {
      score += 10;
      if (scoreDisplay) scoreDisplay.textContent = score;
      heart.remove();
    };

    canvas.appendChild(heart);

    let top = 0;
    const fall = setInterval(() => {
      top += 3;
      heart.style.top = top + 'px';
      if (top > canvas.clientHeight) {
        heart.remove();
        clearInterval(fall);
      }
    }, 30);
  }, 1000);
}
