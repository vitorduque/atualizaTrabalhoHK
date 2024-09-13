// Define o objeto samurai com suas propriedades e métodos
const samurai = {
    x: 50,
    y: 0,
    altura: runBoneco[0].altura,
    largura: runBoneco[0].largura,
    gravidade: 1.6,
    velocidadeQueda: 0,
    forcaDoPulo: 33.6,
    qntPulos: 0,
    maxPulos: 1,
    indexBoneco: 0,
    trocaSprite: 5,

    atualiza: function() {
        this.cair(); // Faz o samurai cair

        // Se o samurai está pisando no chão, zera o pulo e velocidade de queda
        if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
            this.y = chao.y - this.altura;
            this.qntPulos = 0;
            this.velocidadeQueda = 0;
        }

        if (estadoAtual == estados.jogando) {
            this.animateSprite();
        }
    },

    // Atualiza o índice do sprite para animação
    animateSprite: function() {
        if (this.trocaSprite == 4) {
            this.indexBoneco = (this.indexBoneco + 1) % runBoneco.length;
            this.trocaSprite = 5;
        } else {
            this.trocaSprite--;
        }
    },

    // Aplica a gravidade e atualiza a posição do samurai
    cair: function() {
        this.velocidadeQueda += this.gravidade;
        this.y += this.velocidadeQueda;
    },

    // Emprega força negativa na queda, o que faz o samurai pular
    pula: function() {
        if (this.qntPulos < this.maxPulos) {
            this.velocidadeQueda = -this.forcaDoPulo;
            this.qntPulos++;
        }
    },

    // Desenha o sprite atual do samurai na tela
    desenha: function() {
        runBoneco[this.indexBoneco].desenha(this.x, this.y);
    },

    // Reseta a posição e velocidade do samurai
    reset: function() {
        this.velocidadeQueda = 0;
        this.y = 0;
    }
};

// Função para lidar com eventos de teclado
function handleKeyDown(event) {
    if (event.code === 'Space') {
        samurai.pula();
    }
}

// Adiciona o event listener para a tecla 'Space'
document.addEventListener('keydown', handleKeyDown);