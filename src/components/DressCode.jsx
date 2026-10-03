import { useFadeIn } from "../helper";

export default function DressCodeScreen() {
  const [r1,v1]=useFadeIn(); const [r2,v2]=useFadeIn();
  const [r3,v3]=useFadeIn(); const [r4,v4]=useFadeIn();
  const [r5,v5]=useFadeIn();
  const swatches=["#1a1a1a","#2C3E6B","#8B1A1A","#C9A96E","#E8D5C4","#4a5c4a"];
  const figures=["🤵","👗","🥻","👘","🕴️"];
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",background:"var(--cream)",padding:"2rem",textAlign:"center" }}>
      <h2 ref={r1} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,9vw,3.2rem)",color:"var(--text)",marginBottom:".5rem",opacity:v1?1:0,transform:v1?"translateY(0)":"translateY(24px)",transition:"all .7s" }}>Dress Code</h2>
      <div ref={r2} style={{ display:"flex",justifyContent:"center",alignItems:"flex-end",gap:".3rem",margin:"1.5rem 0",flexWrap:"wrap",opacity:v2?1:0,transform:v2?"translateY(0)":"translateY(24px)",transition:"all .7s .1s" }}>
        {figures.map((f,i)=><span key={i} style={{ fontSize:`clamp(2.2rem,${i%2===0?8:6}vw,3.2rem)` }}>{f}</span>)}
      </div>
      <p ref={r3} style={{ fontSize:".65rem",letterSpacing:".05em",color:"#555",lineHeight:1.9,maxWidth:260,fontStyle:"italic",marginBottom:"1.5rem",opacity:v3?1:0,transform:v3?"translateY(0)":"translateY(24px)",transition:"all .7s .2s" }}>
        We invite you to dress elegantly and formally to celebrate the special day with us.
      </p>
      <div ref={r4} style={{ display:"flex",gap:".5rem",justifyContent:"center",marginBottom:"2rem",opacity:v4?1:0,transform:v4?"translateY(0)":"translateY(24px)",transition:"all .7s .3s" }}>
        {swatches.map((c,i)=><div key={i} style={{ width:30,height:30,borderRadius:"50%",background:c,boxShadow:"0 2px 8px rgba(0,0,0,.15)" }}/>)}
      </div>
      <div ref={r5} style={{ borderTop:"1px solid #ddd",paddingTop:"1rem",width:"100%",maxWidth:300,opacity:v5?1:0,transition:"all .7s .4s" }}>
        <p style={{ fontSize:".5rem",letterSpacing:".22em",textTransform:"uppercase",color:"#aaa" }}>Wedding Invitation · Sam &amp; Sofia · June 14, 2026</p>
      </div>
    </div>
  );
}
