(() => {
  "use strict";

  // Дата рождения: 31 августа 2026, 00:00 по UTC+9 (Токио/Осака)
  const TARGET_DATE = new Date("2026-08-31T00:00:00+09:00");

  const sky = document.getElementById("sky");
  const countdownEl = document.getElementById("countdown");
  const celebrationEl = document.getElementById("celebration");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const prev = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function setUnit(el, key, value) {
    const text = pad(value);
    if (el.textContent !== text) {
      el.textContent = text;
      if (prev[key] !== null) {
        el.classList.remove("pop");
        // force reflow to restart animation
        void el.offsetWidth;
        el.classList.add("pop");
      }
      prev[key] = value;
    }
  }

  let celebrated = false;
  let confettiInterval = null;
  let fireworkInterval = null;

  function tick() {
    const now = new Date();
    const diff = TARGET_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      setUnit(daysEl, "days", 0);
      setUnit(hoursEl, "hours", 0);
      setUnit(minutesEl, "minutes", 0);
      setUnit(secondsEl, "seconds", 0);
      celebrationEl.hidden = false;
      if (!celebrated) {
        celebrated = true;
        document.title = "С Днём Рождения, Ангелина! 🎂";
        burstConfetti(260);
        launchFirework();
        launchFirework();
        launchFirework();
        confettiInterval = setInterval(() => burstConfetti(45), 1000);
        fireworkInterval = setInterval(() => {
          launchFirework();
          if (Math.random() < 0.6) launchFirework();
        }, 850);
      }
      return;
    }

    if (celebrated) {
      celebrated = false;
      celebrationEl.hidden = true;
      document.title = "Скоро день рождения Ангелины 🎈";
      if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
      }
      if (fireworkInterval) {
        clearInterval(fireworkInterval);
        fireworkInterval = null;
      }
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setUnit(daysEl, "days", days);
    setUnit(hoursEl, "hours", hours);
    setUnit(minutesEl, "minutes", minutes);
    setUnit(secondsEl, "seconds", seconds);
  }

  tick();
  setInterval(tick, 1000);

  // ---------- floating decorations ----------
  const EMOJIS = ["🎈", "💖", "✨", "🎉", "🎂", "🌸", "🦋"];

  function spawnFloaty() {
    const el = document.createElement("div");
    el.className = "floaty";
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const size = 1.4 + Math.random() * 1.8;
    const drift = (Math.random() * 120 - 60) + "px";
    el.style.left = left + "vw";
    el.style.fontSize = size + "rem";
    el.style.setProperty("--drift", drift);
    el.style.animationDuration = duration + "s";
    sky.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000 + 200);
  }

  function spawnSparkle() {
    const el = document.createElement("div");
    el.className = "sparkle";
    el.textContent = "✨";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.animationDuration = 2 + Math.random() * 2.5 + "s";
    el.style.animationDelay = Math.random() * 2 + "s";
    sky.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(spawnFloaty, i * 900);
  }
  setInterval(spawnFloaty, 1500);

  for (let i = 0; i < 14; i++) spawnSparkle();
  setInterval(spawnSparkle, 900);

  // ---------- confetti burst ----------
  const CONFETTI_COLORS = ["#ff9ecb", "#ff6fa5", "#c9a7ff", "#ffd3b0", "#fff2c0", "#a7e8bd"];

  function burstConfetti(count) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const size = 6 + Math.random() * 8;
      el.style.left = Math.random() * 100 + "vw";
      el.style.width = size + "px";
      el.style.height = size * 0.4 + "px";
      el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const duration = 2.6 + Math.random() * 2;
      el.style.animationDuration = duration + "s";
      el.style.animationDelay = Math.random() * 0.6 + "s";
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (duration + 1) * 1000);
    }
  }

  // ---------- fireworks ----------
  const FIREWORK_COLORS = ["#ff6fa5", "#ff9ecb", "#c9a7ff", "#ffd3b0", "#fff2c0", "#a7e8bd", "#7fd8ff"];

  function launchFirework() {
    const originX = 8 + Math.random() * 84;
    const originY = 10 + Math.random() * 38;
    const particleCount = 26 + Math.floor(Math.random() * 14);
    const baseColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
      const distance = 55 + Math.random() * 70;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      const p = document.createElement("div");
      p.className = "firework-particle";
      p.style.left = originX + "vw";
      p.style.top = originY + "vh";
      p.style.setProperty("--dx", dx + "px");
      p.style.setProperty("--dy", dy + "px");
      p.style.background = Math.random() < 0.6
        ? baseColor
        : FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      const duration = 0.8 + Math.random() * 0.6;
      p.style.animationDuration = duration + "s";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), duration * 1000 + 120);
    }
  }
})();
