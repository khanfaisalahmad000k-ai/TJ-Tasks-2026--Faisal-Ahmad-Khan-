const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector("#navLinks");
menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

document.querySelectorAll(".plan-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const toast=document.querySelector("#toast");
    toast.textContent=`${btn.dataset.plan} selected — let's get you started!`;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2200);
    document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>document.querySelector("#message").value=`I'm interested in the ${btn.dataset.plan} membership.`,500);
  });
});

document.querySelector("#bmiForm").addEventListener("submit",e=>{
  e.preventDefault();
  const weight=Number(document.querySelector("#weight").value);
  const height=Number(document.querySelector("#height").value)/100;
  const result=document.querySelector("#bmiResult");
  if(!weight||!height){result.textContent="Please enter valid measurements.";return}
  const bmi=weight/(height*height);
  let range=bmi<18.5?"Below the usual adult range":bmi<25?"Within the usual adult range":bmi<30?"Above the usual adult range":"30+ range";
  result.innerHTML=`<strong>BMI: ${bmi.toFixed(1)}</strong> — ${range}. <small>This is a screening measure, not a diagnosis.</small>`;
});

const track=document.querySelector("#testimonialTrack");
const cards=[...document.querySelectorAll(".testimonial-track article")];
let slide=0;
function visible(){return window.innerWidth<701?1:3}
function dots(){
  const total=Math.max(1,cards.length-visible()+1);
  document.querySelector("#sliderDots").innerHTML=Array.from({length:total},(_,i)=>`<span class="${i===slide?"active":""}"></span>`).join("");
  document.querySelectorAll("#sliderDots span").forEach((d,i)=>d.onclick=()=>go(i));
}
function go(i){
  const max=Math.max(0,cards.length-visible());
  slide=Math.min(Math.max(i,0),max);
  const width=cards[0].getBoundingClientRect().width;
  track.style.transform=`translateX(-${slide*(width+15)}px)`;
  dots();
}
document.querySelector("#next").onclick=()=>go(slide+1);
document.querySelector("#prev").onclick=()=>go(slide-1);
window.addEventListener("resize",()=>go(Math.min(slide,Math.max(0,cards.length-visible()))));
dots();

document.querySelector("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.querySelector("#name").value.trim();
  document.querySelector("#formStatus").textContent=`Thanks ${name||"there"} — your message is ready to be sent!`;
  e.target.reset();
});

const sections=[...document.querySelectorAll("main section[id]")];
const navItems=[...document.querySelectorAll(".nav-links a")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) navItems.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>observer.observe(s));
