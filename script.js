import * as THREE from "three";

const container = document.getElementById("scene-container");
const backButton = document.getElementById("backButton");
const interactionTitle = document.getElementById("interactionTitle");
const interactionText = document.getElementById("interactionText");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 13);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* =========================
   LUZES
========================= */

const ambient = new THREE.AmbientLight(0xffffff, 1.4);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xfff2d1, 1.5, 30);
pointLight.position.set(2, 3, 6);
scene.add(pointLight);

/* =========================
   GRUPO DO QUARTO
========================= */

const roomGroup = new THREE.Group();
scene.add(roomGroup);

/* =========================
   TEXTURA DA IMAGEM BASE
========================= */

const loader = new THREE.TextureLoader();
const roomTexture = loader.load("./quarto.png");

roomTexture.colorSpace = THREE.SRGBColorSpace;
roomTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const ROOM_W = 15;
const ROOM_H = 10; // proporção 3:2 próxima da imagem

const roomGeometry = new THREE.PlaneGeometry(ROOM_W, ROOM_H);
const roomMaterial = new THREE.MeshBasicMaterial({
  map: roomTexture
});

const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);
roomGroup.add(roomMesh);

/* =========================
   FUNDO
========================= */

const bgGeometry = new THREE.PlaneGeometry(40, 25);
const bgMaterial = new THREE.MeshBasicMaterial({
  color: 0x0d1018
});
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.position.z = -5;
scene.add(bgMesh);

/* =========================
   HOTSPOTS
   coordenadas em porcentagem da imagem
========================= */

const DEBUG_HOTSPOTS = false;
const hotspots = [];

function uvToPosition(u, v) {
  const x = (u - 0.5) * ROOM_W;
  const y = (0.5 - v) * ROOM_H;
  return { x, y };
}

function createHotspot({
  id,
  label,
  description,
  u,
  v,
  w,
  h,
  zoom = 2.2
}) {
  const pos = uvToPosition(u, v);
  const width = w * ROOM_W;
  const height = h * ROOM_H;

  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color: DEBUG_HOTSPOTS ? 0xff00ff : 0xff00ff,
    transparent: true,
    opacity: DEBUG_HOTSPOTS ? 0.28 : 0.01
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(pos.x, pos.y, 0.03);
  mesh.userData = {
    id,
    label,
    description,
    zoom,
    homeX: pos.x,
    homeY: pos.y
  };

  roomGroup.add(mesh);
  hotspots.push(mesh);
}

// HOTSPOTS PRINCIPAIS
createHotspot({
  id: "desk",
  label: "Mesa",
  description: "Aqui fica a área principal da mesa: computador, teclado, celular, rádio, livros e detalhes para interação.",
  u: 0.62,
  v: 0.36,
  w: 0.28,
  h: 0.20,
  zoom: 3.0
});

createHotspot({
  id: "computer",
  label: "Computador",
  description: "Abre o sistema do computador com arquivos, fotos, músicas e outras coisas.",
  u: 0.57,
  v: 0.29,
  w: 0.12,
  h: 0.12,
  zoom: 4.0
});

createHotspot({
  id: "window",
  label: "Janela",
  description: "Dá zoom para a vista da cidade e o céu noturno.",
  u: 0.70,
  v: 0.20,
  w: 0.18,
  h: 0.16,
  zoom: 3.4
});

createHotspot({
  id: "bed",
  label: "Cama",
  description: "Permite investigar a cama, travesseiros, coberta e os compartimentos embaixo.",
  u: 0.80,
  v: 0.58,
  w: 0.25,
  h: 0.25,
  zoom: 2.7
});

createHotspot({
  id: "notes-board",
  label: "Quadro de anotações",
  description: "Bilhetes, pistas, fotos e pequenos detalhes para observar.",
  u: 0.31,
  v: 0.31,
  w: 0.13,
  h: 0.14,
  zoom: 4.0
});

createHotspot({
  id: "guitar",
  label: "Violão",
  description: "Dá para aproximar e usar como item interativo depois.",
  u: 0.43,
  v: 0.50,
  w: 0.07,
  h: 0.18,
  zoom: 3.5
});

