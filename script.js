/* ==========================================================================
   DYPIU codeDecode Landing Page - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initStatCounters();
    initCountdownTimer();
    initClickBursts();
    initMobileNav();
    initScrollEffects();
    initQuizArena();
});

/* --------------------------------------------------------------------------
   1. CODE DECRYPTION & TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const target = document.getElementById('typing-target');
    if (!target) return;

    const phrases = [
        "Decrypting Club Powers...",
        "Compiling 100+ Student Repos...",
        "Bypassing Syntax Errors...",
        "DYPIU codeDecode Ready! ⚡"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 1800;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentDelay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentDelay = 400;
        }

        setTimeout(type, currentDelay);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. STAT COUNTERS (SCROLL TRIGGERED)
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statValues.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    const duration = 2000; // ms
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.4 });

    const statsSection = document.querySelector('.stats-banner');
    if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   3. HACKATHON COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
    // Set target date 14 days into the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   4. COMIC CLICK ACTION BURSTS
   -------------------------------------------------------------------------- */
function initClickBursts() {
    const burstWords = ["BOOM!", "POW!", "ZIP!", "CODE!", "DEBUGGED!", "100% PASS", "DECODE!"];

    document.addEventListener('click', (e) => {
        // Only trigger on interactive elements like buttons, cards, links
        if (e.target.closest('.btn-comic, .comic-card, .nav-link, .quiz-opt')) {
            createBurst(e.clientX, e.clientY);
        }
    });

    function createBurst(x, y) {
        const particle = document.createElement('div');
        particle.className = 'comic-burst-particle';
        const randomWord = burstWords[Math.floor(Math.random() * burstWords.length)];
        particle.textContent = randomWord;

        // Position slightly offset from cursor
        particle.style.left = `${x - 30}px`;
        particle.style.top = `${y - 30}px`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 900);
    }
}

/* --------------------------------------------------------------------------
   5. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link, .nav-btn-mobile');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

/* --------------------------------------------------------------------------
   6. SCROLL EFFECTS & BACK TO TOP
   -------------------------------------------------------------------------- */
function initScrollEffects() {
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Back to top button visibility
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active scrollspy link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* --------------------------------------------------------------------------
   7. DECODE ARENA MINI-GAME
   -------------------------------------------------------------------------- */
function initQuizArena() {
    const options = document.querySelectorAll('.quiz-opt');
    const resultBox = document.getElementById('quiz-result');
    const resultMsg = document.getElementById('quiz-msg');

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            const isCorrect = opt.getAttribute('data-correct') === 'true';

            options.forEach(o => o.classList.remove('btn-green', 'btn-dark'));

            if (isCorrect) {
                opt.classList.add('btn-green');
                resultBox.classList.remove('hidden');
                resultMsg.innerHTML = '<strong>EXCELLENT DECODING!</strong> You selected option B ("DY⚡IUcodeDecode"). You earned the <strong>DYPIU Code Warrior Badge!</strong> 🏆';
            } else {
                opt.classList.add('btn-dark');
                resultBox.classList.remove('hidden');
                resultMsg.innerHTML = '<strong>SYNTAX MISMATCH!</strong> Close, but remember array map replaces "P" with "⚡"! Try again! ⚡';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   8. FORM SUBMISSION & MODAL
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
    event.preventDefault();
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
    const form = document.getElementById('join-form');
    if (form) form.reset();
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
