import { useFadeIn } from "../helper";

const RED = "#B3201F";
function Line({ children, size = ".8rem", style }) {
  return <div style={{ fontSize: size, lineHeight: 1.45, ...style }}>{children}</div>;
}

export default function DetailsScreen() {
  const [ref, vis] = useFadeIn();
  const serif = "'Cormorant Garamond',serif";

  return (
    <div ref={ref} style={{ position:"relative",height:"100%",background:"var(--cream)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.2rem" }}>
      <div style={{
        position:"relative",textAlign:"center",color:RED,fontFamily:serif,fontStyle:"italic",
        maxHeight:"100%",overflowY:"auto",scrollbarWidth:"none",padding:"1.5rem 1.6rem",
        opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(14px)",transition:"all 1s .8s",
      }}>
        <Line size=".6rem" style={{ fontFamily:"'Montserrat',sans-serif",fontStyle:"normal",letterSpacing:".18em",marginBottom:"1.1rem" }}>
          II Shree Vinayaka Prasanna II
        </Line>

        {/* <Line size=".9rem" style={{ fontWeight:600 }}>Smt. Sharmila &amp; Sri Arun Kumar</Line> */}
        <Line size=".8rem">Solicit your gracious presence with family &amp; friends on the auspicious occasion of our wedding ceremony</Line>

        <Line size="1.7rem" style={{ fontWeight:600,marginTop:"1.1rem",lineHeight:1.1 }}>Chi. Adhish Bangera</Line>
        <Line size=".7rem" style={{ fontStyle:"normal" }}>(S/o Sri Arun Kumar & Smt. Sharmila)</Line>
        <Line size=".85rem" style={{ margin:".5rem 0" }}>with</Line>
        <Line size="1.7rem" style={{ fontWeight:600,lineHeight:1.1 }}>Chi. Sou. Shanmuka Priya</Line>
        <Line size=".7rem" style={{ fontStyle:"normal" }}>(D/o Ganadhipalli Sri Seetharami Reddy &amp; Ganadhipalli Smt. Kalpana Reddy)</Line>

        <Line size=".9rem" style={{ marginTop:"1.1rem" }}>On Wednesday 25th November 2026,</Line>
        <Line size=".95rem">at <b>“Indiana Convention Centre”</b></Line>
        <Line size=".8rem">Yekkur, Mangalore</Line>

        <div style={{ display:"inline-block",border:`1.5px solid ${RED}`,padding:".4rem .9rem",margin:"1rem 0",fontWeight:600,fontSize:".8rem" }}>
          Muhurtham: 11:26 am (Makara Lagnam)
        </div>

        <Line size=".75rem">Together with the blessings of our families</Line>
        <Line size=".75rem" style={{ fontWeight:600,marginTop:".8rem" }}>“Your Presence is the best present”</Line>
      </div>
    </div>
  );
}
