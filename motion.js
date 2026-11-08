(()=>{
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const running=new Set();
function animate(el,frames,options){
 if(!el||preference.matches||!el.animate)return;
 const a=el.animate(frames,options);running.add(a);
 a.finished.then(()=>running.delete(a)).catch(()=>running.delete(a));
}
const enter=[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}];
document.querySelectorAll('.intro h1,.intro-copy,.film-heading h1,.credits-hero h1').forEach((el,i)=>animate(el,enter,{duration:750,delay:i*100,easing:'cubic-bezier(.2,.7,.2,1)'}));
const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
 entries.forEach(({target,isIntersecting})=>{
 if(!isIntersecting)return;
 animate(target,enter,{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});
 observer.unobserve(target);
 });
},{threshold:.12}):null;
document.querySelectorAll('.story-card,.section-heading,.creator-credit,.credit-section,.film-details').forEach(el=>observer?.observe(el));
const name=document.getElementById('name');
if(name)new MutationObserver(()=>{
 animate(document.querySelector('.sprite'),[{opacity:.35,translate:'14px 0'},{opacity:1,translate:'0 0'}],{duration:340,easing:'ease-out'});
 animate(document.querySelector('.bio'),[{opacity:.4,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:340,easing:'ease-out'});
}).observe(name,{childList:true});
preference.addEventListener('change',()=>{if(preference.matches){running.forEach(a=>a.cancel());running.clear();}});
})();