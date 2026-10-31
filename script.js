const panels = [...document.querySelectorAll(".panel")];
const dots = [...document.querySelectorAll(".dot")];
const currentNo = document.getElementById("currentNo");
let current = 0;
let locked = false;

function showPanel(index, push=true){
  if(index < 0 || index >= panels.length || locked || index === current) return;
  locked = true;
  panels[current].classList.remove("active");
  current = index;
  panels[current].classList.add("active");
  currentNo.textContent = String(current + 1).padStart(2,"0");
  dots.forEach((dot,i)=>dot.classList.toggle("active",i===current));
  if(push) history.replaceState(null,"","#"+panels[current].id);
  setTimeout(()=>locked=false,500);
}

function initialPanel(){
  const hash = location.hash.replace("#","");
  const index = panels.findIndex(p=>p.id===hash);
  if(index > 0){
    panels[0].classList.remove("active");
    current=index;
    panels[index].classList.add("active");
    currentNo.textContent=String(index+1).padStart(2,"0");
    dots.forEach((d,i)=>d.classList.toggle("active",i===index));
  }
}
initialPanel();

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>showPanel(current+1));
});
dots.forEach(dot=>{
  dot.addEventListener("click",()=>showPanel(Number(dot.dataset.target)));
});

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown" || e.key==="ArrowRight" || e.key===" "){
    e.preventDefault(); showPanel(current+1);
  }
  if(e.key==="ArrowUp" || e.key==="ArrowLeft"){
    e.preventDefault(); showPanel(current-1);
  }
});

let touchStartY=0;
document.addEventListener("touchstart",e=>touchStartY=e.touches[0].clientY,{passive:true});
document.addEventListener("touchend",e=>{
  const dy=touchStartY-e.changedTouches[0].clientY;
  if(Math.abs(dy)>55) showPanel(current+(dy>0?1:-1));
},{passive:true});

const cases = {
  commute:{
    label:"ACADEMIC · PYTHON · SQL / DATABASE CONCEPTS",
    title:"CommuteSync",
    text:[
      "Designed a structured carpooling and commute-management system for users, rides and bookings.",
      "Focused on translating a real-world transportation problem into a clear technical workflow using Python and database concepts."
    ]
  },
  bi:{
    label:"ACADEMIC / SELF-DIRECTED · ANALYTICS",
    title:"Data Analysis & BI",
    text:[
      "Worked through data-cleaning, transformation, validation and exploratory-analysis workflows.",
      "Used SQL for querying and pattern identification, Advanced Excel for analysis and reporting, and visualization concepts to communicate findings."
    ]
  }
};

document.querySelectorAll(".case-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".case-card").forEach(c=>c.classList.remove("active-case"));
    card.classList.add("active-case");
    const item=cases[card.dataset.case];
    document.getElementById("caseLabel").textContent=item.label;
    document.getElementById("caseTitle").textContent=item.title;
    document.getElementById("caseText").innerHTML=item.text.map(p=>`<p>${p}</p>`).join("");
  });
});
