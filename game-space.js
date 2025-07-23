export function start(canvas) {
  const ctx = canvas.getContext("2d");
  let ship = { x: canvas.width / 2, y: canvas.height - 50 };
  let bullets = [];
  let asteroids = [];
  let score = 0;

  document.onkeydown = (e) => {
    if (e.key === "ArrowLeft") ship.x -= 10;
    if (e.key === "ArrowRight") ship.x += 10;
    if (e.key === " ") bullets.push({ x: ship.x + 12, y: ship.y - 10 });
  };

  function spawnAsteroid() {
    asteroids.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: 20 + Math.random() * 30,
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ship
    ctx.fillStyle = "lime";
    ctx.fillRect(ship.x, ship.y, 30, 30);

    // Bullets
    ctx.fillStyle = "yellow";
    bullets.forEach((b, i) => {
      b.y -= 5;
      ctx.fillRect(b.x, b.y, 5, 10);
      if (b.y < 0) bullets.splice(i, 1);
    });

    // Asteroids
    ctx.fillStyle = "gray";
    asteroids.forEach((a, i) => {
      a.y += 2;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
      ctx.fill();

      // Check collision with bullet
      bullets.forEach((b, j) => {
        if (
          b.x > a.x - a.size &&
          b.x < a.x + a.size &&
          b.y > a.y - a.size &&
          b.y < a.y + a.size
        ) {
          asteroids.splice(i, 1);
          bullets.splice(j, 1);
          score += 10;
        }
      });

      // Game Over check
      if (a.y > canvas.height) {
        score = 0;
        asteroids = [];
        bullets = [];
      }
    });

    // Score
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(loop);
  }

  setInterval(spawnAsteroid, 1000);
  loop();
}
