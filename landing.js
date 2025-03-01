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

    // Handle start button click with enhanced animation
    startButton.addEventListener('click', () => {
        const content = document.querySelector('.content');
        content.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Create heart burst effect
        createHeartBurst(event.clientX, event.clientY);
        
        // Redirect to the game after animation
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                window.location.href = 'game.html';
            }, 500);
        }, 1500);
    });

    // Add fade-out and heart burst animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.95);
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
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const numHearts = 15;
    const hearts = ['💝', '💖', '💗', '💓', '💕'];

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = '1.5rem';
        heart.style.userSelect = 'none';
        
        const angle = (i / numHearts) * 360;
        const velocity = 2 + Math.random() * 2;
        const fadeDelay = 100 + Math.random() * 200;
        
        heart.style.animation = `
            moveHeart${i} 0.8s ease-out forwards,
            fadeHeart 0.8s ease-out forwards
        `;

        const keyframes = `
            @keyframes moveHeart${i} {
                0% {
                    transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
                }
                100% {
                    transform: 
                        translate(
                            ${Math.cos(angle * Math.PI / 180) * 100 * velocity}px,
                            ${Math.sin(angle * Math.PI / 180) * 100 * velocity}px
                        )
                        rotate(${360 + Math.random() * 360}deg);
                }
            }
        `;
    }
}