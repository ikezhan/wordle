document.addEventListener('DOMContentLoaded', () => {
    initHeartEffects();
    initTimeCounter();
    initCoverFlow();
    createCelebrationHearts();
    showAddToHomeScreenPrompt();
});

// Function to show Add to Home Screen prompt
function showAddToHomeScreenPrompt() {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        return; // Already installed
    }

    // Create prompt container
    const promptContainer = document.createElement('div');
    promptContainer.className = 'add-to-home-prompt';
    
    // Different instructions for iOS and Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const promptText = isIOS
        ? 'To add this timer to your Home Screen: tap the share button <span style="font-size: 1.2em">⬆️</span> below and then "Add to Home Screen" <span style="font-size: 1.2em">📱</span>'
        : 'To add this timer to your Home Screen, tap the menu button and select "Add to Home Screen" <span style="font-size: 1.2em">📱</span>';
    
    promptContainer.innerHTML = `
        <div class="prompt-content">
            <p>${promptText}</p>
            <button class="close-prompt">Got it!</button>
        </div>
    `;
    
    document.body.appendChild(promptContainer);
    
    // Add styles
    const promptStyles = document.createElement('style');
    promptStyles.textContent = `
        .add-to-home-prompt {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 20px;
            box-shadow: none;
            z-index: 10000;
            max-width: 90%;
            width: 320px;
            animation: slideUp 0.5s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-transform: none;
        }
        
        .prompt-content {
            text-align: center;
            font-size: 0.95em;
            color: white;
        }
        
        .prompt-content p {
            margin: 0 0 15px 0;
            line-height: 1.4;
            opacity: 0.9;
        }
        
        .close-prompt {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-family: 'SF Pro Display', sans-serif;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            cursor: pointer;
        }
        
        .close-prompt:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .close-prompt:active {
            transform: translateY(0);
        }
        
        @keyframes slideUp {
            from {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, 0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translate(-50%, 0);
                opacity: 1;
            }
            to {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(promptStyles);
    
    // Handle close button
    const closeButton = promptContainer.querySelector('.close-prompt');
    closeButton.addEventListener('click', () => {
        promptContainer.style.animation = 'slideDown 0.5s ease forwards';
        setTimeout(() => promptContainer.remove(), 500);
    });
    
    // Hide prompt after 15 seconds
    setTimeout(() => {
        if (promptContainer.parentElement) {
            promptContainer.style.animation = 'slideDown 0.5s ease forwards';
            setTimeout(() => promptContainer.remove(), 500);
        }
    }, 15000);
}

// Function to initialize time counter
function initTimeCounter() {
    const urlParams = new URLSearchParams(window.location.search);
    const startParam = urlParams.get('start');
    
    if (!startParam) {
        // If no start parameter, redirect to question page
        window.location.href = 'question.html';
        return;
    }

    const startTime = parseInt(startParam);
    if (isNaN(startTime)) {
        window.location.href = 'question.html';
        return;
    }

    let lastUpdate = Date.now();
    let elapsedOffset = 0;

    function updateCounter() {
        const now = Date.now();
        const timeSinceLastUpdate = now - lastUpdate;
        
        // Detect and correct for system time changes
        if (timeSinceLastUpdate < 0 || timeSinceLastUpdate > 1100) {
            // Time was adjusted, recalculate from absolute time
            elapsedOffset = 0;
        }
        
        lastUpdate = now;
        const elapsedTime = now - startTime + elapsedOffset;

        const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        // Update the display with leading zeros
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(updateCounter);
    }

    // Start the counter
    updateCounter();
}

// Initialize Cover Flow Gallery
function initCoverFlow() {
    const container = document.querySelector('.coverflow-container');
    const items = Array.from(document.querySelectorAll('.coverflow-item'));
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Initial positioning
    function updatePositions() {
        items.forEach((item, index) => {
            item.className = 'coverflow-item';
            const offset = index - currentIndex;
            
            if (offset === 0) {
                item.classList.add('center');
                item.style.left = '50%';
            } else if (offset === -1) {
                item.classList.add('left');
                item.style.left = '25%';
            } else if (offset === 1) {
                item.classList.add('right');
                item.style.left = '75%';
            } else if (offset < -1) {
                item.classList.add('far-left');
                item.style.left = '10%';
            } else {
                item.classList.add('far-right');
                item.style.left = '90%';
            }
        });
    }

    // Auto-scroll function
    function autoScroll() {
        currentIndex = (currentIndex + 1) % totalItems;
        updatePositions();
    }

    // Initial setup
    updatePositions();
    
    // Start auto-scrolling
    setInterval(() => {
        autoScroll();
    }, 3000);
}

// Create celebration hearts
function createCelebrationHearts() {
    const container = document.createElement('div');
    container.className = 'celebration-hearts';
    document.body.appendChild(container);

    const hearts = ['💝', '💖', '💗', '💓', '💕'];
    const numHearts = 50;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'celebration-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${2 + Math.random() * 3}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(heart);
    }

    // Add celebration styles
    const style = document.createElement('style');
    style.textContent = `
        .celebration-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        }

        .celebration-heart {
            position: absolute;
            font-size: 1.5rem;
            animation: celebrationFall linear forwards;
        }

        @keyframes celebrationFall {
            0% {
                transform: translateY(-100%) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove celebration after animation
    setTimeout(() => {
        container.remove();
        style.remove();
    }, 5000);
} 