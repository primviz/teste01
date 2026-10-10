'use strict';
const menuToggle=document.querySelector('#menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');}
menuToggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
// Apenas parâmetros de campanha conhecidos. Nenhum dado pessoal da URL é repassado.
const params=new URLSearchParams(window.location.search);
const campaignKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck'];
document.querySelectorAll('.checkout').forEach(link=>{
 const url=new URL(link.href);campaignKeys.forEach(key=>{const value=params.get(key);if(value)url.searchParams.set(key,value);});link.href=url.toString();
 link.addEventListener('click',()=>{
  if(typeof window.gtag==='function')window.gtag('event','click_checkout',{product_name:link.dataset.product,event_category:'checkout',button_position:link.dataset.position,value:97,currency:'BRL',transport_type:'beacon'});
  // Clique externo: não representa venda nem início confirmado de checkout.
  if(typeof window.fbq==='function')window.fbq('trackCustom','ClickCheckout',{product_name:link.dataset.product,button_position:link.dataset.position,value:97,currency:'BRL'});
 });
});
document.querySelector('.whatsapp').addEventListener('click',()=>{
 if(typeof window.gtag==='function')window.gtag('event','lead_whatsapp',{event_category:'contato',event_label:'Dúvida antes de contratar',transport_type:'beacon'});
 if(typeof window.fbq==='function')window.fbq('trackCustom','ClickWhatsApp',{button_position:'duvidas-final'});
});
document.querySelectorAll('[data-carousel]').forEach(button=>button.addEventListener('click',()=>{const gallery=document.getElementById(button.dataset.carousel);gallery.scrollBy({left:Number(button.dataset.direction)*(gallery.querySelector('.project').getBoundingClientRect().width+20),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window){
 if(!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-head,.feature,.steps li').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}
 const bar=document.querySelector('.mobile-offer');const hero=document.querySelector('.hero');const footer=document.querySelector('footer');let heroVisible=true,footerVisible=false;const refresh=()=>bar.classList.toggle('visible',!heroVisible&&!footerVisible);const barObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.target===hero)heroVisible=e.isIntersecting;if(e.target===footer)footerVisible=e.isIntersecting;}refresh();});barObserver.observe(hero);barObserver.observe(footer);
}
document.querySelector('#year').textContent=new Date().getFullYear();
