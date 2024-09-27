import { WINNER_COMBOS } from "../constants"

//Revisamos todas las combinaciones ganadoras para ver si X o O ganó.
export const checkWinnerFrom = (boardToCheck) => {
    //Para cada combinacion que tenemos
    for (const combo of WINNER_COMBOS) {
        //recuperamos posiciones el 0,1,2
        const [a, b, c] = combo
        if (
            boardToCheck[a] && // si en la posicion 0 hay una X o una O
            boardToCheck[a] === boardToCheck[b] && // si en la posicion 0 y 2 son los mismo
            boardToCheck[a] === boardToCheck[c] // Tendriamos ganador si coincide los tres.
        ) {
            return boardToCheck[a] //Devolvemos El Ganador.
        }

    }
    return null //Si no hay ganador.
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}