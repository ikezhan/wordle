document.addEventListener('DOMContentLoaded', () => {
    initHeartEffects();
    checkUrlAndInitTimeCounter();
    initCoverFlow();
    
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const rejectionContainer = document.getElementById('rejection-container');
    
    // Show question container immediately with a smooth fade in
    questionContainer.style.opacity = '0';
    questionContainer.style.transform = 'scale(0.95)';
    questionContainer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Trigger the animation in the next frame
    requestAnimationFrame(() => {
        questionContainer.style.opacity = '1';
        questionContainer.style.transform = 'scale(1)';
    });

    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');

    // Handle "Yes" click
    yesBtn.addEventListener('click', () => {
        const startTime = new Date().getTime();
        
        // Generate special URL with the timestamp
        const specialUrl = generateSpecialUrl(startTime);
        
        // Create heart burst effect
        createHeartBurst(event.clientX, event.clientY);
        
        // Hide question container with fade out
        questionContainer.style.animation = 'fadeOut 0.5s ease forwards';
        
        setTimeout(() => {
            questionContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
            
            // Add special animation for success container
            successContainer.style.animation = 'fadeIn 1s ease forwards';
            
            // Create celebratory hearts
            createCelebrationHearts();
            
            // Show the special URL message
            showSpecialUrlMessage(specialUrl);
            
            // Initialize the counter immediately
            initTimeCounter(startTime);
        }, 500);
    });

    // Handle "No" click
    noBtn.addEventListener('click', () => {
        questionContainer.style.animation = 'fadeOut 0.5s ease forwards';
        
        setTimeout(() => {
            questionContainer.classList.add('hidden');
            rejectionContainer.classList.remove('hidden');
            rejectionContainer.style.animation = 'fadeIn 1s ease forwards';
        }, 500);
    });

    // Handle "Try Again" click
    tryAgainBtn.addEventListener('click', () => {
        rejectionContainer.style.animation = 'fadeOut 0.5s ease forwards';
        
        setTimeout(() => {
            rejectionContainer.classList.add('hidden');
            questionContainer.classList.remove('hidden');
            questionContainer.style.animation = 'fadeIn 1s ease forwards';
        }, 500);
    });
});

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
    }, 5000);
}

// Create heart burst effect
function createHeartBurst(x, y) {
    const container = document.createElement('div');
    container.className = 'heart-burst';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    document.body.appendChild(container);

    const hearts = ['💝', '💖', '💗', '💓', '💕'];
    const numHearts = 12;
    const radius = 50;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const angle = (i / numHearts) * 2 * Math.PI;
        const randomRadius = radius + (Math.random() * 20 - 10);
        
        heart.style.setProperty('--end-x', `${Math.cos(angle) * randomRadius}px`);
        heart.style.setProperty('--end-y', `${Math.sin(angle) * randomRadius}px`);
        heart.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
        
        container.appendChild(heart);
    }

    // Add burst styles
    const style = document.createElement('style');
    style.textContent = `
        .heart-burst {
            position: fixed;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
        }

        .burst-heart {
            position: absolute;
            font-size: 1.2rem;
            transform: translate(-50%, -50%);
            animation: burstOut cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes burstOut {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + var(--end-x)),
                    calc(-50% + var(--end-y))
                ) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove burst after animation
    setTimeout(() => {
        container.remove();
        style.remove();
    }, 1500);
}

// Add fade animations
const fadeStyles = document.createElement('style');
fadeStyles.textContent = `
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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(fadeStyles);

// Function to generate special URL with timestamp
function generateSpecialUrl(timestamp) {
    const url = new URL(window.location.href);
    url.searchParams.set('start', timestamp);
    return url.href;
}

