(()=>{
const WA="27837925118"; /* WhatsApp number: change here only (static hrefs in the HTML are the no-JS fallback) */
const link=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const ask=c=>`Hi Palace Exotics, I’m interested in enquiring about the ${c}. Could you please share the rental details and availability?`;
const $=q=>document.querySelector(q),form=$("#form");
const today=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)};
const fmt=d=>new Date(d+"T00:00").toLocaleDateString("en-ZA",{day:"numeric",month:"long",year:"numeric"});
const f=form&&form.elements,dates=()=>{if(!f)return"";const a=f.from.value,b=f.to.value;return a?` Requested dates: ${fmt(a)}${b&&b>=a?" to "+fmt(b):""}.`:""};
document.querySelectorAll("a.wa:not([data-car])").forEach(a=>a.href=link("Hi Palace Exotics, I’d like to enquire about a rental."));
document.querySelectorAll("[data-car]").forEach(a=>{const set=()=>{a.href=link(ask(a.dataset.car)+dates())};set();a.addEventListener("click",set)});
if(form){
const btn=form.querySelector("button");f.from.min=f.to.min=today();
f.from.addEventListener("change",()=>{f.to.min=f.from.value||today();if(f.to.value&&f.to.value<f.from.value)f.to.value=""});
const show=(el,m)=>{const e=$("#e-"+el.name);e.textContent=m;e.hidden=!m;m?el.setAttribute("aria-invalid","true"):el.removeAttribute("aria-invalid");return m};
const check=()=>{const a=f.from.value,b=f.to.value,bad=[];
 if(show(f.name,f.name.value.trim()?"":"Please enter your name."))bad.push(f.name);
 if(show(f.car,f.car.value?"":"Please choose a vehicle."))bad.push(f.car);
 if(show(f.from,a&&a<today()?"Choose a start date from today onwards.":""))bad.push(f.from);
 if(show(f.to,b&&!a?"Add a start date, or clear this one.":b&&b<a?"The end date must be on or after the start date.":""))bad.push(f.to);
 return bad[0]};
form.addEventListener("input",()=>{if(form.querySelector("[aria-invalid]"))check()});
let busy=false;
form.addEventListener("submit",e=>{e.preventDefault();if(busy)return;const bad=check();if(bad){bad.focus();return}
 busy=true;btn.disabled=true;
 let t=ask(f.car.value.startsWith("Not sure")?"cars in your collection":f.car.value)+` My name is ${f.name.value.trim()}.`+dates();
 const m=f.msg.value.trim();if(m)t+=` Additional details: ${m}`;
 window.open(link(t),"_blank","noopener,noreferrer");
 setTimeout(()=>{busy=false;btn.disabled=false},1500)});
}
const nav=$("#nav"),mb=nav.querySelector(".menu"),root=document.documentElement,rest=[$("main"),$("footer")];
const setMenu=o=>{nav.classList.toggle("open",o);root.classList.toggle("lock",o);rest.forEach(n=>n.inert=o);mb.setAttribute("aria-expanded",o);mb.textContent=o?"Close":"Menu"};
mb.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));
$("#links").addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){setMenu(false);mb.focus()}});
matchMedia("(min-width:761px)").addEventListener("change",e=>{if(e.matches)setMenu(false)});
const s=$("#sentinel");if(s)new IntersectionObserver(([e])=>nav.classList.toggle("solid",!e.isIntersecting)).observe(s);
const y=$("#yr");if(y)y.textContent=new Date().getFullYear();
})();
