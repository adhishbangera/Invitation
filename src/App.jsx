import { useState, useEffect, useRef, useCallback } from "react";
import CurtainScreen from "./components/Curtain";
import ScratchScreen from "./components/ScratchCoin";
import CountdownScreen from "./components/CountDown";
import DressCodeScreen from "./components/DressCode";
import { GlobalStyle } from "./helper";

const screens = [
  { id: "curtain",   comp: <CurtainScreen /> },
  { id: "scratch",   comp: <ScratchScreen /> },
  { id: "countdown", comp: <CountdownScreen /> },
  { id: "dresscode", comp: <DressCodeScreen /> },
];

export default function App() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);

  const goTo = useCallback((i) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollTop / el.clientHeight);
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlobalStyle />
      {/* Full-screen responsive wrapper */}
      <div
        style={{
          width: "100vw",
          height: "100dvh", // dvh handles mobile browser address bars correctly
          display: "flex",
          justifyContent: "center",
          background: "#111",
        }}
      >
        {/* Content column: full screen on mobile, centered max-width on desktop */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Scrollable content */}
          <div
            ref={containerRef}
            style={{
              height: "100%",
              overflowY: "scroll",
              scrollSnapType: "y mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar{display:none;}`}</style>
            {screens.map((s) => (
              <div
                key={s.id}
                style={{
                  height: "100%",
                  width: "100%",
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                }}
              >
                {s.comp}
              </div>
            ))}
          </div>

          {/* Nav dots */}
          <div
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 7,
              zIndex: 100,
            }}
          >
            {screens.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  cursor: "pointer",
                  background: active === i ? "var(--gold)" : "rgba(150,150,150,.5)",
                  transform: active === i ? "scale(1.4)" : "scale(1)",
                  transition: "all .3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}