import { useState, useEffect, useRef, useCallback } from "react";
import CurtainScreen from "./components/Curtain";
import ScratchScreen from "./components/ScratchCoin";
import CountdownScreen from "./components/CountDown";
import DressCodeScreen from "./components/DressCode";
import { GlobalStyle } from "./helper";

const screens = [
  { id:"curtain",  comp:<CurtainScreen/> },
  { id:"scratch",  comp:<ScratchScreen/> },
  { id:"countdown",comp:<CountdownScreen/> },
  { id:"dresscode",comp:<DressCodeScreen/> },
];

export default function App() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const scrolling = useRef(false);

  const goTo = useCallback((i) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior:"smooth" });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (scrolling.current) return;
      const i = Math.round(el.scrollTop / el.clientHeight);
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive:true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlobalStyle/>
      {/* Mobile phone outer shell */}
      <div style={{
        width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
        background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
      }}>
        {/* Phone frame */}
        <div style={{
          width:"min(390px,96vw)",
          height:"min(844px,96vh)",
          background:"#111",
          borderRadius:44,
          boxShadow:"0 40px 100px rgba(0,0,0,.7),0 0 0 2px #333,inset 0 0 0 2px #222",
          position:"relative",
          overflow:"hidden",
          display:"flex",
          flexDirection:"column",
        }}>
          {/* Notch */}
          <div style={{
            position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
            width:120,height:34,background:"#111",borderRadius:"0 0 20px 20px",zIndex:100,
            display:"flex",alignItems:"center",justifyContent:"center",gap:8
          }}>
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#222",border:"1px solid #333" }}/>
            <div style={{ width:60,height:6,borderRadius:3,background:"#222" }}/>
          </div>

          {/* Status bar */}
          <div style={{
            position:"absolute",top:0,left:0,right:0,height:44,
            display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"0 20px",zIndex:99,pointerEvents:"none"
          }}>
            <span style={{ fontSize:".65rem",fontWeight:600,color:"rgba(255,255,255,.0)" }}>9:41</span>
            <span style={{ fontSize:".6rem",color:"rgba(255,255,255,.0)" }}>●●● ▲ 🔋</span>
          </div>

          {/* Scrollable content */}
          <div
            ref={containerRef}
            style={{
              flex:1,overflowY:"scroll",scrollSnapType:"y mandatory",
              scrollbarWidth:"none",marginTop:0,
            }}
          >
            <style>{`.no-sb::-webkit-scrollbar{display:none;}`}</style>
            {screens.map((s,i) => (
              <div key={s.id} style={{
                height:"min(844px,96vh)",width:"100%",
                scrollSnapAlign:"start",flexShrink:0,
                paddingTop: i===0 ? 0 : 0,
              }}>
                {s.comp}
              </div>
            ))}
          </div>

          {/* Nav dots */}
          <div style={{
            position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
            display:"flex",flexDirection:"column",gap:7,zIndex:100,
          }}>
            {screens.map((_,i) => (
              <div key={i} onClick={()=>goTo(i)} style={{
                width:7,height:7,borderRadius:"50%",cursor:"pointer",
                background: active===i ? "var(--gold)" : "rgba(150,150,150,.5)",
                transform: active===i ? "scale(1.4)" : "scale(1)",
                transition:"all .3s",
              }}/>
            ))}
          </div>

          {/* Home bar */}
          <div style={{
            position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",
            width:120,height:4,borderRadius:2,background:"rgba(255,255,255,.2)",zIndex:100
          }}/>
        </div>
      </div>
    </>
  );
}