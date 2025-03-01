document.addEventListener('DOMContentLoaded', () => {
    initHeartEffects();
    
    const questionContainer = document.getElementById('question-container');
    const rejectionContainer = document.getElementById('rejection-container');
    const animationContainer = document.getElementById('animation-container');
    
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

    let p5Instance = null;

    // Function to start printer animation
    function startPrinterAnimation() {
        animationContainer.classList.add('active');
        // Start the p5.js sketch
        p5Instance = new p5((p) => {
            let letters = [];
            let printerEmoji;
            
            p.setup = function() {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('animation-container');
                p.background(0);
                p.textAlign(p.CENTER);
                printerEmoji = p.createDiv('🖨️');
                printerEmoji.style('position', 'absolute');
                printerEmoji.style('font-size', '180px');
                printerEmoji.style('left', '50%');
                printerEmoji.style('top', '50px');
                printerEmoji.style('transform', 'translateX(-50%)');
                printerEmoji.parent('animation-container');
            };
            
            p.draw = function() {
                p.background(0, 5);
                if(p.frameCount % 2 == 0){
                    let letter = new LoveLetter({
                        p: p.createVector(p.width / 2, 250),
                        v: p.createVector(p.random(-5, 5), p.random(-2, -10)),
                        sketch: p
                    });
                    letters.push(letter);
                }
                
                for(let i = letters.length - 1; i >= 0; i--){
                    let letter = letters[i];
                    letter.update();
                    letter.draw();
                    if(letter.isOffscreen()) {
                        letters.splice(i, 1);
                    }
                }
                
                // Make printer emoji shake slightly
                printerEmoji.style('left', `calc(50% + ${p.random(-2, 2)}px)`);
                printerEmoji.style('top', `${50 + p.random(-1, 1)}px`);
            };
        }, 'animation-container');
    }

    // Handle "Yes" click
    yesBtn.addEventListener('click', () => {
        const startTime = new Date().getTime();
        
        // Create floating hearts effect
        const hearts = ['💝', '💖', '💗', '💓', '💕'];
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${1 + Math.random() * 2}s`;
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => heart.remove(), 2000);
        }
        
        // Hide question container with fade out
        questionContainer.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Wait for fade out to complete before showing printer
        setTimeout(() => {
            questionContainer.style.display = 'none'; // Completely hide the question container
            startPrinterAnimation();
            
            // Redirect after animation plays
            setTimeout(() => {
                if (p5Instance) {
                    p5Instance.remove(); // Clean up p5 instance
                }
                // Fade out the entire animation container
                animationContainer.style.transition = 'opacity 0.5s ease';
                animationContainer.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = `timer.html?start=${startTime}`;
                }, 500);
            }, 2500); // Slightly reduced from 3000 to make transition smoother
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

// Add celebration heart styles
const celebrationStyles = document.createElement('style');
celebrationStyles.textContent = `
    .celebration-heart {
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: celebrationFall linear forwards;
    }

    @keyframes celebrationFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyles);
document.head.appendChild(fadeStyles); 