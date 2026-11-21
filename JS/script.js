// Leer más / Leer menos en las tarjetas de .servicio

const limite = 90; // cuantos caracteres se ven antes de darle a "leer más"

const tarjetas = document.querySelectorAll('.servicio');

tarjetas.forEach(function (tarjeta) {
  const parrafo = tarjeta.querySelector('p');
  const boton = tarjeta.querySelector('a');

  if (!parrafo || !boton) return;

  const textoCompleto = parrafo.textContent.trim();

  // si el texto ya es corto no hace falta el boton
  if (textoCompleto.length <= limite) {
    boton.style.display = 'none';
    return;
  }

  const textoCorto = textoCompleto.substring(0, limite).trim() + '...';

  // arranca mostrando solo el texto corto
  parrafo.textContent = textoCorto;
  boton.textContent = 'Leer más';
  let abierto = false;

  boton.addEventListener('click', function (e) {
    e.preventDefault(); // para que no suba la pagina

    abierto = !abierto;

    if (abierto) {
      parrafo.textContent = textoCompleto;
      boton.textContent = 'Leer menos';
    } else {
      parrafo.textContent = textoCorto;
      boton.textContent = 'Leer más';
    }
  });
});


// Menu hamburger para celular
// (se crea desde aqui, asi que no hay que ponerlo en el HTML)

const nav = document.querySelector('.nav') || document.querySelector('nav');
const enlaces = document.querySelector('.enlaces-header');

if (nav && enlaces) {

  // por si ya habia uno viejo en el HTML lo quitamos
  const viejo = document.querySelector('.hamburger');
  if (viejo) viejo.remove();

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Abrir menú');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(hamburger);

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('activo');
    enlaces.classList.toggle('activo');
  });

  // cuando le dan a un link el menu se cierra
  enlaces.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('activo');
      enlaces.classList.remove('activo');
    });
  });
}
