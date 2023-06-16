//----Стартовая страница----

export function renderStartPage(contentElement: HTMLElement) {
    window.localStorage.removeItem("level");
    window.localStorage.removeItem("gameCardCollection");
    window.localStorage.removeItem("fullCardCollection");
    window.localStorage.removeItem("gameStatus");

    let selectPageContent = `<div class="select__container global__container">
                            <div class="select__title">Выбери сложность</div>
                            <div class="select__levelsbox">
                                <div class ="select__levelbutton">1</div>
                                <div class="select__levelbutton">2</div>
                                <div class="select__levelbutton">3</div>
                            </div>     
                            <div class="select__startbutton  global__button global__button--disabled">Старт</div>       
                        </div>`;
    contentElement.innerHTML = selectPageContent;

    let buttonElements: any = document.querySelectorAll(".select__levelbutton");
    let startButton: any = document.querySelector(".select__startbutton");
    startButton.disabled = true;

    for (let key of buttonElements) {
        key.addEventListener("click", () => {
            for (let key of buttonElements) {
                key.classList.remove("select__levelbutton--active");
            }
            key.classList.add("select__levelbutton--active");
            window.localStorage.setItem("level", key.textContent);
            window.localStorage.setItem("gameStatus", "gameTime");
            startButton.disabled = false;
            startButton.classList.remove("global__button--disabled");
        });
    }
}

//----Страница-загрузка игры----

export function renderGamePage(
    contentElement: HTMLElement,
    gameStatus: string
) {
    let gamePageItems = ``;
    let fullGamePageItems = ``;
    let gamePageContent = "";
    let level = "";
    let cardShirt = "close";
    let gameCardCollection = window.localStorage.getItem("gameCardCollection") as string;
    let gameCards: string[] = JSON.parse(gameCardCollection);
    let fullCardCollection = window.localStorage.getItem("fullCardCollection") as string;
    let fullGameCards: string[] = JSON.parse(fullCardCollection);

    let headerElement = `<div class="header__container">
                            <div class="header__timerfield">
                                <div class="header__timertitle">
                                    <div class="header__timernamemin">min</div>
                                    <div class="header__timernamesec">sec</div>
                                </div>
                                <div class="header__timerclock">
                                    <div class="header__timercounter header__timercounter--decimin">0</div>
                                    <div class="header__timercounter header__timercounter--min">0</div>
                                    <div class="header__timercounter header__timercounter--point">.</div>
                                    <div class="header__timercounter header__timercounter--decisec">0</div>
                                    <div class="header__timercounter header__timercounter--sec">0</div>
                                </div>
                            </div>
                            <div class="header__button global__button global__button--disabled">Начать заново</div>
                          </div>`;

    if (gameCards.length === 6) level = "easy";
    if (gameCards.length === 12) level = "medium";
    if (gameCards.length === 18) level = "hard";

    // Первоначально показывем полную колоду (закрытую )

    gamePageContent = `${headerElement}
        
    <div class = "card__container card__container--full center">
        ${getRenderElement(
            fullGamePageItems,
            fullGameCards,
            cardPicture,
            cardShirt
        )}
    </div>`;

    

    // По истечении указанного времени показываем полную колоду(открытую)
    let pauseTime = gameStatus === "gameTime" ? 0 : 0;

    setTimeout(() => {
        cardShirt = "open";
        gamePageContent = `${headerElement}
        
    <div class = "card__container card__container--full center">
        ${getRenderElement(
            fullGamePageItems,
            fullGameCards,
            cardPicture,
            cardShirt
        )}
    </div>`;
        if (gameStatus !== "gameTime") {
            contentElement.innerHTML = gamePageContent;
        }
        
    }, pauseTime);

    if (gameStatus !== "gameTime") return contentElement;

    // По истечении указанного времени показываем игровую колоду(открытую)

    setTimeout(() => {
        gamePageContent = `${headerElement}
            
    <div class = "card__container card__container--${level}">
        ${getRenderElement(gamePageItems, gameCards, cardPicture, cardShirt)}
    </div>`;

        contentElement.innerHTML = gamePageContent;
    }, 0);

    // По истечении указанного времени показываем игровую колоду(закрытую)

    setTimeout(() => {
        cardShirt = "close";
        let startTimer: number = new Date().getTime();

        window.localStorage.setItem("start", String(startTimer));

        gamePageContent = `${headerElement}
            
    <div class = "card__container card__container--${level}">
        ${getRenderElement(gamePageItems, gameCards, cardPicture, cardShirt)}
    </div>`;

        contentElement.innerHTML = gamePageContent;
    }, 5000);
}