// Function to show special URL message
function showSpecialUrlMessage(specialUrl) {
    const urlMessageContainer = document.createElement('div');
    urlMessageContainer.className = 'special-url-message';
    
    // Detect if user is on iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    // Create instructions based on device
    let addToHomeInstructions = '';
    if (isIOS) {
        addToHomeInstructions = `
            <div class="home-screen-instructions ios">
                <p>📱 Save this moment forever by adding to your home screen:</p>
                <ol>
                    <li>Tap the <strong>Share button</strong> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNCAxMnY4YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMnYtOE0xNiA2bC00LTRsLTQgNG04IDRMMTIgMmwtNCA4Ii8+PC9zdmc+" class="icon" /></li>
                    <li>Select <strong>"Add to Home Screen"</strong> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjE2Ii8+PGxpbmUgeDE9IjgiIHkxPSIxMiIgeDI9IjE2IiB5Mj0iMTIiLz48L3N2Zz4=" class="icon" /></li>
                </ol>
            </div>
        `;
    } else if (isAndroid) {
        addToHomeInstructions = `
            <div class="home-screen-instructions android">
                <p>📱 Save this moment forever by adding to your home screen:</p>
                <ol>
                    <li>Tap the <strong>menu</strong> (⋮)</li>
                    <li>Select <strong>"Add to Home screen"</strong></li>
                </ol>
            </div>
        `;
    } else {
        addToHomeInstructions = `
            <div class="home-screen-instructions desktop">
                <p>🔖 Bookmark this special link to keep this moment forever:</p>
                <p><small>Tip: On mobile devices, you can add this to your home screen!</small></p>
            </div>
        `;
    }

    urlMessageContainer.innerHTML = `
        <div class="url-box">
            <button class="close-button" onclick="closeUrlMessage(this)">×</button>
            ${addToHomeInstructions}
            <div class="url-container">
                <input type="text" value="${specialUrl}" readonly />
                <button onclick="copyUrl(this)">Copy</button>
            </div>
        </div>
    `;
    
    // Add styles for the URL message
    const style = document.createElement('style');
    style.textContent = `
        .special-url-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.98);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-width: 90%;
            width: 600px;
            text-align: center;
            font-size: 15px;
        }
        .url-box {
            margin: 10px 0;
            position: relative;
        }
        .close-button {
            position: absolute;
            top: -25px;
            right: -15px;
            background: none;
            border: none;
            color: #ff69b4;
            font-size: 28px;
            line-height: 1;
            cursor: pointer;
            transition: all 0.3s;
            padding: 0;
        }
        .close-button:hover {
            color: #ff1493;
            transform: scale(1.2);
        }
        .home-screen-instructions {
            margin-bottom: 20px;
            text-align: left;
        }
        .home-screen-instructions ol {
            margin: 10px 0;
            padding-left: 25px;
        }
        .home-screen-instructions li {
            margin: 8px 0;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .home-screen-instructions .icon {
            vertical-align: middle;
            margin: 0 3px;
        }
        .url-container {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .url-container input {
            flex: 1;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            background: #f8f8f8;
        }
        .url-container button {
            padding: 12px 20px;
            background: #ff69b4;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }
        .url-container button:hover {
            background: #ff1493;
            transform: translateY(-1px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        @media (max-width: 480px) {
            .special-url-message {
                font-size: 14px;
                padding: 15px;
                bottom: 10px;
            }
            .home-screen-instructions ol {
                padding-left: 20px;
            }
            .url-container input {
                padding: 8px;
            }
            .url-container button {
                padding: 8px 15px;
            }
            .close-button {
                top: -20px;
                font-size: 24px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(urlMessageContainer);
}

// Function to close URL message
function closeUrlMessage(button) {
    const container = button.closest('.special-url-message');
    container.style.animation = 'fadeOut 0.5s ease forwards';
    setTimeout(() => container.remove(), 500);
}

// Function to copy URL to clipboard
function copyUrl(button) {
    const input = button.parentElement.querySelector('input');
    input.select();
    document.execCommand('copy');
    
    // Show feedback
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Function to check URL parameters and initialize counter
function checkUrlAndInitTimeCounter() {
    const urlParams = new URLSearchParams(window.location.search);
    const startParam = urlParams.get('start');
    
    if (startParam) {
        // If URL has start parameter, use it
        const startTime = parseInt(startParam);
        if (!isNaN(startTime)) {
            // Hide question container and show success container
            const questionContainer = document.getElementById('question-container');
            const successContainer = document.getElementById('success-container');
            
            questionContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
            successContainer.style.opacity = '1';
            successContainer.style.transform = 'scale(1)';
            
            // Initialize counter with the URL timestamp
            initTimeCounter(startTime);
        }
    }
}

// Modified initTimeCounter to accept startTime parameter
function initTimeCounter(startTime = null) {
    // Use provided startTime or try to get from URL
    if (!startTime) {
        const urlParams = new URLSearchParams(window.location.search);
        const startParam = urlParams.get('start');
        if (startParam) {
            startTime = parseInt(startParam);
        }
    }
    
    // If no valid startTime, don't start the counter
    if (!startTime || isNaN(startTime)) {
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
    
    // Start auto-scrolling with a pause in the center
    setInterval(() => {
        autoScroll();
    }, 3000); // Change photo every 3 seconds
} 