createHotspot({
  id: "cube",
  label: "Cubo mágico",
  description: "Cubo 3x3 para pegar, embaralhar e resolver depois.",
  u: 0.49,
  v: 0.66,
  w: 0.05,
  h: 0.06,
  zoom: 5.2
});

createHotspot({
  id: "backpack",
  label: "Mochila",
  description: "Pode ser aberta para examinar objetos guardados.",
  u: 0.90,
  v: 0.81,
  w: 0.09,
  h: 0.15,
  zoom: 4.0
});

createHotspot({
  id: "telescope",
  label: "Telescópio",
  description: "Permite observar estrelas, Lua e outros objetos do céu.",
  u: 0.77,
  v: 0.33,
  w: 0.08,
  h: 0.16,
  zoom: 4.0
});

createHotspot({
  id: "shelf-left",
  label: "Estante",
  description: "Livros, rádio, plantas e pequenos objetos para interação.",
  u: 0.27,
  v: 0.48,
  w: 0.12,
  h: 0.20,
  zoom: 3.4
});

createHotspot({
  id: "shelf-right",
  label: "Prateleira direita",
  description: "Livros, objetos espaciais, fotos e itens decorativos.",
  u: 0.87,
  v: 0.26,
  w: 0.13,
  h: 0.18,
  zoom: 3.5
});

createHotspot({
  id: "tank",
  label: "Aquário",
  description: "Uma interação decorativa que pode ganhar animações depois.",
  u: 0.09,
  v: 0.78,
  w: 0.09,
  h: 0.12,
  zoom: 4.4
});

createHotspot({
  id: "safe",
  label: "Cofre",
  description: "Cofre pequeno para abrir com senha mais tarde.",
  u: 0.93,
  v: 0.87,
  w: 0.08,
  h: 0.10,
  zoom: 4.5
});

/* =========================
   RAYCAST
========================= */

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let hovered = null;
let currentFocus = null;

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener("click", () => {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(hotspots);

  if (intersects.length > 0) {
    const selected = intersects[0].object;
    focusOnHotspot(selected);
  }
});

function focusOnHotspot(mesh) {
  currentFocus = {
    x: mesh.userData.homeX,
    y: mesh.userData.homeY,
    zoom: mesh.userData.zoom
  };

  interactionTitle.textContent = mesh.userData.label;
  interactionText.textContent = mesh.userData.description;
  backButton.style.display = "block";
}

function resetFocus() {
  currentFocus = null;
  interactionTitle.textContent = "Quarto";
  interactionText.textContent = "Clique em algum item do quarto.";
  backButton.style.display = "none";
}

backButton.addEventListener("click", resetFocus);

/* =========================
   PARALLAX
========================= */

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

/* =========================
   ANIMAÇÃO DE CÂMERA
========================= */

const defaultCamera = {
  x: 0,
  y: 0,
  z: 13
};

const targetCamera = {
  x: 0,
  y: 0,
  z: 13
};

function animate() {
  requestAnimationFrame(animate);

  // hover
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(hotspots);

  if (intersects.length > 0) {
    if (hovered !== intersects[0].object) {
      hovered = intersects[0].object;
      document.body.style.cursor = "pointer";
    }
  } else {
    hovered = null;
    document.body.style.cursor = "default";
  }

  // foco
  if (currentFocus) {
    targetCamera.x = currentFocus.x * 0.55;
    targetCamera.y = currentFocus.y * 0.55;
    targetCamera.z = 13 - currentFocus.zoom;
  } else {
    targetCamera.x = mouseX * 0.18;
    targetCamera.y = -mouseY * 0.12;
    targetCamera.z = defaultCamera.z;
  }

  camera.position.x += (targetCamera.x - camera.position.x) * 0.08;
  camera.position.y += (targetCamera.y - camera.position.y) * 0.08;
  camera.position.z += (targetCamera.z - camera.position.z) * 0.08;

  camera.lookAt(0, 0, 0);

  // leve sensação de profundidade
  roomGroup.rotation.y += ((mouseX * 0.03) - roomGroup.rotation.y) * 0.05;
  roomGroup.rotation.x += ((-mouseY * 0.02) - roomGroup.rotation.x) * 0.05;

  renderer.render(scene, camera);
}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
