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


// ===== Botones que llevan a cada seccion =====

// le ponemos id a cada seccion por si no tienen
const secciones = {
  inicio: document.querySelector('.contenido-header'),
  nosotros: document.querySelector('.about-us'),
  preguntas: document.querySelector('.pregunta'),
  resultados: document.querySelector('.resultados'),
  contacto: document.querySelector('footer')
};

Object.keys(secciones).forEach(function (nombre) {
  const sec = secciones[nombre];
  if (sec && !sec.id) sec.id = nombre;
});

function irA(destino) {
  if (!destino) return;
  const y = destino.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// links del menu: si tienen un #algo que existe, va para alla.
// si el link esta vacio o es solo "#", va a la seccion en el mismo orden del menu
const ordenSecciones = [secciones.inicio, secciones.nosotros, secciones.preguntas, secciones.resultados, secciones.contacto];

document.querySelectorAll('.enlaces-header a').forEach(function (link, i) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    if (href && href.length > 1 && href.startsWith('#')) {
      const destino = document.querySelector(href);
      if (destino) {
        e.preventDefault();
        irA(destino);
      }
    } else if (!href || href === '#') {
      e.preventDefault();
      irA(ordenSecciones[i]);
    }
  });
});

// boton del header -> baja a "nosotros"
const botonHeader = document.querySelector('.contenido-header a');
// boton de preguntas -> baja a resultados
const botonPregunta = document.querySelector('.texto-pregunta a');
// boton de resultados -> baja al footer
const botonResultados = document.querySelector('.results-text > a');

function conectarBoton(boton, destinoPorDefecto) {
  if (!boton) return;

  boton.addEventListener('click', function (e) {
    const href = boton.getAttribute('href');

    if (href && href.length > 1 && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      irA(document.querySelector(href));
    } else if (!href || href === '#') {
      e.preventDefault();
      irA(destinoPorDefecto);
    }
    // si tiene un link normal (otra pagina) se deja que funcione normal
  });
}

conectarBoton(botonHeader, secciones.nosotros);
conectarBoton(botonPregunta, secciones.resultados);
conectarBoton(botonResultados, secciones.contacto);


// ===== Contador de la parte de abajo (los numeros) =====

const numeros = document.querySelectorAll('.numbers .number h4');

function animarNumero(elemento) {
  const texto = elemento.textContent.trim();
  const partes = texto.match(/^(\D*)([\d.,]+)(\D*)$/);

  if (!partes) return; // si no es un numero lo dejamos quieto

  const prefijo = partes[1];
  const meta = parseInt(partes[2].replace(/[.,]/g, ''), 10);
  const sufijo = partes[3];

  const duracion = 2000; // 2 segundos
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const valor = Math.floor(progreso * meta);
    elemento.textContent = prefijo + valor + sufijo;

    if (progreso < 1) {
      requestAnimationFrame(paso);
    } else {
      elemento.textContent = prefijo + meta + sufijo;
    }
  }

  requestAnimationFrame(paso);
}

const seccionResultados = document.querySelector('.resultados');

if (seccionResultados && numeros.length > 0) {
  let yaContó = false;

  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting && !yaContó) {
          yaContó = true;
          numeros.forEach(animarNumero);
        }
      });
    }, { threshold: 0.4 });

    observador.observe(seccionResultados);
  }
  // si el navegador no soporta el observer, los numeros quedan con su valor normal
}