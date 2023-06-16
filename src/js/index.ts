import "../style/style.css";
import {
    renderStartPage,
    renderGamePage,
    suitePict,
    renderEndPage,
} from "./render";
import { createRandomCardCollection } from "./tools";

let contentElement = document.querySelector(".container") as HTMLElement;
let levelOfGame: string;
let gameStatus: string;

gameStart();

// Стартовая функция. Отвечает за выбор уровня игры, создание игрового контента и время задержки


function gameStart() {
    if (contentElement !== null) renderStartPage(contentElement);

    let startButton: any = document.querySelector(".select__startbutton");

    startButton.addEventListener("click", () => {
        if (startButton.disabled === true) {
            alert("Выберите сложность!");
            return;
        }

        levelOfGame = window.localStorage.getItem("level") || "";
        gameStatus = window.localStorage.getItem("gameStatus") || "";

        createRandomCardCollection(levelOfGame);

        renderGamePage(contentElement, gameStatus);

        setTimeout(() => gameTime(), 5001);
    });
}

// Функция запускает процесс игры и игровой таймер

function gameTime() {
    let reStartButton: any = document.querySelector(".header__button");

    reStartButton.classList.remove("global__button--disabled");

    reStartButton.addEventListener("click", () => {
        gameStart();
    });

    startHeaderTimer();

    let cardsElement: any = document.querySelectorAll(".card__items");

    let controlArray: string[] = [];
    for (let key of cardsElement) {
        key.addEventListener("click", () => {
            let clickCard: string = key.dataset.suite + key.dataset.dignity;
            if (key.classList.contains("card__items--close"))
                controlArray.push(clickCard);
            key.classList.remove("card__items--close");
            key.classList.add("card__items--open");

            key.innerHTML = cardPictureOnClick(key);

            setTimeout(() => {
                let gameResult = "";
                if (controlArray.length > 0 && controlArray.length % 2 === 0) {
                    if (
                        controlArray[controlArray.length - 1] !==
                        controlArray[controlArray.length - 2]
                    ) {
                        window.localStorage.setItem("gameStatus", "gameEnd");
                        gameStatus =
                            window.localStorage.getItem("gameStatus") || "";
                        gameResult = "loss";
                        renderEndPage(contentElement, gameStatus, gameResult);
                        onClickToEndButton();
                    }
                }
                if (controlArray.length === cardsElement.length) {
                    window.localStorage.setItem("gameStatus", "gameEnd");
                    gameStatus =
                        window.localStorage.getItem("gameStatus") || "";
                    gameResult = "win";

                    renderEndPage(contentElement, gameStatus, gameResult);
                    onClickToEndButton();
                }
            }, 5);
        });
    }
}

// Функция- переворот карты при клике на нее

function cardPictureOnClick(key: any): string {
    return `<div class ="card__firstSymbol">
                        ${
                            key.dataset.dignity === "1"
                                ? "10"
                                : key.dataset.dignity
                        }
                    </div>
                    <div class ="card__secondSymbol">
                        <img src=${suitePict(key.dataset.suite)}>
                    </div>
                    <div class ="card__thirdSymbol">
                        <img src=${suitePict(
                            key.dataset.suite
                        )} class = 'card__centerPicture'>
                    </div>
                    <div class ="card__fourSymbol ">
                        <img src=${suitePict(key.dataset.suite)}>
                    </div>
                    <div class ="card__fiveSymbol">
                        ${
                            key.dataset.dignity === "1"
                                ? "10"
                                : key.dataset.dignity
                        }
                    </div>`;
}

// Функция -клик на кнопку "Играть снова"

function onClickToEndButton() {
    setTimeout(() => {
        let endStartbutton: any = document.querySelector(".end__startbutton");
        endStartbutton.addEventListener("click", () => {
            window.localStorage.removeItem("start");
            window.localStorage.removeItem("gameStatus");
            let endContainer = document.querySelector(
                ".end__container"
            ) as HTMLElement;
            let container: any = document.querySelector(".container");
            endContainer.remove();
            container.style.opacity = "1";
            gameStart();
        });
    }, 1);
}

// Функция- таймер игры

function startHeaderTimer() {

    //  таймер секунд

    let secundTablo = document.querySelector(
        ".header__timercounter--sec"
    ) as HTMLElement;
    let secundCounter = 0;
    let secundId = setInterval(() => {
        let gameStatus = window.localStorage.getItem("gameStatus");

        secundCounter++;
        secundCounter >= 10 ? (secundCounter = 0) : secundCounter;
        secundTablo.textContent = String(secundCounter);

        if (gameStatus !== "gameTime") {
            clearInterval(secundId);
        }
    }, 1000);

    //  таймер десятков секунд

    let deciSecundTablo = document.querySelector(
        ".header__timercounter--decisec"
    ) as HTMLElement;
    let deciSecundCounter = 0;
    let deciSecundId = setInterval(() => {
        let gameStatus = window.localStorage.getItem("gameStatus");

        deciSecundCounter++;
        deciSecundCounter >= 6 ? (deciSecundCounter = 0) : deciSecundCounter;
        deciSecundTablo.textContent = String(deciSecundCounter);

        if (gameStatus !== "gameTime") {
            clearInterval(deciSecundId);
        }
    }, 10000);

    //  таймер минут

    let minuteTablo = document.querySelector(
        ".header__timercounter--min"
    ) as HTMLElement;
    let minuteCounter = 0;
    let minuteId = setInterval(() => {
        let gameStatus = window.localStorage.getItem("gameStatus");

        minuteCounter++;
        minuteCounter >= 10 ? (minuteCounter = 0) : minuteCounter;
        minuteTablo.textContent = String(minuteCounter);

        if (gameStatus !== "gameTime") {
            clearInterval(minuteId);
        }
    }, 60000);

    //  таймер десятков минут

    let deciMinuteTablo = document.querySelector(
        ".header__timercounter--decimin"
    ) as HTMLElement;
    let deciMinuteCounter = 0;
    let deciMinuteId = setInterval(() => {
        let gameStatus = window.localStorage.getItem("gameStatus");

        deciMinuteCounter++;
        deciMinuteCounter >= 10 ? (deciMinuteCounter = 0) : deciMinuteCounter;
        deciMinuteTablo.textContent = String(deciMinuteCounter);

        if (gameStatus !== "gameTime") {
            clearInterval(deciMinuteId);
        }
    }, 600000);

    //------------------------------------------------------------------------------------
}