// Функция генерирует блок результата игры

export function renderEndPage(
    contentElement: HTMLElement,
    gameStatus: string,
    gameResult: string
) {
    renderGamePage(contentElement, gameStatus);
    setTimeout(() => {
        let endPageContent = document.createElement("div");
        endPageContent.className = "end__container global__container center";
        endPageContent.innerHTML = `<div class="end__img"><img src=${
            gameResult === "win"
                ? '"img/WinImage.svg" alt="Win"'
                : '"img/LossImage.svg" alt="Win"'
        }></div>
                             <div class="end__title"> ${
                                 gameResult === "win"
                                     ? "&nbspВы выиграли!"
                                     : "Вы проиграли!"
                             }</div>
                             <div class="end__text">Затраченное время</div>
                             <div class="end__time">${showFinalTime()}</div>
                             <div class="end__startbutton  global__button ">Играть снова</div>`;
        let newContent: any = document.querySelector(".container");
        newContent.style.opacity = "0.3";
        newContent = newContent.after(endPageContent);
        let endContainer = document.querySelector(".end__container") as HTMLElement;
        endContainer.style.opacity = "1.0";
    }, 0);
}

// ----Ниже находятся вспомогательные функции----

//Функция генерирует контент игровых карт

function getRenderElement(
    element: string,
    Arr: string[],
    cardPicture: (a: string, b: string) => string | undefined,
    cardShirt: string
) {
    for (let key of Arr) {
        element =
            element +
            `<div class ='card__items card__items--${cardShirt}'
                          data-suite=${key[1]}
                          data-dignity=${key[0]}>

                          ${cardPicture(key, cardShirt)}
             </div>`;
    }

    return element;
}
// Функция генерирует игральную карту

function cardPicture(key: string, cardShirt: string): string | undefined {
    if (cardShirt === "open") {
        return `<div class ="card__firstSymbol">
                        ${key[0] === "1" ? "10" : key[0]}
                    </div>
                    <div class ="card__secondSymbol">
                        <img src=${suitePict(key[1])}>
                    </div>
                    <div class ="card__thirdSymbol">
                        <img src=${suitePict(
                            key[1]
                        )} class = 'card__centerPicture'>
                    </div>
                    <div class ="card__fourSymbol ">
                        <img src=${suitePict(key[1])}>
                    </div>
                    <div class ="card__fiveSymbol">
                        ${key[0] === "1" ? "10" : key[0]}
                    </div>`;
    }
    if (cardShirt === "close") {
        return `<div class ="card__shirt">
                    <img src="img/рубашка.svg" alt="Рубашка">
                </div>`;
    }
}

// Функция подставляет рисунок  масти

export function suitePict(suite: string): string | undefined {
    let picture = "";
    if (suite === "s") {
        picture = '"./img/Spades.svg" alt="Пики"';
        return picture;
    }
    if (suite === "d") {
        picture = '"img/Diamonds.svg" alt="<Бубны>"';
        return picture;
    }
    if (suite === "h") {
        picture = '"img/Hearts.svg" alt="Червы"';
        return picture;
    }
    if (suite === "c") {
        picture = '"img/Clubs.svg" alt="Трефы"';
        return picture;
    }
}

// Функция - таймер

function showFinalTime(): string {
    let timeToGame = Math.floor(calculateTime() / 1000);

    let secondNumber = timeToGame > 59 ? timeToGame % 60 : timeToGame;
    let firstNumber = Math.floor(timeToGame / 60);

    let fullTimer = addZero(firstNumber) + "." + addZero(secondNumber);
    return fullTimer;
}
// Вспомогательная функция для showFinalTime()
function calculateTime(): number {
    return new Date().getTime() - Number(window.localStorage.getItem("start"));
}

// Вспомогательная функция для showFinalTime()
function addZero(symbol: number): string {
    return symbol > 9 ? String(symbol) : "0" + String(symbol);
}


