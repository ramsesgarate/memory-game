'use strict';

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
    gameGrid = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random()),
    game = document.querySelector("#game"),
    grid = document.createElement("section"),
    groupButtons = document.createElement("section"),
    btnStart = document.createElement("button"),
    btnRestart = document.createElement("button"),
    spanCounterSucces = document.querySelector(".counter-success"),
    spanCounterFailed = document.querySelector(".counter-failed"),
    match = () => {
        let allCardSelected = document.querySelectorAll(".selected");

        for (const card of allCardSelected) {
            card.classList.add("match");
        }
    },
    resetGuess = () => {
        let allCardSelected = document.querySelectorAll(".selected");
        firstGuess = "";
        secondGuess = "";
        count = 0;

        for (const card of allCardSelected) {
            card.classList.remove("selected");
        }
    };

let count = 0,
    firstGuess = '',
    secondGuess = '',
    previousTarget = null,
    delay = 1200,
    hours = `00`,
    minutes = `00`,
    seconds = `00`,
    counterSuccess = 0,
    counterFailed = 0;

grid.setAttribute('class', 'grid');
groupButtons.setAttribute("class", "box-buttons");
btnRestart.classList.add("btn", "btn-blue");
btnStart.classList.add("btn", "btn-blue");

btnRestart.innerText = "Restart Game";
btnStart.innerText = "Start Game";

game.appendChild(grid);
groupButtons.appendChild(btnStart);
groupButtons.appendChild(btnRestart);
game.appendChild(groupButtons);
spanCounterSucces.innerText = counterSuccess;
spanCounterFailed.innerText = counterFailed;

btnStart.addEventListener("click", function(event) {
    const allCards = grid.children;

    for (const card of allCards) {
        if (card.classList.contains("disabled-card")) {
            card.classList.remove("disabled-card");
        }
    }

    setInterval(chronometer, 1000);
    event.target.disabled = true;
})


for (const item of gameGrid) {
    const card = document.createElement('div'),
        front = document.createElement('div'),
        back = document.createElement('div');

    card.classList.add("card", "disabled-card");
    card.dataset.name = item.name;
    front.setAttribute('class', 'front');
    back.setAttribute('class', 'back');
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

grid.addEventListener("click", addClassSelected);

function addClassSelected(event) {
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
            console.log(firstGuess);
            clicked.parentNode.classList.add("selected");
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add("selected");
        }

        if (firstGuess !== '' & secondGuess !== '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                counterSuccess += 1;
                spanCounterSucces.innerText = counterSuccess;
            } else {
                counterFailed += 1;
                spanCounterFailed.innerText = counterFailed;
            }
            setTimeout(resetGuess, delay);
        }
        previousTarget = clicked;
    }
}

function chronometer() {

    seconds++;

    if (seconds < 10) {
        seconds = `0` + seconds;
    }

    if (seconds > 59) {
        seconds = `00`;
        minutes++;

        if (minutes < 10) {
            minutes = `0` + minutes;
        }
    }

    if (minutes > 59) {
        minutes = `00`;
        hours++;

        if (hours < 10) {
            hours = `0` + hours
        }
    }
    console.log(`${hours}:${minutes}:${seconds}`);
}