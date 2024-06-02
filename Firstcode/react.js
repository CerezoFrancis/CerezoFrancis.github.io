const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let timer;
let redDisplayed;
let timeNow;
let waitingForStart;
let waitingForRed;
let scores;

const init = () => {
    redDisplayed = false;
    waitingForStart = false;
    waitingForRed = false;
    scores = [];
};

init();

const setRedColor = () => {
    clickableArea.style.backgroundColor = "#8c0000";
    message.innerHTML = "SHOOT NOW!";
    message.style.color = "#fff";
    redDisplayed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "#000435";
    message.innerHTML = "Wait for the Red Color.";
    message.style.color = '#fff';

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setRedColor, randomNumber);

    waitingForStart = false;
    waitingForRed = true;

};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

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

const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to continue.";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
};

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

playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
});