import React, { useRef, useEffect, useState } from "react";

// Neon cyan color from your navbar
const NEON_CYAN = "#22d3ee";
const STAR_COLOR = "#fff";
const STAR_GLOW = NEON_CYAN;
const STAR_COUNT = 80;
const STAR_SIZE = 1.2;
const STATICITY = 60;
const EASE = 40;
const SHOOTING_STAR_COUNT = 3;

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function randomCircle(canvasW, canvasH) {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH,
    tx: 0,
    ty: 0,
    size: Math.random() * .2 + STAR_SIZE,
    alpha: 0,
    targetAlpha: Math.random() * 0.7 + 0.3,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: 0.5 + Math.random() * 2.5,
    neon: Math.random() > 0.5, // half neon, half white
  };
}

function randomShootingStar(w, h) {
  // Only left-to-right or diagonal (not from top or bottom)
  const fromLeft = Math.random() > 0.5;
  const y = Math.random() * h * 0.8 + h * 0.1; // avoid extreme top/bottom
  return {
    x: fromLeft ? -40 : w + 40,
    y,
    // vx positive if from left, negative if from right
    vx: fromLeft ? (2.5 + Math.random() * 2) : -(2.5 + Math.random() * 2),
    vy: (Math.random() - 0.5) * 2, // slight up/down for diagonal
    len: 80 + Math.random() * 100,
    alpha: 0,
    life: 0,
    maxLife: 200 + Math.random() * 100,
    delay: 400 + Math.random() * 1000, // reduced delay between shooting stars
    waiting: true,
    waitCount: 0,
  };
}

const Starfield = ({
  quantity = STAR_COUNT,
  color = STAR_COLOR,
  staticity = STATICITY,
  ease = EASE,
  size = STAR_SIZE,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const circles = useRef([]);
  const context = useRef(null);
  const shootingStars = useRef([]);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const mouse = useMousePosition();
  const dpr = window.devicePixelRatio || 1;
  const rgbWhite = hexToRgb(STAR_COLOR);
  const rgbNeon = hexToRgb(STAR_GLOW);

  // Resize and initialize
  useEffect(() => {
    function resize() {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      setDimensions({ w, h });
      if (canvasRef.current) {
        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        context.current = canvasRef.current.getContext("2d");
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      // Reset stars
      circles.current = [];
      for (let i = 0; i < quantity; i++) {
        circles.current.push(randomCircle(w, h));
      }
      // Initialize shooting stars
      shootingStars.current = [];
      for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
        shootingStars.current.push(randomShootingStar(w, h));
      }
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line
  }, [quantity, size, color]);

  // Animation loop
  useEffect(() => {
    let running = true;
    function animate() {
      if (!context.current) return;
      context.current.clearRect(0, 0, dimensions.w, dimensions.h);
      circles.current.forEach((star, i) => {
        // Animate alpha
        if (star.alpha < star.targetAlpha) {
          star.alpha += 0.02;
        } else {
          star.alpha = star.targetAlpha;
        }
        // Animate position
        star.x += star.dx;
        star.y += star.dy;
        // Parallax effect
        const mx = mouse.x - dimensions.w / 2;
        const my = mouse.y - dimensions.h / 2;
        star.tx += ((mx / (staticity / star.magnetism)) - star.tx) / ease;
        star.ty += ((my / (staticity / star.magnetism)) - star.ty) / ease;

        // Draw sharp, glowing star
        context.current.save();
        context.current.beginPath();
        context.current.arc(
          star.x + star.tx,
          star.y + star.ty,
          star.size,
          0,
          2 * Math.PI
        );
        // Draw a sharp white core
        context.current.fillStyle = `rgba(${rgbWhite[0]},${rgbWhite[1]},${rgbWhite[2]},${star.alpha})`;
        context.current.shadowColor = star.neon
          ? `rgba(${rgbNeon[0]},${rgbNeon[1]},${rgbNeon[2]},0.9)`
          : `rgba(${rgbWhite[0]},${rgbWhite[1]},${rgbWhite[2]},0.7)`;
        context.current.shadowBlur = star.neon ? 18 : 8;
        context.current.fill();
        context.current.restore();

        // Respawn if out of bounds
        if (
          star.x + star.tx < -star.size ||
          star.x + star.tx > dimensions.w + star.size ||
          star.y + star.ty < -star.size ||
          star.y + star.ty > dimensions.h + star.size
        ) {
          circles.current[i] = randomCircle(dimensions.w, dimensions.h);
        }
      });

      // Draw shooting stars
      shootingStars.current.forEach((shoot, i) => {
        if (shoot.waiting) {
          shoot.waitCount++;
          if (shoot.waitCount > shoot.delay) {
            shoot.waiting = false;
            shoot.life = 0;
            shoot.alpha = 1;
          }
          return;
        }
        // Draw the shooting star as a glowing line
        context.current.save();
        context.current.globalAlpha = shoot.alpha;
        const grad = context.current.createLinearGradient(
          shoot.x, shoot.y,
          shoot.x - shoot.vx * shoot.len, shoot.y - shoot.vy * shoot.len
        );
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.2, "#22d3ee");
        grad.addColorStop(1, "rgba(34,211,238,0)");
        context.current.strokeStyle = grad;
        context.current.lineWidth = 2.2;
        context.current.shadowColor = "#22d3ee";
        context.current.shadowBlur = 12;
        context.current.beginPath();
        context.current.moveTo(shoot.x, shoot.y);
        context.current.lineTo(
          shoot.x - shoot.vx * shoot.len,
          shoot.y - shoot.vy * shoot.len
        );
        context.current.stroke();
        context.current.restore();

        // Move shooting star
        shoot.x += shoot.vx * 2.5;
        shoot.y += shoot.vy * 2.5;
        shoot.life++;
        shoot.alpha *= 0.97;

        // If out of bounds or faded, respawn after delay
        if (
          shoot.x > dimensions.w + 60 ||
          shoot.y > dimensions.h + 60 ||
          shoot.alpha < 0.05 ||
          shoot.life > shoot.maxLife
        ) {
          shootingStars.current[i] = randomShootingStar(dimensions.w, dimensions.h);
        }
      });

      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
    // eslint-disable-next-line
  }, [dimensions, mouse.x, mouse.y, color, staticity, ease, size, quantity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
      style={{ background: "#0a0417" }} // black background
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default Starfield;