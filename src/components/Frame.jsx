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

// Wobbly red ribbon border with a bow. Draws itself in when scrolled into view.
export default function Frame({ show = true }) {
  const [ref, vis] = useFadeIn();
  const draw = (d) => ({
    strokeDasharray: 1, strokeDashoffset: vis ? 0 : 1,
    transition: `stroke-dashoffset 2.2s ease ${d}s`,
  });
  return (
    <div ref={ref} style={{ position:"absolute",inset:"1rem",pointerEvents:"none",zIndex:5,
      opacity: show ? 1 : 0, transition:"opacity 1s" }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
        style={{ width:"100%",height:"100%",overflow:"visible" }}>
        {[FRAME_A, FRAME_B].map((d, i) => (
          <path key={i} d={d} pathLength={1} fill="none" stroke={RED} strokeWidth={1.2}
            strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={draw(i * .3)}/>
        ))}
        {BOW.map((d, i) => (
          <path key={i} d={d} pathLength={1} fill="none" stroke={RED} strokeWidth={1.2}
            strokeLinecap="round" vectorEffect="non-scaling-stroke" style={draw(1.6)}/>
        ))}
      </svg>
    </div>
  );
}
