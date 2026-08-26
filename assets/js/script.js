const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
},{threshold:.14});
revealItems.forEach(el=>observer.observe(el));

const card = document.querySelector('.tilt-card');
if(card && matchMedia('(pointer:fine)').matches){
  card.addEventListener('mousemove', e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`rotateY(${x*8-5}deg) rotateX(${-y*7+2}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='rotateY(-5deg) rotateX(3deg)');
}

const form=document.getElementById('demoForm');
const toast=document.getElementById('toast');
const closeToast=toast.querySelector('button');
let timer;
form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  toast.classList.add('show');
  clearTimeout(timer); timer=setTimeout(()=>toast.classList.remove('show'),5500);
});
closeToast.addEventListener('click',()=>toast.classList.remove('show'));
