'use strict';

const cardsArray = [{
            name: "vue",
            img: "img/logo-vue.png"
        },
        {
            name: "angular",
            img: "img/logo-angular.png"
        },
        {
            name: "golang",
            img: "img/logo-golang.png"
        },
        {
            name: "html",
            img: "img/logo-html.png"
        },
        {
            name: "css",
            img: "img/logo-css.png"
        },
        {
            name: "android",
            img: "img/logo-android.png"
        },
        {
            name: "js",
            img: "img/logo-js.png"
        },
        {
            name: "php",
            img: "img/logo-php.png"
        },
        {
            name: "python",
            img: "img/logo-python.png"
        },
        {
            name: "ruby",
            img: "img/logo-ruby.png"
        },
        {
            name: "swift",
            img: "img/logo-swift.png"
        },
        {
            name: "react",
            img: "img/logo-react.png"
        }
    ],
    gameGrid = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random()),
    game = document.querySelector("#game"),
    grid = document.createElement("section"),
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
    delay = 1200;

grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (const item of gameGrid) {
    const card = document.createElement('div'),
        front = document.createElement('div'),
        back = document.createElement('div');

    card.setAttribute('class', 'card');
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
        clicked.parentNode.classList.contains("match")
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
            }
            setTimeout(resetGuess, delay);
        }
        previousTarget = clicked;
    }
}