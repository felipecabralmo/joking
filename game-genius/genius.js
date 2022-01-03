let order = [];
let clickedOrder = [];
let score = 0;

/* Legenda
0 = Verde
1 = Vermelho
2 = Amarelo
3 = Azul
*/

//Recupera os elements que serão objeto de manipulação pelo game
const vBlue = document.querySelector('.blue');
const vGreen = document.querySelector('.green');
const vYellow = document.querySelector('.yellow');
const vRed = document.querySelector('.red');

//Gera ordem
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
};

//Acende ou destaca próxima cor que deve ser clicada
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(
        () =>{
            element.classList.add('selected');
        }, number - 250);
    setTimeout(
        () => {
            element.classList.remove('selected');
        }, number);
};

//Checa se clique foi ou não o a cor em destaque
let checkOrder = () => {
    for(let i in clickedOrder){
        if (clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando prósimo nível!`);
        nextLevel();
    }
};

//Função clique
let click = (color) =>{
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    
    console.log(color);

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
};

//Retornando a cor
let createColorElement = (color) =>{
    if (color == 0){
        return vGreen;
    }else if (color ==1){
        return vRed;
    }else if (color == 2){
        return vYellow;
    }else if (color == 3){
        return vBlue;
    }
};

//Proximo nível
let nextLevel = () =>{
    score++;
    shuffleOrder();
};

//Perdeu
let gameOver = () =>{
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Iniciando o Jogo
let playGame = () => {
    alert(`Bem vindo(a) ao Genius! Iniciando novo jogo.`);    
    score = 0;

    nextLevel();
}

vGreen.addEventListener('click', () => {click(0)});
vRed.addEventListener('click', () => {click(1)});
vYellow.addEventListener('click', () => {click(2)});
vBlue.addEventListener('click', () => {click(3)});

playGame();