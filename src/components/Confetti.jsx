import { useEffect, useRef } from "react";

const COLORS = ["#B3201F", "#D4AF70", "#F5E6C4", "#E8607A", "#8B1A1A", "#C9A24D"];

// Confetti rains from the top of the screen each time `fire` turns true.
export default function Confetti({ fire }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  // Stop only on unmount, so pieces keep falling if the user scrolls away mid-burst.
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  useEffect(() => {
    if (!fire) return;
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const parts = [];
    const spawn = () => ({
      x: Math.random() * w, y: -20 - Math.random() * 40,
      vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3,
      s: 6 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: COLORS[(Math.random() * COLORS.length) | 0], round: Math.random() < .3,
      wob: Math.random() * 6,
    });
    const start = performance.now();
    const tick = (now) => {
      const emitting = now - start < 2500;
      if (emitting) for (let i = 0; i < 3; i++) parts.push(spawn());
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.wob += .06; p.x += p.vx + Math.sin(p.wob) * .9; p.y += p.vy; p.r += p.vr;
        if (p.y > h + 20) { parts.splice(i, 1); continue; }
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 7); ctx.fill(); }
        else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (emitting || parts.length) rafRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [fire]);

  return <canvas ref={canvasRef} style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:50,pointerEvents:"none" }}/>;
}
