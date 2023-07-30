// Функция получает перетасованную колоду из 36 карт.
//Создает случайный массив карт в зависимости от уровня и помещает в localStorage

export function createRandomCardCollection( levelOfGame:string ='' ) {
    const fullCardCollection: string[] = [];
    let gameCardCollection: string[] = [];
    const cardSuite: string[] = ["s", "h", "d", "c"];
    const cardDignity: string[] = ["A", "K", "Q", "J", "1", "9", "8", "7", "6"];

    for (const suite of cardSuite) {
        for (const dignity of cardDignity) {
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

function shuffle(array: string[] = []) {
    array.sort(() => Math.random() - 0.5);
}
function summa(a:number,b:number){
    return a+b;
}
console.log(summa(150,15));