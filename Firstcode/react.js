// Get elements from the DOM
const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

// Declare variables
let timer;
let redDisplayed;
let timeNow;
let waitingForStart;
let waitingForRed;
let scores;

// Initialize game state
const init = () => {
    redDisplayed = false;
    waitingForStart = false;
    waitingForRed = false;
    scores = [];
};

// Initialize game state
init();

// Function to set the clickable area to red color and start the timer
const setRedColor = () => {
    clickableArea.style.backgroundColor = "#8c0000";
    message.innerHTML = "SHOOT NOW!";
    message.style.color = "#fff";
    redDisplayed = true;
    timeNow = Date.now();
};

// Function to start the game
const startGame = () => {
    clickableArea.style.backgroundColor = "#000435";
    message.innerHTML = "Wait for the Red Color.";
    message.style.color = '#fff';

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setRedColor, randomNumber);

    waitingForStart = false;
    waitingForRed = true;

};

// Event listener for main menu click
mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

// Function to end the game and display the reaction time
const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    });
    
    let averageScore = Math.round(total / scores.length);

    reactionTimeText.innerHTML = `${averageScore} ms`;
};

// Function to display the reaction time and handle game logic
const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    redDisplayed = false;
    waitingForStart = true;
    scores.push(rt);

    if (scores.length >= 3) {
        endGame();
    }
};

// Function to handle the case when user clicks too soon
const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to continue.";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
};

// Event listener for clickable area click
clickableArea.addEventListener("click", () => {
    if (redDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        displayReactionTime(reactionTime);
        return;
    }
    if (waitingForStart) {
        startGame();
        return;
    }
    if (waitingForRed) {
        displayTooSoon();
    }
});

// Event listener for play again button click
playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
});
