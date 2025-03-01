document.addEventListener('DOMContentLoaded', () => {
    initHeartEffects();
    
    const questionContainer = document.getElementById('question-container');
    const rejectionContainer = document.getElementById('rejection-container');
    const animationContainer = document.getElementById('animation-container');
    
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    // Show question container with smooth animation
    questionContainer.style.opacity = '0';
    questionContainer.style.transform = 'scale(0.95)';
    questionContainer.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    
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

    // Handle "Yes" click with enhanced transitions
    yesBtn.addEventListener('click', () => {
        const startTime = new Date().getTime();
        
        // Create floating hearts effect with enhanced animation
        createEnhancedHeartEffect();
        
        // Fade out question container
        questionContainer.style.animation = 'contentFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        setTimeout(() => {
            questionContainer.style.display = 'none';
            startPrinterAnimation();
            
            setTimeout(() => {
                if (p5Instance) {
                    p5Instance.remove();
                }
                
                // Start page transition
                pageTransition.style.animation = 'pageTransitionIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                
                setTimeout(() => {
                    pageTransition.style.animation = 'pageTransitionOut 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    window.location.href = `timer.html?start=${startTime}`;
                }, 800);
            }, 2000);
        }, 500);
    });

    // Handle "No" click with smooth transitions
    noBtn.addEventListener('click', () => {
        questionContainer.style.animation = 'contentFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        setTimeout(() => {
            questionContainer.classList.add('hidden');
            rejectionContainer.classList.remove('hidden');
            rejectionContainer.style.animation = 'contentFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, 500);
    });

    // Handle "Try Again" click with smooth transitions
    tryAgainBtn.addEventListener('click', () => {
        rejectionContainer.style.animation = 'contentFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        
        setTimeout(() => {
            rejectionContainer.classList.add('hidden');
            questionContainer.classList.remove('hidden');
            questionContainer.style.animation = 'contentFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, 500);
    });
});

// Enhanced heart effect function
function createEnhancedHeartEffect() {
    const hearts = ['💝', '💖', '💗', '💓', '💕'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'celebration-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        const scale = 0.5 + Math.random() * 1;
        const duration = 1000 + Math.random() * 1000;
        const delay = Math.random() * 500;
        
        heart.animate([
            { 
                transform: 'scale(0) rotate(0deg)',
                opacity: 0
            },
            { 
                transform: `scale(${scale}) rotate(${180 + Math.random() * 180}deg)`,
                opacity: 1,
                offset: 0.5
            },
            { 
                transform: `scale(0) rotate(${360 + Math.random() * 180}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            delay: delay,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        });
        
        container.appendChild(heart);
        setTimeout(() => heart.remove(), duration + delay);
    }
    
    setTimeout(() => container.remove(), 2500);
}

// Add enhanced animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
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

    @keyframes contentFadeIn {
        0% {
            opacity: 0;
            transform: scale(0.98);
            filter: blur(10px);
        }
        100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
        }
    }

    .celebration-heart {
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
    }
`;
document.head.appendChild(enhancedStyles); 