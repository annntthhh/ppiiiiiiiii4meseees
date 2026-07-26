// 1. Contador exacto desde el 06 de Abril
const fechaInicio = new Date('April 6, 2026 00:00:00').getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = ahora - fechaInicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById('dias').innerText = dias < 10 ? '0' + dias : dias;
  document.getElementById('horas').innerText = horas < 10 ? '0' + horas : horas;
  document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
  document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
}

setInterval(actualizarContador, 1000);
actualizarContador();

// 2. Corazones flotantes continuos en el fondo
function generarCorazonFondo() {
  const contenedor = document.getElementById('corazones-fondo');
  const corazon = document.createElement('div');
  corazon.innerHTML = ['💖', '💕', '✨', '🌸', '💘'][Math.floor(Math.random() * 5)];
  corazon.style.position = 'absolute';
  corazon.style.left = Math.random() * 100 + 'vw';
  corazon.style.top = '100vh';
  corazon.style.fontSize = (Math.random() * 15 + 10) + 'px';
  corazon.style.opacity = Math.random() * 0.7 + 0.3;
  corazon.style.transition = 'transform 6s linear, opacity 6s';

  contenedor.appendChild(corazon);

  setTimeout(() => {
    corazon.style.transform = `translateY(-105vh) rotate(${Math.random() * 360}deg)`;
  }, 50);

  setTimeout(() => {
    corazon.remove();
  }, 6050);
}

setInterval(generarCorazonFondo, 400);

// 3. Revelar razones al hacer clic
function revelarRazon(boton, texto) {
  boton.innerText = texto;
  boton.style.background = '#ff6699';
  boton.style.color = 'white';
}

// 4. Abrir Carta y Ráfaga de Corazones/Confeti
const btnAbrirCarta = document.getElementById('btnAbrirCarta');
const contenedorCarta = document.getElementById('contenedorCarta');

btnAbrirCarta.addEventListener('click', () => {
  contenedorCarta.style.display = 'block';
  btnAbrirCarta.style.display = 'none';

  // Lluvia masiva de celebración
  for (let i = 0; i < 40; i++) {
    setTimeout(generarCorazonFondo, i * 50);
  }
});
