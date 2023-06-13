import "../style/style.css";
import {
    renderStartPage,
    renderGamePage,
    suitePict,
    renderEndPage,
} from "./render";
import { createRandomCardCollection } from "./tools";

let contentElement: HTMLElement | null = document.querySelector(".container");
let levelOfGame: string;
let gameStatus;

gameStart();

function gameStart() {
    if (contentElement !== null) renderStartPage(contentElement);

    let startButton: any = document.querySelector(".select__startbutton");

    startButton.addEventListener("click", () => {
        if (startButton.disabled === true) {
            alert("Выберите сложность!");
            return;
        }

        levelOfGame = window.localStorage.getItem("level") || "";
        gameStatus = window.localStorage.getItem("gameStatus");

        createRandomCardCollection(levelOfGame);

        if (contentElement !== null && gameStatus !== null)
            renderGamePage(contentElement, gameStatus);

        setTimeout(() => gameTime(), 5001);
    });
}

function gameTime() {
    let reStartButton: any = document.querySelector(".header__button");

    reStartButton.classList.remove("global__button--disabled");

    reStartButton.addEventListener("click", () => {
        gameStart();
    });

    let cardsElement: any = document.querySelectorAll(".card__items");

    let controlArray: any = [];
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
                        gameStatus = window.localStorage.getItem("gameStatus");
                        gameResult = "loss";
                        if (contentElement !== null && gameStatus !== null) {
                            renderEndPage(
                                contentElement,
                                gameStatus,
                                gameResult
                            );
                        }

                        setTimeout(() => {
                            let endStartbutton: any =
                                document.querySelector(".end__startbutton");
                            endStartbutton.addEventListener("click", () => {
                                window.localStorage.removeItem("start");
                                window.localStorage.removeItem("gameStatus");
                                let endContainer: any =
                                    document.querySelector(".end__container");
                                let container: any =
                                    document.querySelector(".container");
                                endContainer.remove();
                                container.style.opacity = "1";
                                gameStart();
                            });
                        }, 1);
                    }
                }
                if (controlArray.length === cardsElement.length) {
                    window.localStorage.setItem("gameStatus", "gameEnd");
                    gameStatus = window.localStorage.getItem("gameStatus");
                    gameResult = "win";
                    if (contentElement !== null && gameStatus !== null) {
                        renderEndPage(contentElement, gameStatus, gameResult);
                    }
                    setTimeout(() => {
                        let endStartbutton: any =
                            document.querySelector(".end__startbutton");
                        endStartbutton
                            .querySelector(".end__startbutton")
                            .addEventListener("click", () => {
                                window.localStorage.removeItem("start");
                                window.localStorage.removeItem("gameStatus");
                                let endContainer: any =
                                    document.querySelector(".end__container");
                                let container: any =
                                    document.querySelector(".end__container");
                                endContainer.remove();
                                container.style.opacity = "1";
                                gameStart();
                            });
                    }, 1);
                }
            }, 5);
        });
    }
}

function cardPictureOnClick(key: any) {
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
