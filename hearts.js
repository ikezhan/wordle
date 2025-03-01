// Array of heart emojis to use
const HEARTS = ['💝', '💖', '💗', '💓', '💕'];

// Create hearts that follow the cursor
function createCursorHearts() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-hearts';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Create a new heart
        if (Math.random() < 0.1) { // Control the frequency of hearts
            const heart = document.createElement('div');
            heart.className = 'cursor-heart';
            heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
            heart.style.left = `${mouseX}px`;
            heart.style.top = `${mouseY}px`;
            
            document.body.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    });
}

// Create floating background hearts
function createBackgroundHearts() {
    const container = document.createElement('div');
    container.className = 'background-hearts';
    document.body.appendChild(container);

    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        createHeart(container);
    }

    // Continuously add new hearts
    setInterval(() => {
        if (container.children.length < 30) {
            createHeart(container);
        }
    }, 2000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    
    // Random starting position
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = 0.8 + Math.random() * 0.7; // Between 0.8 and 1.5
    heart.style.fontSize = `${size}rem`;
    
    // Random animation duration and delay
    heart.style.animationDuration = `${15 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(heart);
    
    // Remove heart after animation
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Initialize both effects
function initHeartEffects() {
    createCursorHearts();
    createBackgroundHearts();
}

// Export for use in other files
window.initHeartEffects = initHeartEffects; 