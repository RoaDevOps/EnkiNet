// Seleccionar elementos del DOM
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const fullContactForm = document.getElementById('fullContactForm');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const confirmationMessage = document.getElementById('confirmationMessage');
const carousel = document.querySelector('.servicios-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');

// Validar correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar mensaje de confirmación
function showConfirmation(element, message) {
  element.textContent = message;
  element.classList.remove('hidden');
  setTimeout(() => element.classList.add('hidden'), 5000);
}

// Toggle del menú móvil
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Formulario del jumbotron
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailValue = emailInput.value.trim();
  if (!isValidEmail(emailValue)) {
    alert('Por favor, ingresa un correo válido.');
    return;
  }
  showConfirmation(confirmationMessage, '¡Gracias por contactarnos! Te responderemos pronto.');
  emailInput.value = '';
});

// Formulario completo de contacto
fullContactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailFullInput').value.trim();
  const nombre = document.getElementById('nombreInput').value.trim();
  const asunto = document.getElementById('asuntoInput').value.trim();
  const mensaje = document.getElementById('mensajeInput').value.trim();

  if (!nombre || !isValidEmail(email) || !asunto || !mensaje) {
    alert('Por favor, completa todos los campos con información válida.');
    return;
  }

  const confirmation = document.createElement('p');
  confirmation.id = 'fullConfirmationMessage';
  fullContactForm.appendChild(confirmation);
  showConfirmation(confirmation, '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
  fullContactForm.reset();
});

// Formulario de newsletter
newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!isValidEmail(email)) {
    alert('Por favor, ingresa un correo válido.');
    return;
  }
  const confirmation = document.createElement('p');
  confirmation.id = 'newsletterConfirmation';
  newsletterForm.appendChild(confirmation);
  showConfirmation(confirmation, '¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');
  newsletterForm.reset();
});

// Carousel
const items = carousel.querySelectorAll('.servicio');
const itemWidth = items[0].offsetWidth + 30; // Incluye gap
const totalItems = items.length;
let currentIndex = 0;

// Crear indicadores
for (let i = 0; i < Math.ceil(totalItems / 3); i++) {
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  if (i === 0) indicator.classList.add('active');
  indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.indicator');

function updateCarousel() {
  carousel.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
  const indicatorIndex = Math.floor(currentIndex / 3) % indicators.length;
  indicators.forEach((ind, i) => ind.classList.toggle('active', i === indicatorIndex));
}

nextBtn.addEventListener('click', () => {
  currentIndex += 3;
  if (currentIndex >= totalItems) {
    currentIndex = 0; // Volver al inicio cuando se pasa del final
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex -= 3;
  if (currentIndex < 0) {
    currentIndex = totalItems - (totalItems % 3 || 3); // Ir al final ajustado
  }
  updateCarousel();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index * 3;
    updateCarousel();
  });
});

// Efecto de scroll en el header
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 300);
});

// Volver arriba
backToTop.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});