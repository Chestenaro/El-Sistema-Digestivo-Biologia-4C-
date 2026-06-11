// Detección de dispositivo
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) || window.innerWidth < 768;
if (isMobile) document.body.classList.add('mobile');

// Elementos
const sidebar  = document.getElementById('sidebar');
const overlay  = document.getElementById('overlay');
const menuBtn  = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const prog     = document.getElementById('prog');

// Abrir/cerrar nav
function openNav()  { sidebar.classList.add('open'); overlay.classList.add('open'); if(!isMobile) document.body.classList.add('nav-open'); }
function closeNav() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.classList.remove('nav-open'); }

menuBtn.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);

// Cerrar al hacer click en un link (móvil)
document.querySelectorAll('#sidebar a').forEach(a => a.addEventListener('click', () => { if(isMobile) closeNav(); }));

// Barra de progreso
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  prog.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight)})`;
});

// Link activo según scroll
const sections = document.querySelectorAll('section.organ');
const navLinks = document.querySelectorAll('#sidebar a');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`#sidebar a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => obs.observe(s));

// En PC abrir nav por defecto si hay espacio
if (!isMobile && window.innerWidth > 1100) openNav();
