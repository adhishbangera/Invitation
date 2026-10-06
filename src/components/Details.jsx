import { useFadeIn } from "../helper";

const RED = "#B3201F";
const W = 300, H = 560, M = 14;

// Hand-drawn style ribbon frame: each side wobbles with a sine wave that
// fades to zero at the corners so the four sides meet cleanly.
function wavyFrame(phase, waves = 4, amp = 5) {
  const pts = [];
  const side = (n, at) => {
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const d = amp * Math.sin(Math.PI * u) * Math.sin(2 * Math.PI * waves * u + phase);
      pts.push(at(u, d));
    }
  };
  const x = (u) => M + u * (W - 2 * M), y = (u) => M + u * (H - 2 * M);
  side(60, (u, d) => [x(u), M + d]);
  side(110, (u, d) => [W - M + d, y(u)]);
  side(60, (u, d) => [x(1 - u), H - M + d]);
  side(110, (u, d) => [M + d, y(1 - u)]);
  return "M" + pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" L") + " Z";
}

const FRAME_A = wavyFrame(0);
const FRAME_B = wavyFrame(Math.PI * .8, 5, 4);

const BOW = [
  "M150,14 C132,-6 108,-2 112,14 C116,28 138,22 150,14",
  "M150,14 C168,-6 192,-2 188,14 C184,28 162,22 150,14",
  "M150,14 C146,30 138,40 130,50",
  "M150,14 C154,30 162,40 170,50",
];

function Line({ children, size = ".8rem", style }) {
  return <div style={{ fontSize: size, lineHeight: 1.45, ...style }}>{children}</div>;
}

export default function DetailsScreen() {
  const [ref, vis] = useFadeIn();
  const serif = "'Cormorant Garamond',serif";
  const draw = (delay) => ({
    strokeDasharray: 1, strokeDashoffset: vis ? 0 : 1,
    transition: `stroke-dashoffset 2.2s ease ${delay}s`,
  });

  return (
    <div ref={ref} style={{ position:"relative",height:"100%",background:"var(--cream)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.2rem" }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
        style={{ position:"absolute",inset:"1rem",width:"calc(100% - 2rem)",height:"calc(100% - 2rem)",overflow:"visible" }}>
        {[FRAME_A, FRAME_B].map((d, i) => (
          <path key={i} d={d} pathLength={1} fill="none" stroke={RED} strokeWidth={1.2}
            strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={draw(i * .3)}/>
        ))}
        {BOW.map((d, i) => (
          <path key={i} d={d} pathLength={1} fill="none" stroke={RED} strokeWidth={1.2}
            strokeLinecap="round" vectorEffect="non-scaling-stroke" style={draw(1.6)}/>
        ))}
      </svg>

      <div style={{
        position:"relative",textAlign:"center",color:RED,fontFamily:serif,fontStyle:"italic",
        maxHeight:"100%",overflowY:"auto",scrollbarWidth:"none",padding:"1.5rem 1.6rem",
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 1s .8s",
      }}>
        <Line size=".6rem" style={{ fontFamily:"'Montserrat',sans-serif",fontStyle:"normal",letterSpacing:".18em",marginBottom:"1.1rem" }}>
          II Shree Bhagavathi Prasanna II
        </Line>

        <Line size=".9rem" style={{ fontWeight:600 }}>Smt. Sharmila &amp; Sri Arun Kumar</Line>
        <Line size=".8rem">Solicit your gracious presence with family &amp; friends on the auspicious occasion of wedding ceremony of our son</Line>

        <Line size="1.7rem" style={{ fontWeight:600,marginTop:"1.1rem",lineHeight:1.1 }}>Chi. Adhish Bangera</Line>
        <Line size=".7rem" style={{ fontStyle:"normal" }}>(N/o Suresh Kumar Meramajal)</Line>
        <Line size=".85rem" style={{ margin:".5rem 0" }}>with</Line>
        <Line size="1.7rem" style={{ fontWeight:600,lineHeight:1.1 }}>Chi. Sou. Shanmuka Priya</Line>
        <Line size=".7rem" style={{ fontStyle:"normal" }}>(D/o Ganadhipalli Sri Seetharami Reddy &amp; Ganadhipalli Smt. Kalpana Reddy)</Line>

        <Line size=".9rem" style={{ marginTop:"1.1rem" }}>On Wednesday 25th November 2026,</Line>
        <Line size=".95rem">at <b>“Indiana Convention Centre”</b></Line>
        <Line size=".8rem">Yekkur, Mangalore</Line>

        <div style={{ display:"inline-block",border:`1.5px solid ${RED}`,padding:".4rem .9rem",margin:"1rem 0",fontWeight:600,fontSize:".8rem" }}>
          Muhurtham: 11:26 am (Makara Lagnam)
        </div>

        <Line size=".75rem">With best compliments from :<br/>Relatives &amp; Friends</Line>
        <Line size=".75rem" style={{ fontWeight:600,marginTop:".8rem" }}>“Your Presence is the best present”</Line>
      </div>
    </div>
  );
}
