// Mostrar u ocultar la carta
const btnCarta = document.getElementById('btnCarta');
const mensajeOculto = document.getElementById('mensajeOculto');

btnCarta.addEventListener('click', () => {
  if (mensajeOculto.style.display === 'block') {
    mensajeOculto.style.display = 'none';
  } else {
    mensajeOculto.style.display = 'block';
    crearLluviaCorazones();
  }
});

// Función para generar corazones flotantes al hacer clic en la carta
function crearLluviaCorazones() {
  for (let i = 0; i < 20; i++) {
    const corazon = document.createElement('div');
    corazon.innerHTML = '💖';
    corazon.style.position = 'fixed';
    corazon.style.left = Math.random() * 100 + 'vw';
    corazon.style.top = '100vh';
    corazon.style.fontSize = (Math.random() * 20 + 15) + 'px';
    corazon.style.transition = 'transform 3s linear, opacity 3s';
    corazon.style.zIndex = '999';
    
    document.body.appendChild(corazon);

    setTimeout(() => {
      corazon.style.transform = `translateY(-110vh) rotate(${Math.random() * 360}deg)`;
      corazon.style.opacity = '0';
    }, 100);

    setTimeout(() => {
      corazon.remove();
    }, 3100);
  }
}
