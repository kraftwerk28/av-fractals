'use strict';

//#region graphics
const canvas = document.getElementById('main-canv');
canvas.width = 500;
canvas.height = 500;
const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext('2d');
const slider = document.getElementById('angle-slider');
const textfield = document.getElementById('txt-iters');

const offsetX = document.getElementById('x-offset');
const offsetY = document.getElementById('y-offset');
const zoom = document.getElementById('zoom');

const dropdown = document.getElementById('dropdown');
//#endregion

const pi = Math.PI;
const distance = (a, b) => Math.abs(a - b);
const map = (x, begin1, end1, begin2, end2) => {
  return ((x - begin1) / (end1 - begin1)) * (end2 - begin2) + begin2;
}
function Point(x, y) {
  this.x = x;
  this.y = y;
};

const degree = Math.PI / 180;

window.onload = () => {
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

}

const start = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  // serpSquare(canvas.width / 2, canvas.height / 2, 200, 200);
  // fracTree(canvas.width / 2, canvas.height, 45 * degree, 100);
  // serpTriangle(20, 20, 1200 / 2, 1200 - 20, 1200 - 20, 20);
  // mandelbrotSet();

  switch (dropdown.value) {
    case '0':
      randomDraw();
      break;
    case '1':
      serpSquare(width / 2, height / 2, 200, 200);
      break;
    case '2':
      serpTriangle(20, 20, width / 2, height - 20, width - 20, 20);
      break;
    case '3':
      mandelbrotSet();
      break;
  }
}

const randomDraw = () => {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  // ctx.lineTo(x, y);
  // ctx.quadraticCurveTo(y, x, x, y);
  ctx.fillRect(x, y, 1, 1);
  // ctx.stroke();
}

const serpSquare = (centerX, centerY, width, height) => {
  ctx.strokeRect(centerX - Math.floor(width / 2), centerY - Math.floor(height / 2), width, height);
  // ctx.stroke();
  let cx1 = centerX - Math.floor(width / 2);
  let cx2 = centerX + Math.floor(width / 2);
  let cx3 = centerX - Math.floor(width / 2);
  let cx4 = centerX + Math.floor(width / 2);

  let cy1 = centerY - Math.floor(height / 2);
  let cy2 = centerY - Math.floor(height / 2);
  let cy3 = centerY + Math.floor(height / 2);
  let cy4 = centerY + Math.floor(height / 2);

  let w = Math.floor(width / 2);
  let h = Math.floor(height / 2);

  if (width > canvas.width / Math.pow(2, textfield.value)) {
    serpSquare(cx1, cy1, w, h);
    serpSquare(cx2, cy2, w, h);
    serpSquare(cx3, cy3, w, h);
    serpSquare(cx4, cy4, w, h);
  }
}

const fracTree = (startX, startY, angle, length) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.rotate(slider.value);
  ctx.lineTo(startX, startY - length);
  ctx.stroke();
  console.log(slider.value);
  ctx.rotate(-slider.value);
}

const serpTriangle = (x1, y1, x2, y2, x3, y3) => {
  ctx.strokeStyle = 'white';
  const averPoint = (x1, x2) => Math.round((x1 + x2) / 2);

  // ctx.beginPath();
  ctx.moveTo(x3, y3);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  let ax1 = averPoint(x1, x2);
  let ay1 = averPoint(y1, y2);

  let ax2 = averPoint(x2, x3);
  let ay2 = averPoint(y2, y3);

  let ax3 = averPoint(x1, x3);
  let ay3 = averPoint(y1, y3);

  if (distance(x1, x2) > width / Math.pow(2, textfield.value)) {
    serpTriangle(x1, y1, ax1, ay1, ax3, ay3);
    serpTriangle(ax1, ay1, x2, y2, ax2, ay2);
    serpTriangle(ax2, ay2, x3, y3, ax3, ay3);
  }
}

const mandelbrotSet = () => {
  let halfwidth = Math.round(width / 2);
  let halfheight = Math.round(height / 2);

  let iters = textfield.value;

  ctx.translate(halfwidth, halfheight);
  function Complex(real, imagine) {
    this.a = real;
    this.b = imagine;
  }
  let x = 0;
  let y = 0;

  let a = 0;
  let b = 0;


  for (x = -halfwidth; x < halfwidth; x++) {
    for (y = -halfheight; y < halfheight; y++) {
      let n = 0;

      // a = map(x, -halfwidth, halfwidth, offsetX.value, offsetX.value + zoom.value);
      // b = map(y, -halfheight, halfheight, offsetY.value, offsetY.value + zoom.value);

      a = map(x, -halfwidth, halfwidth, -2, 2);
      b = map(y, -halfheight, halfheight, -2, 2);

      let stata = a;
      let statb = b;

      while (n < iters) {
        let aa = a * a - b * b;
        let bb = slider.value * a * b;
        a = aa + stata;
        b = bb + statb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      let br = map(n, 0, iters, 0, 1);
      if (n >= iters) {
        br = 0;
      }
      ctx.fillStyle = 'rgba(255, 255, 255, ' + br + ')';
      // ctx.fillStyle = 'rgb(' + br + ', ' + br + ', ' + br + ')';
      ctx.fillRect(x, y, 1, 1);
    }
    console.log(x);
  }
  ctx.translate(-halfwidth, -halfheight);
}
