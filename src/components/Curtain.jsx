import { useState, useEffect } from "react";
export default function CurtainScreen() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOpen(true), 500); return () => clearTimeout(t); }, []);

  const Pleats = () => (
    <div style={{ position:"absolute",inset:0,display:"flex",gap:6,padding:"0 8px" }}>
      {[...Array(6)].map((_,i) => (
        <div key={i} style={{
          flex:1,
          background:"linear-gradient(90deg,rgba(255,255,255,.18) 0%,transparent 50%,rgba(0,0,0,.18) 100%)",
          borderRadius:"50%"
        }}/>
      ))}
    </div>
  );

  const curtainStyle = (side) => ({
    width:"50%", height:"100%", background:"var(--dark-red)",
    position:"absolute", top:0,
    [side === "left" ? "left" : "right"]: 0,
    transform: open
      ? `translateX(${side === "left" ? "-100%" : "100%"})`
      : "translateX(0)",
    transition:"transform 1.3s cubic-bezier(.77,0,.18,1)",
    overflow:"hidden",
    zIndex:2,
  });

  return (
    <div style={{ position:"relative",width:"100%",height:"100%",background:"var(--cream)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
      {/* Left curtain */}
      <div style={curtainStyle("left")}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:24,background:"linear-gradient(180deg,#6B1111,#8B1A1A)",zIndex:2 }}/>
        <div style={{ position:"absolute",top:6,left:0,right:0,display:"flex",justifyContent:"space-around",zIndex:3 }}>
          {[...Array(5)].map((_,i)=><div key={i} style={{width:10,height:14,border:"2px solid #D4AF70",borderRadius:"50%"}}/>)}
        </div>
        <Pleats/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:36,
          background:"repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 3px,transparent 3px,transparent 8px)",
          opacity:.5 }}/>
      </div>

      {/* Right curtain */}
      <div style={curtainStyle("right")}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:24,background:"linear-gradient(180deg,#6B1111,#8B1A1A)",zIndex:2 }}/>
        <div style={{ position:"absolute",top:6,left:0,right:0,display:"flex",justifyContent:"space-around",zIndex:3 }}>
          {[...Array(5)].map((_,i)=><div key={i} style={{width:10,height:14,border:"2px solid #D4AF70",borderRadius:"50%"}}/>)}
        </div>
        <Pleats/>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:36,
          background:"repeating-linear-gradient(90deg,var(--gold) 0,var(--gold) 3px,transparent 3px,transparent 8px)",
          opacity:.5 }}/>
      </div>

      {/* Content */}
      <div style={{ position:"relative",zIndex:1,textAlign:"center",padding:"2rem",
        opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(20px)",
        transition:"opacity .8s .6s, transform .8s .6s" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,11vw,4rem)",whiteSpace:"nowrap",fontStyle:"italic",fontWeight:300,color:"var(--text)",lineHeight:1.1 }}>
          Adhish Bangera<br/>
          <span style={{ fontSize:"clamp(2rem,10vw,4rem)",color:"var(--gold)" }}>&</span><br/>
          Shanmuka Priya
        </div>
        <p style={{ marginTop:"1.5rem",fontSize:"clamp(0.55rem,2.8vw,.75rem)",letterSpacing:".15em",textTransform:"uppercase",color:"#666",lineHeight:1.9,maxWidth:280 }}>
          We would like to invite you to celebrate with us on the happiest day of our lives. It will be an important moment.
        </p>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute",bottom:"1.5rem",left:"50%",fontSize:".6rem",letterSpacing:".2em",color:"#aaa",textTransform:"uppercase",animation:"bounce 2s infinite",zIndex:10 }}>
        ↓ scroll
      </div>
    </div>
  );
}
