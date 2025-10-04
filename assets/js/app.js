// Transición de entrada (fade) global
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
});

/* Carrusel con auto-rotación y clic en puntos (compatible) */
(function () {
  var carousel = document.getElementById('carousel');
  if (!carousel) return; // si no hay carrusel en esta página, salimos

  var slides = carousel.querySelectorAll('.slide');
  var dotsWrap = document.getElementById('carouselDots');
  var dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];

  if (!slides.length || !dots.length) return;

  var idx = 0;
  var INTERVAL = 4000; // 4s
  var timer = null;

  function show(i) {
    for (var k = 0; k < slides.length; k++) {
      if (k === i) {
        slides[k].classList.add('active');
        dots[k].classList.add('active');
      } else {
        slides[k].classList.remove('active');
        dots[k].classList.remove('active');
      }
    }
    idx = i;
  }

  function next() {
    show((idx + 1) % slides.length);
  }

  function start() { timer = setInterval(next, INTERVAL); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }

  // Click en los puntos — también reinicia el temporizador
  for (var i = 0; i < dots.length; i++) {
    (function(i){
      dots[i].addEventListener('click', function () {
        stop();
        show(i);
        start();
      });
    })(i);
  }

  // Inicializar
  show(0);
  start();
})();

/* Utilidad fetch JSON */
async function api(url, opts = {}) {
  const r = await fetch(url, { headers: { 'Accept': 'application/json' }, ...opts });
  if (!r.ok) throw new Error('Error de red');
  return r.json();
}

// Activar giro de tarjetas con clic
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const flip = wrapper.querySelector('.card-flip');
      flip.classList.toggle('flipped'); // 👉 alterna entre normal y girada
    });
  });
});