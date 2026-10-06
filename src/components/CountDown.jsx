import { useFadeIn } from "../helper";
import { useState, useEffect } from "react";
import { WEDDING_DATE } from "../helper";

export default function CountdownScreen() {
  const [time, setTime] = useState({ d:"--",h:"--",m:"--",s:"--" });
  const [r1,v1]=useFadeIn(); const [r2,v2]=useFadeIn();
  const [r3,v3]=useFadeIn(); const [r4,v4]=useFadeIn();
  const [r5,v5]=useFadeIn();

  useEffect(() => {
    const update = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) { setTime({d:"00",h:"00",m:"00",s:"00"}); return; }
      const pad = n => String(n).padStart(2,"0");
      setTime({
        d: pad(Math.floor(diff/864e5)),
        h: pad(Math.floor((diff%864e5)/36e5)),
        m: pad(Math.floor((diff%36e5)/6e4)),
        s: pad(Math.floor((diff%6e4)/1e3)),
      });
    };
    update(); const id=setInterval(update,1000); return ()=>clearInterval(id);
  }, []);

  const CdBox = ({num,lbl}) => (
    <div style={{ border:"1.5px solid var(--text)",padding:".6rem .7rem",minWidth:58,textAlign:"center" }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",display:"block",lineHeight:1 }}>{num}</span>
      <span style={{ fontSize:".42rem",letterSpacing:".2em",textTransform:"uppercase",color:"#888",marginTop:4,display:"block" }}>{lbl}</span>
    </div>
  );

  const confetti = [
    {bg:"var(--gold)",top:"18%",left:"8%",d:0},
    {bg:"var(--dark-red)",top:"45%",left:"4%",d:.5,s:4},
    {bg:"var(--gold)",top:"25%",right:"6%",d:1},
    {bg:"#333",top:"55%",right:"4%",d:1.5,s:4},
    {bg:"var(--dark-red)",top:"8%",right:"18%",d:.8,s:4},
    {bg:"var(--gold)",top:"68%",left:"12%",d:.3,s:4},
  ];

  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:"#fff",padding:"2rem",overflowY:"auto" }}>
      <h2 ref={r1} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,8vw,3rem)",fontStyle:"italic",color:"var(--text)",marginBottom:".5rem",opacity:v1?1:0,transform:v1?"translateY(0)":"translateY(24px)",transition:"all .7s" }}>Countdown</h2>
      <div ref={r2} style={{ display:"flex",gap:".65rem",justifyContent:"center",margin:"1rem 0",opacity:v2?1:0,transform:v2?"translateY(0)":"translateY(24px)",transition:"all .7s .1s" }}>
        <CdBox num={time.d} lbl="Days"/> <CdBox num={time.h} lbl="Hours"/>
        <CdBox num={time.m} lbl="Min"/> <CdBox num={time.s} lbl="Sec"/>
      </div>
      <p ref={r3} style={{ fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:"#999",marginBottom:"1.5rem",opacity:v3?1:0,transition:"all .7s .2s" }}>until the big day</p>

      <div ref={r4} style={{ textAlign:"center",width:"100%",maxWidth:300,opacity:v4?1:0,transform:v4?"translateY(0)":"translateY(24px)",transition:"all .7s .3s" }}>
        <p style={{ fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:"#aaa",marginBottom:".75rem" }}>The celebration will take place at</p>
        <div style={{ position:"relative",margin:"0 auto",maxWidth:280 }}>
          <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%"}}>
            <rect x="60" y="55" width="160" height="80" stroke="#333" strokeWidth="1.5"/>
            <polygon points="55,55 140,15 225,55" stroke="#333" strokeWidth="1.5"/>
            <rect x="118" y="95" width="24" height="40" stroke="#333" strokeWidth="1"/>
            <circle cx="139" cy="115" r="2" fill="#333"/>
            <rect x="75" y="65" width="20" height="20" stroke="#333" strokeWidth="1"/>
            <rect x="185" y="65" width="20" height="20" stroke="#333" strokeWidth="1"/>
            <rect x="75" y="95" width="20" height="20" stroke="#333" strokeWidth="1"/>
            <rect x="185" y="95" width="20" height="20" stroke="#333" strokeWidth="1"/>
            <line x1="100" y1="55" x2="100" y2="135" stroke="#333" strokeWidth="1"/>
            <line x1="180" y1="55" x2="180" y2="135" stroke="#333" strokeWidth="1"/>
            <line x1="40" y1="135" x2="240" y2="135" stroke="#333" strokeWidth="1.5"/>
            <rect x="105" y="130" width="70" height="5" stroke="#333" strokeWidth="1"/>
            <line x1="25" y1="135" x2="25" y2="90" stroke="#555" strokeWidth="1.5"/>
            <ellipse cx="25" cy="85" rx="12" ry="15" stroke="#555" strokeWidth="1"/>
            <line x1="255" y1="135" x2="255" y2="90" stroke="#555" strokeWidth="1.5"/>
            <ellipse cx="255" cy="85" rx="12" ry="15" stroke="#555" strokeWidth="1"/>
          </svg>
          {confetti.map((c,i)=>(
            <div key={i} style={{
              position:"absolute",width:c.s||6,height:c.s||6,borderRadius:"50%",background:c.bg,
              top:c.top,left:c.left,right:c.right,
              animation:`floatC 3s ${c.d}s infinite ease-in-out`
            }}/>
          ))}
        </div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.1rem,5vw,1.7rem)",fontStyle:"italic",color:"var(--text)",marginTop:".5rem",lineHeight:1.2 }}>Indiana Convention Center</h3>
        <p style={{ fontSize:".52rem",letterSpacing:".1em",color:"#888",marginTop:".3rem" }}>Jeppina Mogaru, Mangaluru, Karnataka 575002</p>
       <button 
  ref={r5} 
  onClick={() => window.open("https://www.google.com/maps/place/INDIANA+CONVENTION+CENTER/@12.8541128,74.8640793,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba35b9f07ef1f07:0x8fe4cfe13b636e12!8m2!3d12.8541076!4d74.8666542!16s%2Fg%2F11kq9hh4bd?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer")}
  style={{
    marginTop: ".75rem",
    padding: ".45rem 1.1rem",
    background: "var(--dark-red)",
    color: "#fff",
    fontSize: ".52rem",
    letterSpacing: ".15em",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    borderRadius: 2,
    opacity: v5 ? 1 : 0,
    transition: "all .7s .4s"
  }}
>
  Get Directions to Venue →
</button>
      </div>
    </div>
  );
}