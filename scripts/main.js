// Swiper initialization code will go here 

document.addEventListener('DOMContentLoaded', function () {
    // Добавление параллакс-эффекта для баннера
    const bannerSection = document.querySelector('.banner');
    const bannerImage = document.querySelector('.banner-image img');
    const particlesContainer = document.querySelector('.particles-container');
    
    // Создаем частицы
    function createParticles() {
        if (!particlesContainer) return;
        
        // Очищаем контейнер
        particlesContainer.innerHTML = '';
        
        // Создаем случайное количество частиц
        const particleCount = Math.floor(Math.random() * 15) + 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Размер от 2px до 6px
            const size = Math.random() * 4 + 2;
            
            // Случайное положение
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Скорость анимации от 15s до 30s
            const animDuration = Math.random() * 15 + 15;
            
            // Задержка от 0 до 5s
            const delay = Math.random() * 5;
            
            // Стили частицы
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-duration: ${animDuration}s;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Создаем стили для частиц
    function createParticleStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .particle {
                position: absolute;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle linear infinite;
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(100px, -50px) rotate(90deg);
                }
                50% {
                    transform: translate(50px, -100px) rotate(180deg);
                }
                75% {
                    transform: translate(-50px, -50px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    if (bannerSection && bannerImage) {
        // Создаем стили и частицы
        createParticleStyles();
        createParticles();
        
        // Обновляем частицы каждые 30 секунд
        setInterval(createParticles, 30000);
        
        window.addEventListener('mousemove', function(e) {
            let mouseX = e.clientX / window.innerWidth;
            let mouseY = e.clientY / window.innerHeight;
            
            let moveX = (mouseX - 0.5) * 30;
            let moveY = (mouseY - 0.5) * 30;
            
            bannerImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            
            // Добавляем эффект для частиц
            if (particlesContainer) {
                particlesContainer.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
            }
        });
        
        // Анимация появления при скролле
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        function handleScrollAnimation() {
            if (isInViewport(bannerSection)) {
                bannerSection.classList.add('visible');
            }
        }
        
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Запустить сразу при загрузке
    }

    // Инициализация Swiper
    const swiper = new Swiper('.mySwiper', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Handle video background
    const videoElement = document.querySelector('.hero-background-video');
    const fallbackImage = document.querySelector('.hero-background-video + img');
    
    if (videoElement) {
        // Add event listeners to check if video can play
        videoElement.addEventListener('error', function() {
            handleVideoError();
        });
        
        // Some browsers don't support autoplay, so we need to check this
        videoElement.addEventListener('canplay', function() {
            videoElement.play().catch(function() {
                handleVideoError();
            });
        });
        
        // Try to play the video
        if (videoElement.readyState >= 3) { // HAVE_FUTURE_DATA or higher
            videoElement.play().catch(function() {
                handleVideoError();
            });
        }
    }
    
    function handleVideoError() {
        // If video can't be played, show the fallback image
        if (fallbackImage) {
            videoElement.style.display = 'none';
            fallbackImage.style.display = 'block';
        }
    }

    // Detect scroll for section animations
    const sections = document.querySelectorAll('.hosting-promo, .features-strip, .services-overview, .why-aetix');
    
    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check on page load
    handleScroll();

    // Add hover effect for swiper
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        swiperContainer.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    }

    // Create clouds animation
    const cloudsContainer = document.getElementById('clouds-container');
    
    if (cloudsContainer) {
        for (let i = 0; i < 8; i++) {
            createCloud();
        }
    }
    
    function createCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Set random size, position and speed
        const size = Math.random() * 150 + 50; // between 50px and 200px
        const posX = Math.random() * 100; // between 0% and 100%
        const posY = Math.random() * 70; // between 0% and 70%
        const speedFactor = Math.random() * 30 + 30; // between 30s and 60s
        
        cloud.style.width = size + 'px';
        cloud.style.height = size / 3 + 'px';
        cloud.style.left = posX + '%';
        cloud.style.top = posY + '%';
        cloud.style.opacity = Math.random() * 0.4 + 0.1; // between 0.1 and 0.5
        cloud.style.animation = `float ${speedFactor}s linear infinite`;
        cloud.style.animationDelay = `-${Math.random() * speedFactor}s`; // Random start point in the animation
        
        cloudsContainer.appendChild(cloud);
    }

    // Dropdown for 'услуги'
    const dropdownNav = document.querySelector('.nav-item-dropdown');
    if (dropdownNav) {
        dropdownNav.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
        });
        document.addEventListener('click', function(e) {
            dropdownNav.classList.remove('open');
        });
        // Чтобы клик по меню не закрывал его
        const dropdownMenu = dropdownNav.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
}); 