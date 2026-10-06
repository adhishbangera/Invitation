
import { useFadeIn } from "../helper";
import { useState, useEffect, useRef, useCallback } from "react";
function ScratchCoin({ label, value, onReveal }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const painting = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const r = canvas.width / 2;
    ctx.beginPath(); ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fillStyle = "#C4962A"; ctx.fill();
    for (let i = 0; i < 250; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 90, Math.random() * 90, Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random() > .5 ? "180,120,30" : "210,160,60"},.5)`; ctx.fill();
    }
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => { if (revealed && onReveal) onReveal(); }, [revealed, onReveal]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x:(src.clientX-rect.left)*(canvas.width/rect.width), y:(src.clientY-rect.top)*(canvas.height/rect.height) };
  };

  const scratch = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const {x,y} = getPos(e, canvas);
    ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI*2); ctx.fill();
    const data = ctx.getImageData(0,0,90,90).data;
    let cleared = 0;
    for (let i=3;i<data.length;i+=4) if(data[i]<128) cleared++;
    if (cleared/(data.length/4) > 0.55) setRevealed(true);
  }, []);

  return (
    <div style={{ position:"relative",width:90,height:90,flexShrink:0 }}>
      {/* Background gold coin */}
      <div style={{
        position:"absolute",inset:0,borderRadius:"50%",
        background:"radial-gradient(circle at 35% 35%,#E8C97A,#B8882A,#8B6014)",
        boxShadow:"0 4px 20px rgba(0,0,0,.25)",
        display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"
      }}>
        <div style={{ position:"absolute",inset:6,borderRadius:"50%",border:"2px solid rgba(255,255,255,.3)" }}/>
        <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",color:"var(--dark-red)",lineHeight:1 }}>{value}</span>
        <span style={{ fontSize:".42rem",letterSpacing:".15em",textTransform:"uppercase",color:"#888",marginTop:2 }}>{label}</span>
      </div>
      {/* Scratch canvas */}
      <canvas
        ref={canvasRef} id={`coin-${label}`} width={90} height={90}
        style={{ position:"absolute",inset:0,borderRadius:"50%",cursor:"pointer",
          opacity: revealed ? 0 : 1, transition:"opacity .5s", touchAction:"none" }}
        onMouseDown={()=>painting.current=true}
        onMouseUp={()=>painting.current=false}
        onMouseMove={e=>{ if(painting.current) scratch(e); }}
        onTouchStart={e=>{painting.current=true;scratch(e);}}
        onTouchEnd={()=>painting.current=false}
        onTouchMove={scratch}
      />
    </div>
  );
}

export default function ScratchScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const onReveal = useCallback(() => setCount(c => c + 1), []);
  useEffect(() => { if (count === 3 && onComplete) onComplete(); }, [count, onComplete]);
  const [r1,v1]=useFadeIn(); const [r2,v2]=useFadeIn();
  const [r3,v3]=useFadeIn(); const [r4,v4]=useFadeIn();
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:"var(--cream)",padding:"2rem",textAlign:"center" }}>
      <div ref={r1} style={{ fontSize:"2rem",marginBottom:".5rem",opacity:v1?1:0,transform:v1?"translateY(0)":"translateY(20px)",transition:"all .7s" }}>🪙</div>
      <p ref={r2} style={{ fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"#999",marginBottom:".4rem",opacity:v2?1:0,transform:v2?"translateY(0)":"translateY(20px)",transition:"all .7s .1s" }}>Scratch all three coins to continue</p>
      <h2 ref={r3} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,10vw,4rem)",fontStyle:"italic",color:"var(--text)",marginBottom:"2rem",opacity:v3?1:0,transform:v3?"translateY(0)":"translateY(20px)",transition:"all .7s .2s" }}>Reveal</h2>
      <div ref={r4} style={{ display:"flex",gap:"1.5rem",justifyContent:"center",flexWrap:"wrap",opacity:v4?1:0,transform:v4?"translateY(0)":"translateY(20px)",transition:"all .7s .3s" }}>
        <ScratchCoin label="Day" value="25" onReveal={onReveal}/>
        <ScratchCoin label="Month" value="Nov" onReveal={onReveal}/>
        <ScratchCoin label="Year" value="2026" onReveal={onReveal}/>
      </div>
      <p style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"clamp(1.5rem,6vw,2rem)",color:"var(--text)",marginTop:"2rem" }}>We are getting married</p>
    </div>
  );
}