
import {it, expect, describe} from "@jest/globals";
const { addZero } = require("./src/js/render");


describe("Проверка работы функции addZero",()=>{
    it('Проверка работы функции при однозначном числе', () => {
        const time =5;
        const result = addZero(time);
        const expected ="05";    
        expect(result).toBe(expected);
    });
    it('Проверка работы функции при двузначном числе ', () => {
        const time =10;
        const result = addZero(time);
        const expected ="10";    
        expect(result).toBe(expected);
    });
    it('Проверка работы функции при нуле', () => {
        const time =0;
        const result = addZero(time);
        const expected ="00";    
        expect(result).toBe(expected);
    });
})
