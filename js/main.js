// https://www.go-next.co.jp/blog/web/20094/#html

//------------------------------
//桜吹雪
//------------------------------

// forked from kanariia1's "forked: 桜吹雪" http://jsdo.it/kanariia1/vOcE
// forked from njf's "桜吹雪" http://jsdo.it/njf/alFS
function Particle() {
}

Particle.prototype.x = 0;
Particle.prototype.y = 0;
Particle.prototype.velX = 0;
Particle.prototype.velY = 0;
Particle.prototype.rad = 0;
Particle.prototype.w = 0;
Particle.prototype.time = 0;
Particle.prototype.zrot = 0;
Particle.prototype.zrotW = 0;
Particle.prototype.scale = 1;

let stageX = 445;
let stageY = 445;

let mainCanvasContext;

let particles = [];

let windVelX = 0;
let windVelY = 0;

let image = new Image();
image.src = "img/sakura_hana.png";//花びらの画像
function initParitcle(initP) {
  initP.w = 0.4 * (0.5 - Math.random());
  initP.rad = Math.PI * Math.random();
  initP.velY = Math.random() * 3 + 7;
  initP.velX = (0.5 - Math.random()) * 10;
  initP.zrot = Math.PI * Math.random();
  initP.zrotW = (0.5 - Math.random()) / 10;
  initP.scale = (1.1 - Math.random()) * 1.5;//花びらの大きさ｜デフォ4.5
  initP.time = 0;

}

function init() {
  for (let i = 0; i < 50; i++) {//花びらの数
    let p = new Particle();
    initParitcle(p);
    p.y = (1.1 - 1.2 * Math.random()) * stageY;
    p.x = Math.random() * stageX;

    particles.push(p);
  }
}


function sortParticle(p1, p2) {
  return (p1.scale - p2.scale);
}


function timerFunc() {
  mainCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
  //mainCanvasContext.fillStyle = 'rgba(86, 14, 17, 0.4)';
  mainCanvasContext.fillRect(0, 0, stageX, stageY);
  mainCanvasContext.clearRect(0, 0, stageX, stageY);
  particles.sort(sortParticle);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let rad = p.rad;
    mainCanvasContext.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), p.x + image.width * 0.5, p.y + image.height * 0.5);
    let s = Math.sin(p.zrot);
    let c = Math.cos(p.zrot);
    mainCanvasContext.scale(p.scale * s, p.scale * c);
    mainCanvasContext.drawImage(image,
      0, 0,
      image.width, image.height,
      -image.width * 0.5, -image.height * 0.5,
      image.width, image.height
    );
    p.time++;
    p.x += (p.velX + windVelX) * (p.scale / 3);
    p.y += (p.velY + windVelY) * (Math.abs(p.scale) / 3);
    p.rad += p.w;
    p.zrot += p.zrotW;
    if (p.rad > Math.PI) {
      p.rad = -Math.PI;
    } else if (p.rad < -Math.PI) {
      p.rad = Math.PI;
    }
    let ts = image.width * Math.abs(p.scale);
    if (p.y > stageY + ts || p.x < -ts || p.x > ts + stageX) {
      initParitcle(p);
      ts = image.width * Math.abs(p.scale);
      if (p.y > stageY + ts) {
        p.y = -ts;
        p.x = Math.random() * stageX;
      } else {
        if ((p.velX + windVelX) * (p.scale / 3) > 0) {
          p.x = -ts;
        } else {
          p.x = stageX + ts;
        }
      }

    }

  }

}


window.onload = () => {
  //レイヤー（桜吹雪）
  let canvas = document.getElementById('canv');

  mainCanvasContext = canvas.getContext("2d");

  // canvas3.width = 800;
  // canvas3.height = 1000;

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";

  stageX = canvas.width;
  stageY = canvas.height;
  init();

  let timer = setInterval(timerFunc, 30);
};

