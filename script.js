
function criarMatriz(tamanho) {
    let matriz = [];
    for (let i = 0; i < tamanho; i++) {
        matriz[i] = [];
        for (let j = 0; j < tamanho; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

function adicionarElemento(matriz, indiceElemento, quantidadeElemento) {
    for (let i = 0; i < quantidadeElemento; i++) {
        let linha = Math.floor(Math.random() * matriz.length);
        let coluna = Math.floor(Math.random() * matriz.length);

        while (matriz[linha][coluna] !== 0) {
            linha = Math.floor(Math.random() * matriz.length);
            coluna = Math.floor(Math.random() * matriz.length);
        }
        matriz[linha][coluna] = indiceElemento;
    }
}

function criarTabuleiro(matriz) {
    let tabela = document.createElement("table");
    for (let i = 0; i < matriz.length; i++) {
        let linha = document.createElement("tr");
        for (let j = 0; j < matriz.length; j++) {
            let coluna = document.createElement("td");
            let img = document.createElement("img");
            img.classList.add("coberta");
            img.setAttribute("data-coluna", j);
            img.setAttribute("data-linha", i);
            img.src = "Fire-icon.png";

            img.addEventListener("click", clicarCelula);

            coluna.appendChild(img);
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
    document.getElementById("table-container").appendChild(tabela);
}

function clicarCelula(event) {
    let celula = event.target;
    let linha = parseInt(celula.getAttribute("data-linha"));
    let coluna = parseInt(celula.getAttribute("data-coluna"));

    if (matriz[linha][coluna] != 0) {
        celula.classList.add("navio");
        if (matriz[linha][coluna] === 5) {
            celula.src = "Ship-1.png";
        } else if (matriz[linha][coluna] === 7) {
            celula.src = "Ship-2.png";
        } else if (matriz[linha][coluna] === 9) {
            celula.src = "Ship-3.png";
        }
        celula.classList.remove("coberta");
        verificarFimDeJogo();
    } else {
        celula.src = "Wave.png";
        celula.classList.remove("coberta");
    }
}

function verificarFimDeJogo() {
    let naviosRestantes = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            if (matriz[i][j] !== 0 && document.querySelector(`[data-linha="${i}"][data-coluna="${j}"]`).classList.contains("coberta")) {
                naviosRestantes++;
            }
        }
    }
    if (naviosRestantes === 0) {
        alert("Todos os navios foram afundados! Fim de jogo.");
    }
}

function iniciarJogo() {
    document.querySelector('.start-button').classList.add('hidden');
    document.querySelector('.image-section').classList.add('hidden');
    document.querySelector('.game-section').classList.remove('hidden');
    document.querySelector('.restart-button').classList.remove('hidden');
    let matriz = criarMatriz(10);
    adicionarElemento(matriz, 9, 8);
    adicionarElemento(matriz, 5, 4);
    adicionarElemento(matriz, 7, 6);
    criarTabuleiro(matriz);
}

function redirecionarParaPagina() {
    window.location.href = 'meuJogo.html';
}

