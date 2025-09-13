// matrix.js - creates canvas #matrixBackground and runs matrix animation
(function () {
  let canvas = document.getElementById("matrixBackground");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "matrixBackground";
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
    display: "block"
  });

  const ctx = canvas.getContext("2d", { alpha: true });
  let columns, drops;
  const fontSize = 14;
  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$%#@*&^abcdefghijklmnopqrstuvwxyz0123456789";
  const arr = chars.split("");
  const bgFade = "rgba(0,0,0,0.12)";
  const headColor = "#b9ffce";
  const mainColor = "#00ff88";

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Math.floor(window.innerWidth / fontSize) + 1;
    drops = new Array(columns).fill(0).map(() => Math.random() * window.innerHeight);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  let last = performance.now();
  const fpsInterval = 1000 / 45;
  function draw(now) {
    requestAnimationFrame(draw);
    const elapsed = now - last;
    if (elapsed < fpsInterval) return;
    last = now - (elapsed % fpsInterval);

    ctx.fillStyle = bgFade;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    for (let i = 0; i < drops.length; i++) {
      const x = i * fontSize;
      const y = drops[i];

      const ch = arr[Math.floor(Math.random() * arr.length)];
      ctx.fillStyle = headColor;
      ctx.fillText(ch, x, y);

      ctx.fillStyle = mainColor;
      for (let s = 1; s < 4; s++) {
        const ny = y + s * fontSize;
        ctx.globalAlpha = Math.max(0, 1 - s * 0.25);
        const ch2 = arr[Math.floor(Math.random() * arr.length)];
        ctx.fillText(ch2, x, ny);
      }
      ctx.globalAlpha = 1;
      drops[i] = y > window.innerHeight + Math.random() * 1000 ? 0 : y + fontSize * (0.4 + Math.random() * 0.9);
    }
  }
  requestAnimationFrame(draw);
})();
