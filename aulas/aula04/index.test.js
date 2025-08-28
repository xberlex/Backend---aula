import { soma, subtracao, multiplicacao, divisao } from "./index.js"

console.log(" ")
console.log("Teste da função soma()")
console.log(" ")

if (soma(2, 2) === 4) console.log("Passou o 1°!");
    else console.log("Falhou 1°!");

if (soma(-1, 2) === 1)console.log("Passou o 2°!");
    else console.log("Falhou 2°!")

if (soma(2, 0) === 2)console.log("Passou o 3°!");
    else console.log("Falhou 3°!")

console.log(" ")
console.log("Teste da função subtração()")
console.log(" ")

if (subtracao(4, 2) === 2)console.log("Passou o 4°!");
    else console.log("Falhou 4°!")

if (subtracao(-2, 2) === -4)console.log("Passou o 5°!");
    else console.log("Falhou 5°!")

if (subtracao(-2, 0) === -2)console.log("Passou o 6°!");
    else console.log("Falhou 6°!")

console.log(" ")
console.log("Teste da função multiplicação()")
console.log(" ")

if (multiplicacao(4, 2) === 8)console.log("Passou o 7°!");
    else console.log("Falhou 7°!")

if (multiplicacao(-2, 2) === -4)console.log("Passou o 8°!");
    else console.log("Falhou 8°!")

if (multiplicacao(-2, 0) === 0)console.log("Passou o 9!");
    else console.log("Falhou 9°!")

if (multiplicacao(-2, -2) === 4)console.log("Passou o 10°!");
    else console.log("Falhou 10°!")

console.log(" ")
console.log("Teste da função divisão()")
console.log(" ")

if (divisao(4, 2) === 2)console.log("Passou o 11°!");
    else console.log("Falhou 11°!")

if (divisao(4, -2) === -2)console.log("Passou o 12!");
    else console.log("Falhou 12°!")

if (divisao(4, 0) === undefined)console.log("Passou o 13!");
    else console.log("Falhou 13°!")