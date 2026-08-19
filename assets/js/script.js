const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
const form=document.querySelector('#contact-form');

addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});
menuButton.addEventListener('click',()=>{const open=menuButton.classList.toggle('open');mobileNav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.classList.remove('open');mobileNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px'});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));

document.querySelectorAll('.js-form-cta').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.querySelector('#agendamento').scrollIntoView({behavior:'smooth'});setTimeout(()=>document.querySelector('#nome').focus({preventScroll:true}),650)}));

const phone=document.querySelector('#telefone');
phone.addEventListener('input',()=>{let value=phone.value.replace(/\D/g,'').slice(0,11);if(value.length>2)value=`(${value.slice(0,2)}) ${value.slice(2)}`;if(value.length>10)value=`${value.slice(0,10)}-${value.slice(10)}`;else if(value.length>9)value=`${value.slice(0,9)}-${value.slice(9)}`;phone.value=value});

function validate(field,message){const wrap=field.closest('.field');const valid=field.value.trim()!=='';wrap.classList.toggle('invalid',!valid);wrap.querySelector('.error').textContent=valid?'':message;return valid}
form.addEventListener('submit',event=>{event.preventDefault();const name=document.querySelector('#nome');const city=document.querySelector('#cidade');const interest=document.querySelector('#interesse');const phoneValid=validate(phone,'Informe seu WhatsApp.');const fieldsValid=[validate(name,'Informe seu nome.'),validate(city,'Informe sua cidade.'),validate(interest,'Escolha uma opção.')].every(Boolean);if(!phoneValid||!fieldsValid){form.querySelector('.invalid input,.invalid select').focus();return}const details=document.querySelector('#mensagem').value.trim()||'Não informado';const text=`Olá, Dr. Arilson! Vim pelo site e gostaria de solicitar atendimento.\n\n*Nome:* ${name.value.trim()}\n*WhatsApp:* ${phone.value.trim()}\n*Cidade:* ${city.value.trim()}\n*Interesse:* ${interest.value}\n*Mensagem:* ${details}`;window.open(`https://wa.me/5574999212059?text=${encodeURIComponent(text)}`,'_blank','noopener')});
form.querySelectorAll('input,select').forEach(field=>field.addEventListener('input',()=>{if(field.value.trim()){field.closest('.field').classList.remove('invalid');field.closest('.field').querySelector('.error').textContent=''}}));

const dialog=document.querySelector('.lightbox');const dialogImage=dialog.querySelector('img');document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{dialogImage.src=button.dataset.lightbox;dialog.showModal()}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.open)dialog.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
