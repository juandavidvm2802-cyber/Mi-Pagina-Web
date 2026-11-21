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

const hamburger = document.querySelector('.hamburger');
const enlaces = document.querySelector('.enlaces-header');

if (hamburger && enlaces) {
  hamburger.addEventListener('click', function () {
    enlaces.classList.toggle('activo');
  });

  // cuando le dan a un link el menu se cierra
  enlaces.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      enlaces.classList.remove('activo');
    });
  });
}