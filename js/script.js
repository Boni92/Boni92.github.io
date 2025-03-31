document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Validar campos mientras el usuario escribe
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(input);
        });
    });

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Obtener los valores del formulario
        const formData = {
            name: contactForm.querySelector('#name').value.trim(),
            company: contactForm.querySelector('#company').value.trim(),
            email: contactForm.querySelector('#email').value.trim(),
            phone: contactForm.querySelector('#phone').value.trim(),
            message: contactForm.querySelector('#message').value.trim()
        };

        // Cambiar el estado del botón
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        try {
            // Enviar el email usando EmailJS
            const response = await emailjs.send(
                'service_yyul3jw', // ⚠️ Reemplaza con el ID de tu servicio (ej: 'service_abc123')
                'template_9k4k9ob', // ⚠️ Reemplaza con el ID de tu template (ej: 'template_xyz789')
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    company: formData.company,
                    phone: formData.phone,
                    message: formData.message,
                    to_name: 'Nicolas Borsari',
                    reply_to: formData.email
                }
            );

            if (response.status === 200) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                resetValidationStyles();
            } else {
                throw new Error('Failed to send message');
            }

        } catch (error) {
            showNotification('There was an error sending your message. Please try again.', 'error');
            console.error('Error:', error);
        } finally {
            // Restaurar el botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
        }
    });
});

// Función para validar campos individuales
function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (input.id) {
        case 'name':
            if (!value && input.required) {
                isValid = false;
                errorMessage = 'Name is required';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'phone':
            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;

        case 'message':
            if (!value && input.required) {
                isValid = false;
                errorMessage = 'Message is required';
            }
            break;
    }

    // Actualizar estilos y mensajes de error
    updateFieldValidation(input, isValid, errorMessage);
    return isValid;
}

// Función para actualizar la validación visual de los campos
function updateFieldValidation(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.field-error');

    // Remover error existente si hay
    if (existingError) {
        existingError.remove();
    }

    // Actualizar estilos
    if (!isValid) {
        input.style.borderBottomColor = 'rgba(255, 71, 87, 0.5)';
        
        // Agregar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);

        // Agregar estilos para el mensaje de error si no existen
        if (!document.querySelector('#field-error-styles')) {
            const styles = document.createElement('style');
            styles.id = 'field-error-styles';
            styles.textContent = `
                .field-error {
                    color: #ff4757;
                    font-size: 0.8rem;
                    margin-top: 5px;
                    position: absolute;
                    bottom: -20px;
                }
            `;
            document.head.appendChild(styles);
        }
    } else {
        input.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
    }
}

// Función para resetear los estilos de validación
function resetValidationStyles() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    inputs.forEach(input => {
        input.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    });
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Eliminar notificación anterior si existe
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;

    // Insertar después del formulario
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(notification, form.nextSibling);

    // Agregar estilos dinámicamente si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .form-notification {
                padding: 15px 20px;
                border-radius: 8px;
                margin-top: 20px;
                font-size: 0.9rem;
                animation: slideIn 0.3s ease-out;
                max-width: 1200px;
            }

            .form-notification.success {
                background: rgba(46, 213, 115, 0.15);
                color: #2ed573;
                border: 1px solid rgba(46, 213, 115, 0.3);
            }

            .form-notification.error {
                background: rgba(255, 71, 87, 0.15);
                color: #ff4757;
                border: 1px solid rgba(255, 71, 87, 0.3);
            }

            @keyframes slideIn {
                from {
                    transform: translateY(-10px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Eliminar la notificación después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Función para desplazarse a una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Funciones para el popup
function openGiftPopup() {
    const popup = document.getElementById('giftPopup');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGiftPopup() {
    const popup = document.getElementById('giftPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function contactFromPopup() {
    closeGiftPopup();
    scrollToSection('sec6');
}

// Cerrar popup al hacer clic fuera
document.getElementById('giftPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeGiftPopup();
    }
});

// Funciones para el menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const closeMenu = document.querySelector('.close-menu');
const mobileNavItems = document.querySelectorAll('.mobile-nav .itemNav');

function openMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'auto';
}

function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);
menuOverlay.addEventListener('click', closeMenuFunc);

// Cerrar menú al hacer click en un item
mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
        closeMenuFunc();
        // El scrollToSection ya está definido y se llama desde el onclick en el HTML
    });
});
