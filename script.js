const room = document.getElementById("room");
const desk = document.getElementById("desk");
const backButton = document.getElementById("back-button");

// CLICAR NA MESA
desk.addEventListener("click", () => {
    room.classList.add("zoom-desk");
    backButton.style.display = "block";
});

// VOLTAR PARA O QUARTO INTEIRO
backButton.addEventListener("click", () => {
    room.classList.remove("zoom-desk");
    backButton.style.display = "none";
});

