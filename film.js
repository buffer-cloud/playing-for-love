const film=document.getElementById('film'),caption=document.getElementById('caption-toggle');const chapters=[...document.querySelectorAll('[data-time]')];
function seek(t){if(!Number.isFinite(t))return;film.currentTime=Math.max(0,Math.min(t,film.duration||t));film.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}
chapters.forEach(b=>b.onclick=()=>{seek(Number(b.dataset.time));film.play().catch(()=>{});});
const target=Number(new URLSearchParams(location.search).get('t'));if(target>0){if(film.readyState>=1)seek(target);else film.addEventListener('loadedmetadata',()=>seek(target),{once:true});}
film.addEventListener('timeupdate',()=>{let active=chapters[0];chapters.forEach(b=>{if(Number(b.dataset.time)<=film.currentTime)active=b});chapters.forEach(b=>b.setAttribute('aria-current',String(b===active)));});
function captionState(){const on=film.textTracks[0]?.mode==='showing';caption.textContent='English captions: '+(on?'on':'off');caption.setAttribute('aria-pressed',on)}
caption.onclick=()=>{if(film.textTracks[0])film.textTracks[0].mode=film.textTracks[0].mode==='showing'?'hidden':'showing';captionState()};film.textTracks.addEventListener('change',captionState);

const cinemaButton=document.getElementById('cinema-toggle'),player=document.querySelector('.cinema-player');
let cinemaOpen=false,previousFocus=null,previousScroll=0;
const surroundings=[...document.querySelectorAll('body>header,body>footer,body>.skip,main>section:not(.cinema-player)')];
function setCinema(open){
 cinemaOpen=open;
 if(open){previousFocus=document.activeElement;previousScroll=scrollY;}
 document.body.classList.toggle('cinema-open',open);
 player.classList.toggle('is-cinema',open);
 cinemaButton.textContent=open?'Exit cinema ✕':'Cinema view ⛶';
 cinemaButton.setAttribute('aria-pressed',String(open));
 if(open){player.setAttribute('role','dialog');player.setAttribute('aria-modal','true');}
 else{player.removeAttribute('role');player.removeAttribute('aria-modal');}
 surroundings.forEach(el=>el.inert=open);
 if(open)cinemaButton.focus();
 else{scrollTo(0,previousScroll);previousFocus?.focus({preventScroll:true});}
}
cinemaButton.addEventListener('click',()=>setCinema(!cinemaOpen));
document.addEventListener('keydown',e=>{
 if(!cinemaOpen)return;
 if(e.key==='Escape'){e.preventDefault();setCinema(false);}
 if(e.key==='Tab'){
 const controls=[film,cinemaButton,caption];
 const first=controls[0],last=controls[controls.length-1];
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
film.tabIndex=0;
