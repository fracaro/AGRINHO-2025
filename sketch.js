let imagemdefundo;

let xJogador=200;
let yJogador=200;
let jogador =["👨‍🔧"] ;

let teclas = ["w","a","s","d"]


//mover
let speed = 2;
let colorvalue = "#9b4a4a";

function preload(){
  imagemdefundo=loadImage("arbustos.jpg");
}

function setup() {
  createCanvas(400, 400);
   
}

function draw() {
  fill(colorvalue);
  x =+speed;
  if (x >width || x <0){
    speed= -speed;
  }
     image(imagemdefundo, 0, 0, 400, 400);
     
    textSize(50);
    text("🧑‍🔧", xJogador ,yJogador);
  
}

