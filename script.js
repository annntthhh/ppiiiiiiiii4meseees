/* ==========================================
   1. CONTADOR DE TIEMPO
   ========================================== */
const fechaInicio = new Date('2026-04-06T00:00:00').getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  let diferencia = ahora - fechaInicio;

  if (diferencia < 0) diferencia = Math.abs(diferencia);

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById('dias').innerText = dias < 10 ? '0' + dias : dias;
  document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
  document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
  document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;

  // Estimado de latidos compartidos
  const latidos = Math.floor((diferencia / 1000) * 1.25);
  document.getElementById('latidos-num').innerText = latidos.toLocaleString();
}

setInterval(actualizarContador, 1000);
actualizarContador();

/* ==========================================
   2. TÓMBOLA DE RAZONES
   ========================================== */
const razones = [
  "Amo cómo tu sonrisa ilumina todo mi día en un segundo. 😊",
  "La forma tan tierna y linda en la que me tratas siempre. 💞",
  "Cómo me haces reír incluso cuando estoy de mal genio. 🤭",
  "Cada abrazo tuyo se siente exactamente como estar en casa. 🫂",
  "Lo inteligente, dedicado y maravilloso que eres en todo lo que haces. ✨",
  "Tu mirada hermosa cuando me hablas de cosas que te apasionan. 😍",
  "Ese 05 de abril en el cumple de Carla que cambió mi vida para siempre. 🎂",
  "Simplemente porque eres tú y haces que mi mundo sea infinitamente mejor. ❤️"
];

const btnTombola = document.getElementById('btn-tombola-girar');
const textoRazon = document.getElementById('texto-razon');

btnTombola.addEventListener('click', () => {
  textoRazon.style.opacity = '0';
  setTimeout(() => {
    const razonAleatoria = razones[Math.floor(Math.random() * razones.length)];
    textoRazon.innerText = razonAleatoria;
    textoRazon.style.opacity = '1';
    lanzarCorazonesRpidos();
  }, 300);
});

/* ==========================================
   3. CORAZONES Y RASTRO DE CURSOR
   ========================================== */
function crearCorazonFondo() {
  const contenedor = document.getElementById('fondo-corazones');
  const corazon = document.createElement('div');
  corazon.innerText = ['💞', '💖', '✨', '💕', '🌸'][Math.floor(Math.random() * 5)];
  corazon.style.position = 'absolute';
  corazon.style.left = Math.random() * 100 + 'vw';
  corazon.style.top = '100vh';
  corazon.style.fontSize = (Math.random() * 16 + 12) + 'px';
  corazon.style.transition = 'transform 7s linear, opacity 7s';
  corazon.style.opacity = '0.7';

  contenedor.appendChild(corazon);

  setTimeout(() => {
    corazon.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
    corazon.style.opacity = '0';
  }, 50);

  setTimeout(() => { corazon.remove(); }, 7050);
}

setInterval(crearCorazonFondo, 450);

// Rastro del cursor
window.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.15) {
    const spark = document.createElement('div');
    spark.innerText = '💞';
    spark.style.position = 'fixed';
    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';
    spark.style.fontSize = '14px';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9998';
    spark.style.transition = 'transform 1s, opacity 1s';
    document.body.appendChild(spark);

    setTimeout(() => {
      spark.style.transform = 'translateY(-30px) scale(0)';
      spark.style.opacity = '0';
    }, 50);

    setTimeout(() => spark.remove(), 1050);
  }
});

/* ==========================================
   4. REPRODUCTOR DE MÚSICA Y LOCKSCREEN
   ========================================== */
const lockscreen = document.getElementById('lockscreen');
const btnLock = document.getElementById('btn-lock');
const btnTextUnlock = document.getElementById('btn-text-unlock');
const audio = document.getElementById('cancion-fondo');
const btnMusica = document.getElementById('btn-musica');
const musicDisc = document.getElementById('music-disc');

function desbloquear() {
  lockscreen.classList.add('unlocked');
  audio.play().then(() => {
    musicDisc.classList.add('playing');
    btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }).catch(() => {
    console.log("Autoplay bloqueado por navegador");
  });
  lanzarFuegosArtificiales();
}

btnLock.addEventListener('click', desbloquear);
btnTextUnlock.addEventListener('click', desbloquear);

btnMusica.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicDisc.classList.add('playing');
    btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    musicDisc.classList.remove('playing');
    btnMusica.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

/* ==========================================
   5. CARTA Y FUEGOS ARTIFICIALES
   ========================================== */
const btnAbrirCarta = document.getElementById('btn-abrir-carta');
const cartaContenido = document.getElementById('carta-contenido');

btnAbrirCarta.addEventListener('click', () => {
  cartaContenido.style.display = 'block';
  btnAbrirCarta.style.display = 'none';
  lanzarFuegosArtificiales();
  lanzarCorazonesRpidos();
});

function lanzarCorazonesRpidos() {
  for(let i=0; i<25; i++) {
    setTimeout(crearCorazonFondo, i * 60);
  }
}

// Fuegos artificiales de corazones 💞
const canvas = document.getElementById('canvas-fuegos');
const ctx = canvas.getContext('2d');
let particulas = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function lanzarFuegosArtificiales() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 3;

  for (let i = 0; i < 50; i++) {
    particulas.push({
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      size: Math.random() * 20 + 10,
      alpha: 1,
      text: ['💞', '💖', '✨'][Math.floor(Math.random() * 3)]
    });
  }
}

function animarFuegos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particulas.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08; // Gravedad
    p.alpha -= 0.015;

    ctx.globalAlpha = Math.max(p.alpha, 0);
    ctx.font = `${p.size}px serif`;
    ctx.fillText(p.text, p.x, p.y);

    if (p.alpha <= 0) {
      particulas.splice(index, 1);
    }
  });

  requestAnimationFrame(animarFuegos);
}
animarFuegos();
