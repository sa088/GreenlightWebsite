$(document).ready(function () {
    // Mobile menu toggle
    $('#mobile-menu-btn').click(function () {
        $('#mobile-menu').toggleClass('hidden');
        $(this).find('svg').toggleClass('rotate-180');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
        // Close mobile menu if open
        $('#mobile-menu').addClass('hidden');
    });

    // Website gallery horizontal scrolling
    $('.scroll-section').each(function () {
        const $section = $(this);
        const $scrollContainer = $section.find('.scroll-container');
        const $prevBtn = $section.find('.prev-btn');
        const $nextBtn = $section.find('.next-btn');
        const cardWidth = 320 + 24;
        const maxScroll = ($scrollContainer.children().length - 3) * cardWidth;
        let scrollPosition = 0;

        function updateButtons() {
            $prevBtn.toggleClass('opacity-50', scrollPosition <= 0);
            $nextBtn.toggleClass('opacity-50', scrollPosition >= maxScroll);
        }

        $nextBtn.click(function () {
            if (scrollPosition < maxScroll) {
                scrollPosition += cardWidth;
                $scrollContainer.css('transform', `translateX(-${scrollPosition}px)`);
            }
            updateButtons();
        });

        $prevBtn.click(function () {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                $scrollContainer.css('transform', `translateX(-${scrollPosition}px)`);
            }
            updateButtons();
        });

        updateButtons();
    });

    // Contact form handling
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();

        // Show loading state
        submitBtn.text('Sending...').addClass('loading').prop('disabled', true);

        // Simulate form submission (replace with actual API call)
        setTimeout(function () {
            // Reset form
            form[0].reset();

            // Show success state
            submitBtn.text('Message Sent!').removeClass('loading').addClass('form-success');

            // Reset button after 2 seconds
            setTimeout(function () {
                submitBtn.text(originalText).removeClass('form-success').prop('disabled', false);
            }, 2000);
        }, 1500);
    });

    // Form validation
    $('input, select, textarea').on('blur', function () {
        const field = $(this);
        const value = field.val().trim();

        if (field.prop('required') && !value) {
            field.addClass('border-red-500').removeClass('border-gray-300');
        } else if (field.attr('type') === 'email' && value && !isValidEmail(value)) {
            field.addClass('border-red-500').removeClass('border-gray-300');
        } else {
            field.removeClass('border-red-500').addClass('border-green-500');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animate elements on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function () {
            const element = $(this);
            const elementTop = element.offset().top;
            const elementBottom = elementTop + element.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                element.addClass('animate-in');
            }
        });
    }

    // Add animation classes to elements
    $('section > div').addClass('animate-on-scroll');

    // Run animation check on scroll and load
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // Testimonial cards hover effect
    $('.testimonial-card').hover(
        function () {
            $(this).addClass('shadow-2xl').css('transform', 'translateY(-8px)');
        },
        function () {
            $(this).removeClass('shadow-2xl').css('transform', 'translateY(0)');
        }
    );

    // Social media icons animation
    $('.social-icon').hover(
        function () {
            $(this).css('transform', 'translateY(-3px) scale(1.1)');
        },
        function () {
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // Add click effect to buttons
    $('button').on('mousedown', function () {
        $(this).css('transform', 'scale(0.98)');
    }).on('mouseup mouseleave', function () {
        $(this).css('transform', 'scale(1)');
    });

    // Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            // Add any critical images here
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', pageLoadTime + 'ms');
            }, 0);
        });
    }

    // Error handling for images
    $('img').on('error', function () {
        $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA4VjEyTTE2IDEySDhNMTIgMTZIMTIuMDEiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+');
    });

    // Accessibility improvements
    $(document).keydown(function (e) {
        // ESC key closes mobile menu
        if (e.keyCode === 27) {
            $('#mobile-menu').addClass('hidden');
        }

        // Tab navigation for custom elements
        if (e.keyCode === 9) {
            $(':focus').addClass('keyboard-focus');
        }
    });

    // Remove keyboard focus styles on mouse interaction
    $(document).mousedown(function () {
        $('.keyboard-focus').removeClass('keyboard-focus');
    });

    // Touch device detection and optimization
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        // Optimize touch interactions
        $('.scroll-btn').on('touchstart', function () {
            $(this).addClass('touch-active');
        }).on('touchend', function () {
            $(this).removeClass('touch-active');
        });
    }

    // Initialize tooltips (if needed)
    $('[data-tooltip]').hover(
        function () {
            const tooltip = $('<div class="tooltip">' + $(this).data('tooltip') + '</div>');
            $('body').append(tooltip);
            const pos = $(this).offset();
            tooltip.css({
                top: pos.top - tooltip.outerHeight() - 10,
                left: pos.left + ($(this).outerWidth() / 2) - (tooltip.outerWidth() / 2)
            }).fadeIn(200);
        },
        function () {
            $('.tooltip').fadeOut(200, function () {
                $(this).remove();
            });
        }
    );

    console.log('🚀 Greenlight landing page initialized successfully!');
});

// Utility functions
const GreenlightUtils = {
    // Smooth scroll to element
    scrollTo: function (element, offset = 80) {
        $('html, body').animate({
            scrollTop: $(element).offset().top - offset
        }, 800);
    },

    // Validate form field
    validateField: function (field) {
        const value = $(field).val().trim();
        const type = $(field).attr('type');
        const required = $(field).prop('required');

        if (required && !value) return false;
        if (type === 'email' && value && !this.isValidEmail(value)) return false;
        if (type === 'tel' && value && !this.isValidPhone(value)) return false;

        return true;
    },

    // Email validation
    isValidEmail: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Phone validation
    isValidPhone: function (phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
    },

    // Debounce function
    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId: function () {
        return 'gl_' + Math.random().toString(36).substr(2, 9);
    }
};

// Make utils available globally
window.GreenlightUtils = GreenlightUtils;