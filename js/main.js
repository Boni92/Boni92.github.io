// Variables globales
let currentHours = 6033;

// Funciones del popup
function openGiftPopup() {
    const popup = document.getElementById('giftPopup');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGiftPopup() {
    const popup = document.getElementById('giftPopup');
    popup.style.display = 'none';
    document.body.style.overflow = '';
}

function contactFromPopup() {
    closeGiftPopup();
    scrollToSection('sec6');
}

// Función para desplazarse a una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80; // Ajusta este valor según el tamaño de tu header
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// Elementos del DOM
const menuToggle = document.querySelector('.menu-toggle'); //menu hamburguesa
const mobileMenu = document.querySelector('.mobile-menu'); //menu móvil
const menuOverlay = document.querySelector('.menu-overlay'); //overlay del menu móvil
const closeMenu = document.querySelector('.close-menu'); //cerrar menu móvil
const contactForm = document.querySelector('.contact-form'); //formulario de contacto
const submitBtn = contactForm?.querySelector('.submit-btn'); //boton de envío del formulario
console.log(closeMenu);
// Funciones del menú móvil
function openMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Funciones del contador de horas
function updateHoursDisplay() {
    const hoursElement = document.getElementById('workedHours');
    if (hoursElement) {
        hoursElement.textContent = currentHours;
    }
}

function checkMidnightAndUpdate() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        currentHours += 8;
        updateHoursDisplay();
    }
}

function initializeHoursCounter() {
    updateHoursDisplay();
    setInterval(checkMidnightAndUpdate, 1000);
}

// Funciones de validación del formulario
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

    updateFieldValidation(input, isValid, errorMessage);
    return isValid;
}

function updateFieldValidation(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.field-error');

    if (existingError) {
        existingError.remove();
    }

    if (!isValid) {
        input.style.borderBottomColor = 'rgba(255, 71, 87, 0.5)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);

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

function showNotification(message, type) {
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;

    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(notification, form.nextSibling);

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

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar contador de horas
    initializeHoursCounter();

    // Configurar navegación por secciones
    document.querySelectorAll('[data-section]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });

    // Configurar acciones del popup
    document.querySelectorAll('[data-action]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const action = this.getAttribute('data-action');
            switch(action) {
                case 'openGiftPopup':
                    openGiftPopup();
                    break;
                case 'closeGiftPopup':
                    closeGiftPopup();
                    break;
                case 'contactFromPopup':
                    contactFromPopup();
                    break;
            }
        });
    });

    // Configurar formulario de contacto
    if (contactForm && submitBtn) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(input);
            });
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) return;

            const formData = {
                name: contactForm.querySelector('#name').value.trim(),
                company: contactForm.querySelector('#company').value.trim(),
                email: contactForm.querySelector('#email').value.trim(),
                phone: contactForm.querySelector('#phone').value.trim(),
                message: contactForm.querySelector('#message').value.trim()
            };

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await emailjs.send(
                    'service_yyul3jw',
                    'template_9k4k9ob',
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
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
            }
        });
    }

    // Configurar menú móvil
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMenu();
        });

        // Cerrar menú al hacer clic en el overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenuFunc();
            });
        }

        // Cerrar menú al hacer clic en los items del menú
        const menuItems = mobileMenu.querySelectorAll('.itemNav');
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    scrollToSection(sectionId);
                }
                closeMenuFunc();
            });
        });

        // Cerrar menú al hacer clic en el botón de cerrar
        if (closeMenu) {
            closeMenu.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenuFunc();
            });
        }
    }

    // Configurar popup
    const giftPopup = document.getElementById('giftPopup');
    if (giftPopup) {
        giftPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                closeGiftPopup();
            }
        });
    }

    // Gradient interactive effect
    const interBubble = document.querySelector('.interactive');
    if (interBubble) {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(() => {
                move();
            });
        }

        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        });

        move();
    }
}); 