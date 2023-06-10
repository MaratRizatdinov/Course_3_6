// Функция получает перетасованную колоду из 36 карт.
//Создает случайный массив карт в зависимости от уровня и помещает в localStorage

export function createRandomCardCollection({ levelOfGame }) {
    let fullCardCollection = [];
    let gameCardCollection = [];
    let cardSuite = ["s", "h", "d", "c"];
    let cardDignity = ["A", "K", "Q", "J", "1", "9", "8", "7", "6"];

    for (let suite of cardSuite) {
        for (let dignity of cardDignity) {
            fullCardCollection.push(dignity + suite);
        }
    }
    window.localStorage.setItem(
        "fullCardCollection",
        JSON.stringify(fullCardCollection)
    );

    shuffle(fullCardCollection);
    if (levelOfGame === "1") fullCardCollection.length = 3;
    if (levelOfGame === "2") fullCardCollection.length = 6;
    if (levelOfGame === "3") fullCardCollection.length = 9;

    gameCardCollection = fullCardCollection.concat(fullCardCollection);

    shuffle(gameCardCollection);

    window.localStorage.setItem(
        "gameCardCollection",
        JSON.stringify(gameCardCollection)
    );
}

// Функция-рандомизатор

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
