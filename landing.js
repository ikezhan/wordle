document.addEventListener('DOMContentLoaded', () => {
    // Create floating background elements
    createBackgroundElements();
    createFloatingHearts();

    // Add hover effect to start button
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('mousemove', (e) => {
        const rect = startButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = Math.floor((x / rect.width) * 100);
        const yPercent = Math.floor((y / rect.height) * 100);
        
        startButton.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #ff8787, #ff6b6b)`;
    });

    startButton.addEventListener('mouseleave', () => {
        startButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8787)';
    });

    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    // Handle start button click with enhanced animation
    startButton.addEventListener('click', () => {
        // Disable button to prevent multiple clicks
        startButton.disabled = true;
        
        // Animate content out
        const content = document.querySelector('.content');
        content.style.animation = 'contentFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        // Create heart burst effect
        createHeartBurst(event.clientX, event.clientY);
        
        // Start page transition
        setTimeout(() => {
            pageTransition.style.animation = 'pageTransitionIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            
            setTimeout(() => {
                pageTransition.style.animation = 'pageTransitionOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                window.location.href = 'game.html';
            }, 800);
        }, 500);
    });

    // Add enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes contentFadeOut {
            0% {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
            }
            100% {
                opacity: 0;
                transform: scale(0.98);
                filter: blur(10px);
            }
        }

        @keyframes fadeHeart {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }

        .heart-burst {
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: burstAnimation 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes burstAnimation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

function createBackgroundElements() {
    const backgroundAnimation = document.querySelector('.background-animation');
    const words = ['W', 'O', 'R', 'D', 'L', 'E'];
    const hearts = ['💕', '💖', '💗', '💓'];

    // Create floating tiles with letters
    words.forEach((letter, index) => {
        const tile = document.createElement('div');
        tile.className = 'floating-tile';
        tile.textContent = letter;
        tile.style.animationDelay = `${index * 0.5}s`;
        backgroundAnimation.appendChild(tile);
    });

    // Create floating hearts
    for (let i = 0; i < 4; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[i % hearts.length];
        heart.style.animationDelay = `${i * 1.5}s`;
        backgroundAnimation.appendChild(heart);
    }
}

function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    document.body.appendChild(container);

    const hearts = ['💝', '💖', '💗', '💓', '💕'];
    const numHearts = 15;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${15 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

function createHeartBurst(x, y) {
    const hearts = ['💝', '💖', '💗', '💓', '💕'];
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'fixed';
    burstContainer.style.left = '0';
    burstContainer.style.top = '0';
    burstContainer.style.width = '100%';
    burstContainer.style.height = '100%';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '9998';
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 100;
        const startX = x - window.scrollX;
        const startY = y - window.scrollY;
        
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.transform = `translate(-50%, -50%)`;
        
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        heart.animate([
            { transform: 'translate(-50%, -50%) scale(0.3)', offset: 0 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(1.5)`, offset: 0.5 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, offset: 1 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        });
        
        burstContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
    
    setTimeout(() => burstContainer.remove(), 1000);
}