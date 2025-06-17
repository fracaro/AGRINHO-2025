let bg;
let emojiX, emojiY;
let speed = 2;
let emoji;

let antennas = [
  { baseX: 117, baseY: 343, topX: 103, topY: 283, moved: false, timer: 0, visiting: false, oldBaseX: 117, oldBaseY: 343 },
  { baseX: 312, baseY: 321, topX: 273, topY: 281, moved: false, timer: 0, visiting: false, oldBaseX: 312, oldBaseY: 321 },
  { baseX: 349, baseY: 116, topX: 386, topY: 102, moved: false, timer: 0, visiting: false, oldBaseX: 349, oldBaseY: 116 },
  { baseX: 337, baseY: 44, topX: 347, topY: 11, moved: false, timer: 0, visiting: false, oldBaseX: 337, oldBaseY: 44 },
  { baseX: 107, baseY: 178, topX: 68, topY: 170, moved: false, timer: 0, visiting: false, oldBaseX: 107, oldBaseY: 178 }
];

let gameWon = false;
let restartButton;

function preload() {
  bg = loadImage('arbustos.jpg');
}

function setup() {
  createCanvas(bg.width, bg.height);
  emoji = "🧑‍🔧";
  emojiX = 53;
  emojiY = 387;

  textAlign(CENTER, CENTER);
  textFont('Arial');

  // Cria o botão, mas esconde inicialmente
  restartButton = createButton('Reiniciar');
  restartButton.position(width / 2 - 40, height / 2 + 50);
  restartButton.mousePressed(resetGame);
  restartButton.hide();
}

function draw() {
  background(bg);

  // Mostrar o emoji de instalador
  textSize(32);
  text(emoji, emojiX, emojiY);

  // Mostrar antenas
  textSize(32);
  for (let ant of antennas) {
    text("📡", ant.baseX, ant.baseY);
  }

  // Verificar se o jogo foi vencido
  if (gameWon) {
    displayWinMessage();
    return;
  }

  // Verificar se está visitando alguma antena
  let isVisiting = antennas.some(ant => ant.visiting);

  // Movimento do instalador se não está visitando
  if (!isVisiting) {
    let dx = mouseX - emojiX;
    let dy = mouseY - emojiY;
    let distToMouse = dist(emojiX, emojiY, mouseX, mouseY);

    if (distToMouse > speed) {
      let angle = atan2(dy, dx);
      let newX = emojiX + cos(angle) * speed;
      let newY = emojiY + sin(angle) * speed;

      let c = bg.get(floor(newX), floor(newY));
      if (c.length >= 3) {
        let r = c[0];
        let g = c[1];
        let b = c[2];

        if (abs(r - 155) < 30 && abs(g - 74) < 30 && abs(b - 74) < 30) {
          emojiX = newX;
          emojiY = newY;
        }
      }
    }
  }

  // Verificar colisão e processo de instalação
  for (let ant of antennas) {
    if (!ant.moved && dist(emojiX, emojiY, ant.baseX, ant.baseY) < 20) {
      ant.oldBaseX = ant.baseX;
      ant.oldBaseY = ant.baseY;

      ant.baseX = ant.topX;
      ant.baseY = ant.topY;

      emojiX = ant.topX;
      emojiY = ant.topY;

      ant.timer = millis();
      ant.moved = true;
      ant.visiting = true;
    }

    if (ant.visiting && millis() - ant.timer >= 1000) {
      emojiX = ant.oldBaseX;
      emojiY = ant.oldBaseY;
      ant.visiting = false;
    }
  }

  // Verificar se todas as antenas foram instaladas
  let allInstalled = antennas.every(ant => ant.moved);
  if (allInstalled) {
    gameWon = true;
    restartButton.show(); // Mostra o botão quando vence
  }
}

// Mostrar mensagem de vitória
function displayWinMessage() {
  push();
  fill('gold');
  stroke(0);
  strokeWeight(4);
  textSize(64);
  text('YOU WIN!', width / 2, height / 2);
  pop();
}

// Função para resetar o jogo
function resetGame() {
  emojiX = 53;
  emojiY = 387;
  gameWon = false;

  for (let ant of antennas) {
    ant.baseX = ant.oldBaseX;
    ant.baseY = ant.oldBaseY;
    ant.moved = false;
    ant.visiting = false;
    ant.timer = 0;
  }

  restartButton.hide();
}
