(()=>{
const video=document.getElementById('hero-video'),button=document.getElementById('hero-motion');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let pausedByUser=false,visible=true;
function sync(){button.textContent=video.paused?'Play motion':'Pause motion';button.setAttribute('aria-label',video.paused?'Play background montage':'Pause background montage');}
function play(){if(!video.getAttribute('src'))video.src='assets/hero-montage.mp4';video.play().catch(sync);}
button.hidden=false;
button.addEventListener('click',()=>{if(video.paused){pausedByUser=false;play();}else{pausedByUser=true;video.pause();}});
video.addEventListener('play',sync);video.addEventListener('pause',sync);
video.addEventListener('error',()=>{video.style.display='none';button.hidden=true;});
function update(){if(document.hidden||!visible||pausedByUser||reduced.matches)video.pause();else play();}
document.addEventListener('visibilitychange',update);
reduced.addEventListener('change',update);
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.1}).observe(video);
else update();
})();