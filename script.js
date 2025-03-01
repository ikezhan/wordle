import { WORDS } from "./words.js";

// Custom message setup with natural words
const MESSAGE_WORDS = ["would", "you", "be", "my", "boy", "friend"]; // Natural words
const WORD_HINTS = [
    "First word of a question ❓",
    "Pointing to someone special 💫",
    "A verb about existing ✨",
    "A possessive word 💝",
    "A young male 👦",
    "Someone close to your heart 💕"
]; // Hints for each word

const NUMBER_OF_GUESSES = 6; // Changed from 8 to 6 attempts
let currentWordIndex = 0;
let completedWords = [];
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = MESSAGE_WORDS[currentWordIndex];

console.log(rightGuessString)

// Function to show/update hint
function updateHint() {
    let oldHint = document.getElementById("hint-area");
    if (oldHint) {
        oldHint.remove();
    }
    
    if (guessesRemaining <= 3) {
        let board = document.getElementById("game-board");
        let hintArea = document.createElement("div");
        hintArea.id = "hint-area";
        hintArea.style.marginTop = "10px";
        hintArea.style.marginBottom = "20px";
        hintArea.style.textAlign = "center";
        hintArea.style.fontSize = "18px";
        hintArea.style.color = "#ff6b6b";
        hintArea.innerHTML = `<strong>Hint:</strong> ${WORD_HINTS[currentWordIndex]}<br><strong>Length:</strong> ${rightGuessString.length} letters`;
        board.parentElement.insertBefore(hintArea, board);
        
        // Add fade-in animation
        hintArea.style.opacity = "0";
        hintArea.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
            hintArea.style.opacity = "1";
        }, 100);
    }
}

function initBoard() {
    let board = document.getElementById("game-board");
    
    // Remove old hint area if it exists
    let oldHint = document.getElementById("hint-area");
    if (oldHint) {
        oldHint.remove();
    }
    
    // Create message display area if it doesn't exist
    if (!document.getElementById("message-area")) {
        let messageArea = document.createElement("div");
        messageArea.id = "message-area";
        messageArea.style.marginBottom = "30px";
        messageArea.style.padding = "15px";
        messageArea.style.textAlign = "center";
        messageArea.style.fontSize = "28px";
        messageArea.style.fontWeight = "bold";
        messageArea.style.opacity = "0";
        messageArea.style.transform = "translateY(-20px)";
        messageArea.style.transition = "all 0.5s ease";
        document.body.insertBefore(messageArea, document.body.firstChild);
        
        setTimeout(() => {
            messageArea.style.opacity = "1";
            messageArea.style.transform = "translateY(0)";
        }, 100);
    }

    // Create the game board
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < rightGuessString.length; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
    
    // Update hint after board is created
    updateHint();
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != rightGuessString.length) {
        toastr.error(`Need ${rightGuessString.length} letters!`)
        return
    }

    for (let i = 0; i < rightGuessString.length; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            animateCSS(box, 'flipInX')
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        setTimeout(() => {
            completedWords.push(rightGuessString);
            
            let messageArea = document.getElementById("message-area");
            messageArea.style.opacity = "0";
            messageArea.style.transform = "translateY(-20px)";
            
            setTimeout(() => {
                messageArea.textContent = completedWords.join(" ");
                messageArea.style.opacity = "1";
                messageArea.style.transform = "translateY(0)";
            }, 300);
            
            if (currentWordIndex === MESSAGE_WORDS.length - 1) {
                toastr.success("🎉 Congratulations! You've completed the message! 💝");
                messageArea.style.animation = "celebrate 1s ease infinite";
                guessesRemaining = 0;
                
                // Add redirection to ending page after a delay
                setTimeout(() => {
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        window.location.href = 'question.html';
                    }, 500);
                }, 1500); // Reduced from 3000 to 1500 ms
            } else {
                currentWordIndex++;
                rightGuessString = MESSAGE_WORDS[currentWordIndex];
                
                // Reset keyboard colors before creating new board
                document.querySelectorAll('.keyboard-button').forEach(button => {
                    button.style.backgroundColor = '';
                });
                
                // Reset game state
                guessesRemaining = NUMBER_OF_GUESSES;
                currentGuess = [];
                nextLetter = 0;
                
                // Reset and create new board
                let board = document.getElementById("game-board");
                board.innerHTML = '';
                initBoard();
                
                toastr.success("✨ Great! Next word!");
            }
        }, 1500);
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        // Update hint after each incorrect guess
        updateHint();

        if (guessesRemaining === 0) {
            toastr.error("Don't worry! Try this word again! 💪");
            toastr.info(`The word was: "${rightGuessString}"`);
            
            // Reset keyboard colors before creating new board
            document.querySelectorAll('.keyboard-button').forEach(button => {
                button.style.backgroundColor = '';
            });
            
            // Reset game state
            guessesRemaining = NUMBER_OF_GUESSES;
            currentGuess = [];
            nextLetter = 0;
            
            // Reset and create new board
            let board = document.getElementById("game-board");
            board.innerHTML = '';
            initBoard();
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === rightGuessString.length) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard()