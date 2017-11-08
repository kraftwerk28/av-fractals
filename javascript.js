'use strict';

const canvas = document.getElementById('main-canv');
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext('2d');

window.onload = () => {
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'chartreuse';
}

const start = () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  serpSquare(canvas.width / 2, canvas.height / 2, 200, 200);
}

const randomDraw = () => {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  // ctx.lineTo(x, y);
  ctx.quadraticCurveTo(y, x, x, y);
  ctx.stroke();
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

  if (width > 400 / Math.pow(2, document.getElementById('txt-iters').value)) {
    serpSquare(cx1, cy1, w, h);
    serpSquare(cx2, cy2, w, h);
    serpSquare(cx3, cy3, w, h);
    serpSquare(cx4, cy4, w, h);
  }
}
