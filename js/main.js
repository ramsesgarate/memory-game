"use strict";

const mixCards = (arrayCards) => arrayCards.sort(() => 0.5 - Math.random());

const cardsArray = [{
            name: "vue",
            img: "img/logo-vue.png",
        },
        {
            name: "angular",
            img: "img/logo-angular.png",
        },
        {
            name: "golang",
            img: "img/logo-golang.png",
        },
        {
            name: "html",
            img: "img/logo-html.png",
        },
        {
            name: "css",
            img: "img/logo-css.png",
        },
        {
            name: "android",
            img: "img/logo-android.png",
        },
        {
            name: "js",
            img: "img/logo-js.png",
        },
        {
            name: "php",
            img: "img/logo-php.png",
        },
        {
            name: "python",
            img: "img/logo-python.png",
        },
        {
            name: "ruby",
            img: "img/logo-ruby.png",
        },
        {
            name: "swift",
            img: "img/logo-swift.png",
        },
        {
            name: "react",
            img: "img/logo-react.png",
        },
    ],
    game = document.querySelector("#game"),
    grid = document.createElement("section"),
    groupButtons = document.createElement("section"),
    btnStart = document.createElement("button"),
    btnRestart = document.createElement("button"),
    topNav = document.createElement("div"),
    scoreMatch = document.createElement("div"),
    scoreFailed = document.createElement("div"),
    labelMatch = document.createElement("div"),
    labelFailed = document.createElement("div"),
    spanCounterMatch = document.createElement("div"),
    spanCounterFailed = document.createElement("div"),
    div = document.createElement("div"),
    chronometerDisplay = document.createElement("div");

let count = 0,
    gameGrid = mixCards([...cardsArray, ...cardsArray]),
    firstGuess = "",
    secondGuess = "",
    previousTarget = null,
    delay = 1200,
    hours = `00`,
    minutes = `00`,
    seconds = `00`,
    counterMatch = 0,
    counterFailed = 0,
    chronometerCall;

const match = () => {
        let allCardSelected = grid.querySelectorAll(".selected");

        for (const card of allCardSelected) {
            card.classList.add("match");
        }

        if (counterMatch === 12) {
            clearInterval(chronometerCall);
        }
    },
    resetGuess = () => {
        let allCardSelected = grid.querySelectorAll(".selected");
        firstGuess = "";
        secondGuess = "";
        count = 0;

        for (const card of allCardSelected) {
            card.classList.remove("selected");
        }
    },
    mixGameGrid = () => {
        gameGrid = mixCards(gameGrid);
        const allCards = grid.childNodes;

        allCards.forEach((card, index) => {
            card.dataset.name = gameGrid[index].name;
            card.childNodes[1].style.backgroundImage = `url(${gameGrid[index].img})`;
        });
    };

topNav.classList.add("space-between", "topnav");
chronometerDisplay.classList.add("counter", "counter-digit", "chronometer");
scoreMatch.setAttribute("class", "score");
scoreFailed.setAttribute("class", "score");
labelFailed.classList.add("text-style", "label");
labelMatch.classList.add("text-style", "label");
spanCounterFailed.classList.add("counter-digit", "counter");
spanCounterFailed.setAttribute("id", "counterFailed");
spanCounterMatch.classList.add("counter-digit", "counter");
spanCounterMatch.setAttribute("id", "counterMatch");
grid.setAttribute("class", "grid");
groupButtons.setAttribute("class", "box-buttons");
btnRestart.classList.add("btn", "btn-blue", "btn-disabled");
btnStart.classList.add("btn", "btn-blue");

labelFailed.innerText = "Failed";
labelMatch.innerText = "Match";
spanCounterMatch.innerText = counterMatch;
spanCounterFailed.innerText = counterFailed;
chronometerDisplay.innerText = "00:00:00";
btnRestart.innerText = "Restart Game";
btnStart.innerText = "Start Game";

topNav.appendChild(div);
topNav.appendChild(chronometerDisplay);
div.appendChild(scoreMatch);
div.appendChild(scoreFailed);
scoreMatch.appendChild(labelMatch);
scoreMatch.appendChild(spanCounterMatch);
scoreFailed.appendChild(labelFailed);
scoreFailed.appendChild(spanCounterFailed);
game.appendChild(topNav);
game.appendChild(grid);
groupButtons.appendChild(btnStart);
groupButtons.appendChild(btnRestart);
game.appendChild(groupButtons);

btnStart.addEventListener("click", function(event) {
    const allCards = grid.children;

    for (const card of allCards) {
        if (card.classList.contains("disabled-card")) {
            card.classList.remove("disabled-card");
        }
    }

    chronometerCall = setInterval(chronometer, 1000);
    event.target.disabled = true;
    event.target.classList.add("btn-disabled");
    btnRestart.disabled = false;
    btnRestart.classList.remove("btn-disabled");
});

btnRestart.addEventListener("click", function(event) {
    let allCard = grid.childNodes;

    for (const card of allCard) {
        if (card.classList.contains("match")) {
            card.classList.remove("match");
        }

        card.classList.add("disabled-card");
    }

    mixGameGrid();

    clearInterval(chronometerCall);
    resetGuess();
    counterFailed = 0;
    counterMatch = 0;
    spanCounterFailed.innerText = counterFailed;
    spanCounterMatch.innerText = counterMatch;
    hours = "00";
    minutes = "00";
    seconds = "00";
    chronometerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
    btnStart.disabled = false;
    btnStart.classList.remove("btn-disabled");
    event.target.disabled = true;
    event.target.classList.add("btn-disabled");
    previousTarget = null;
});

for (const item of gameGrid) {
    const card = document.createElement("div"),
        front = document.createElement("div"),
        back = document.createElement("div");

    card.classList.add("card", "disabled-card");
    card.dataset.name = item.name;
    front.setAttribute("class", "front");
    back.setAttribute("class", "back");
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

grid.addEventListener("click", function() {
    let clicked = event.target;

    if (
        clicked.nodeName === "SECTION" ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains("selected") ||
        clicked.parentNode.classList.contains("match") ||
        clicked.parentNode.classList.contains("disabled-card")
    ) {
        return;
    }

    if (count < 2) {
        count += 1;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add("selected");
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add("selected");
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                counterMatch += 1;
                spanCounterMatch.innerText = counterMatch;
            } else {
                counterFailed += 1;
                spanCounterFailed.innerText = counterFailed;
            }
            setTimeout(resetGuess, delay);
            previousTarget = null;
        } else {
            previousTarget = clicked;
        }
    }
});

function chronometer() {
    seconds++;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (seconds > 59) {
        seconds = "00";
        minutes++;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
    }

    if (minutes > 59) {
        minutes = "00";
        hours++;

        if (hours < 10) {
            hours = "0" + hours;
        }
    }

    chronometerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
}