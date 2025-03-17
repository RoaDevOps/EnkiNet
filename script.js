document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar elementos del DOM
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');
  const serviciosCarousel = document.querySelector('.servicios-carousel');
  const productosGrid = document.querySelector('.productos-grid');
  const backToTop = document.querySelector('.back-to-top');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  // Menú móvil
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Navegación suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header con efecto de scroll
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Efecto del header
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Mostrar/ocultar botón de volver arriba
    if (backToTop) {
      backToTop.classList.toggle('visible', currentScroll > 300);
    }

    lastScroll = currentScroll;
  });

  // Botón volver arriba
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Validación de formularios
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(form, message, isError = false) {
    const messageDiv = form.querySelector('.form-message') || document.createElement('div');
    messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;

    if (!form.querySelector('.form-message')) {
      form.appendChild(messageDiv);
    }

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  // Formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = contactForm.querySelector('[name="email"]').value;
      const nombre = contactForm.querySelector('[name="nombre"]').value;
      const mensaje = contactForm.querySelector('[name="mensaje"]').value;

      if (!nombre || !isValidEmail(email) || !mensaje) {
        showMessage(contactForm, 'Por favor, completa todos los campos correctamente.', true);
        return;
      }

      // Aquí irían las llamadas a la API para enviar el formulario
      showMessage(contactForm, '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
      contactForm.reset();
    });
  }

  // Formulario de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('[name="email"]').value;

      if (!isValidEmail(email)) {
        showMessage(newsletterForm, 'Por favor, ingresa un correo válido.', true);
        return;
      }

      // Aquí irían las llamadas a la API para suscribir al newsletter
      showMessage(newsletterForm, '¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');
      newsletterForm.reset();
    });
  }

  // Animaciones al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeIn');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
  });

  // Inicialización de servicios y productos
  if (serviciosCarousel) {
    const servicios = serviciosCarousel.querySelectorAll('.servicio');
    servicios.forEach(servicio => {
      servicio.addEventListener('mouseenter', () => {
        servicio.style.transform = 'translateY(-5px)';
      });
      servicio.addEventListener('mouseleave', () => {
        servicio.style.transform = 'translateY(0)';
      });
    });
  }

  if (productosGrid) {
    const productos = productosGrid.querySelectorAll('.producto');
    productos.forEach(producto => {
      producto.addEventListener('mouseenter', () => {
        producto.style.transform = 'translateY(-5px)';
      });
      producto.addEventListener('mouseleave', () => {
        producto.style.transform = 'translateY(0)';
      });
    });
  }
});


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

// Formulario completo de contacto
fullContactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailFullInput').value.trim();
  const nombre = document.getElementById('nombreInput').value.trim();
  const asunto = document.getElementById('asuntoInput').value.trim();
  const mensaje = document.getElementById('mensajeInput').value.trim();
  const privacyCheckbox = document.getElementById('privacyCheckbox').checked;

  if (!nombre || !isValidEmail(email) || !asunto || !mensaje || !privacyCheckbox) {
    alert('Por favor, completa todos los campos con información válida y acepta la política de privacidad.');
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

// Función para manejar carruseles
function setupCarousel(carousel, itemsSelector) {
  if (!carousel) return;

  const items = carousel.querySelectorAll(itemsSelector);
  if (items.length === 0) return;

  let currentIndex = 0;
  const totalItems = items.length;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateCarousel(smooth = true) {
    const itemWidth = carousel.offsetWidth;
    const offset = -currentIndex * itemWidth;
    carousel.style.transition = smooth ? 'transform 0.3s ease' : 'none';
    carousel.style.transform = `translateX(${offset}px)`;
  }

  // Navegación con botones
  const prevBtn = carousel.parentElement.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.parentElement.querySelector('.carousel-btn.next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  // Soporte para touch (móviles)
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!touchStartX) return;
    
    const touch = e.touches[0];
    const diff = touchStartX - touch.clientX;
    
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  }, { passive: false });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < totalItems - 1) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }
    
    touchStartX = 0;
    touchEndX = 0;
  }, { passive: true });

  // Manejar cambios de tamaño de ventana
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel(false);
    }, 100);
  });

  // Posición inicial
  updateCarousel(false);
}

// Initialize carousels
setupCarousel(serviciosCarousel, '.servicio', '.servicios .indicator');
setupCarousel(productosCarousel, '.producto', '.catalogo .indicator');

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

// Manejo del consentimiento de cookies
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'flex';
  }
  acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
  });
  rejectCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    cookieConsent.style.display = 'none';
  });
});

// Animación de estadísticas en la sección "Nosotros"
const statItems = document.querySelectorAll('.stat-item[data-count]');
const statObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stat = entry.target;
      const count = parseInt(stat.getAttribute('data-count')) || 0;
      let current = 0;
      const increment = count / 50;

      const updateCounter = () => {
        if (current < count) {
          current += increment;
          stat.querySelector('.stat-number').textContent = Math.round(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.querySelector('.stat-number').textContent = count;
        }
      };

      updateCounter();
      observer.unobserve(stat);
    }
  });
}, { threshold: 0.5 });

statItems.forEach(stat => statObserver.observe(stat));