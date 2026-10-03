import { useState, useEffect, useRef, useCallback } from "react";

export const WEDDING_DATE = new Date("2026-11-22T00:00:00");

/* ── Google Fonts via @import ── */
export const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body,#root{height:100%;width:100%;}
    body{font-family:'Montserrat',sans-serif;background:#FAF8F4;overflow:hidden;}
    :root{
      --gold:#C9A96E;
      --dark-red:#8B1A1A;
      --cream:#FAF8F4;
      --text:#2C2C2C;
    }
    @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(7px);}}
    @keyframes floatC{0%,100%{transform:translateY(0) rotate(0deg);opacity:1;}50%{transform:translateY(-10px) rotate(180deg);opacity:.6;}}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
    @keyframes tickFlip{0%{transform:scaleY(1);}50%{transform:scaleY(0.85);}100%{transform:scaleY(1);}}
    .fade-in{animation:fadeInUp .7s ease forwards;}
  `}</style>
);

/* ── Reusable fade-on-scroll hook ── */
export function useFadeIn() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ════════════════════════════════
   SCREEN 1 – CURTAIN
════════════════════════════════ */


/* ════════════════════════════════
   SCREEN 2 – SCRATCH
════════════════════════════════ */


/* ════════════════════════════════
   SCREEN 3 – COUNTDOWN
════════════════════════════════ */


/* ════════════════════════════════
   SCREEN 4 – DRESS CODE
════════════════════════════════ */


/* ════════════════════════════════
   MAIN APP – MOBILE SHELL
════════════════════════════════ */

