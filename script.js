let cartasViradas = []; // Armazenar cartas viradas para checar pares
let bloqueado = false; // Evitar múltiplos cliques simultâneos

// Definindo as cartas como objetos com fruta e número
const cartas = [
    { fruta: '🍎', numero: 1 },
    { fruta: '🍌', numero: 2 },
    { fruta: '🍍', numero: 3 },
    { fruta: '🍓', numero: 4 },
    { fruta: '🍏', numero: 5 }, 
    { fruta: '🍊', numero: 6 }, 
    { fruta: '🍇', numero: 7 }, 
    { fruta: '🍑', numero: 8 }, 
    { fruta: '🍎', numero: 1 },
    { fruta: '🍌', numero: 2 },
    { fruta: '🍍', numero: 3 },
    { fruta: '🍓', numero: 4 },
    { fruta: '🍏', numero: 5 },
    { fruta: '🍊', numero: 6 },
    { fruta: '🍇', numero: 7 },
    { fruta: '🍑', numero: 8 }
];

// Embaralhar as cartas
function embaralhar(arr) {
    let i = arr.length, j, temp;
    while (i > 0) {
        j = Math.floor(Math.random() * i);
        i--;
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// Função para virar a carta
function virarCarta() {
    if (bloqueado) return; // Evita múltiplos cliques simultâneos

    const carta = this;
    carta.querySelector('.carta-conteudo').style.transform = 'rotateY(180deg)'; // Vira a carta

    cartasViradas.push(carta);

    // Se 2 cartas foram viradas, checar se são um par
    if (cartasViradas.length === 2) {
        checarPar();
    }
}

// Função para checar se as cartas viradas são um par
function checarPar() {
    bloqueado = true; // Bloqueia o clique durante a verificação
    const [carta1, carta2] = cartasViradas;

    // Obter os números das cartas viradas para comparação
    const numero1 = carta1.dataset.numero;
    const numero2 = carta2.dataset.numero;

    if (numero1 === numero2) {
        // Se forem iguais, deixar viradas
        cartasViradas = [];
        bloqueado = false;
    } else {
        // Se não forem iguais, virar de volta após um breve atraso
        setTimeout(() => {
            carta1.querySelector('.carta-conteudo').style.transform = 'rotateY(0deg)';
            carta2.querySelector('.carta-conteudo').style.transform = 'rotateY(0deg)';
            cartasViradas = [];
            bloqueado = false;
        }, 1000); // Tempo para mostrar as cartas antes de virar novamente
    }
}

// Função para criar o tabuleiro
function criarTabuleiro() {
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro

    embaralhar(cartas).forEach((carta, index) => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.numero = carta.numero; // Adiciona o número da carta no data-atributo

        // Inicialmente as cartas estão com o verso visível (branco)
        cartaElemento.innerHTML = `
            <div class="carta-conteudo">
                <div class="carta-frente">${carta.fruta}</div>
                <div class="carta-verso"></div>
            </div>
        `;
        
        cartaElemento.addEventListener('click', virarCarta);
        tabuleiro.appendChild(cartaElemento);
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    cartasViradas = [];
    bloqueado = false;
    criarTabuleiro();
}

// Iniciar o jogo
const tabuleiro = document.querySelector('.tabuleiro-jogo');
criarTabuleiro();
