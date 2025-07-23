export function start(canvas) {
  const ctx = canvas.getContext("2d");
  let p1 = { x: 100, y: 250, color: "red" };
  let p2 = { x: 700, y: 250, color: "blue" };
  const speed = 5;

  document.onkeydown = (e) => {
    switch (e.key) {
      case "w": p1.y -= speed; break;
      case "s": p1.y += speed; break;
      case "a": p1.x -= speed; break;
      case "d": p1.x += speed; break;
      case "ArrowUp": p2.y -= speed; break;
      case "ArrowDown": p2.y += speed; break;
      case "ArrowLeft": p2.x -= speed; break;
      case "ArrowRight": p2.x += speed; break;
    }
  };

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = p1.color;
    ctx.fillRect(p1.x, p1.y, 30, 30);
    ctx.fillStyle = p2.color;
    ctx.fillRect(p2.x, p2.y, 30, 30);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("2-Player Duel: W/A/S/D vs Arrow Keys", 250, 30);
    requestAnimationFrame(loop);
  }

  loop();
}
