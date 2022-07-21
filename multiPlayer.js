//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha 
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("sons/raquetada.mp3");
  ponto = loadSound("sons/ponto.mp3");
  trilha = loadSound("sons/trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  line(0, 0, width, height);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaLimites();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  bolinhaNaoFicaPresa();
  verificaColisaoRaquete(xRaquete, yRaquete);  
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);  
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaLimites(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
} 

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    if (yRaquete > 0){
      yRaquete -= 10;
    }
  }

  if (keyIsDown(DOWN_ARROW)){
    if (yRaquete + raqueteAltura < height){
      yRaquete += 10;
    }
  }
}

/* function verificaColisaoRaquete(){
  if((xBolinha - raio < xRaquete + raqueteComprimento) && (yBolinha - raio < yRaquete + raqueteAltura) && (yBolinha + raio > yRaquete)){
    velocidadeXBolinha *= -1;
  }
} */

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);

  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    if (yRaqueteOponente > 0){
      yRaqueteOponente -= 10;
    }
  }

  if (keyIsDown(83)){
    if (yRaqueteOponente + raqueteAltura < height){
      yRaqueteOponente += 10;
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;    
    ponto.play();
  }

  if(xBolinha < 10){
    pontosOponente += 1;  
    ponto.play();  
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
  console.log('bolinha ficou presa');
  xBolinha = 300;
  }
}
