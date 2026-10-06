import { useState, useEffect, useRef, useCallback } from "react";
import CurtainScreen from "./components/Curtain";
import ScratchScreen from "./components/ScratchCoin";
import CountdownScreen from "./components/CountDown";
import DetailsScreen from "./components/Details";
import Confetti from "./components/Confetti";
import { GlobalStyle } from "./helper";

const screens = [
  { id:"curtain",  comp:<CurtainScreen/> },
  { id:"scratch" },
  { id:"countdown",comp:<CountdownScreen/> },
  { id:"details",  comp:<DetailsScreen/> },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [coinsDone, setCoinsDone] = useState(false);
  const onCoinsDone = useCallback(() => setCoinsDone(true), []);
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
      <div style={{ position:"fixed",inset:0,background:"#111",overflow:"hidden" }}>
        {/* Scrollable content */}
        <div
          ref={containerRef}
          style={{
            height:"100%",overflowY:"scroll",scrollSnapType:"y mandatory",
            scrollbarWidth:"none",
          }}
        >
          {screens.map((s) => (
            <div key={s.id} style={{ height:"100dvh",width:"100%",scrollSnapAlign:"start",flexShrink:0 }}>
              {s.id === "scratch" ? <ScratchScreen onComplete={onCoinsDone}/> : s.comp}
            </div>
          ))}
        </div>

        <Confetti fire={coinsDone}/>

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
      </div>
    </>
  );
}
