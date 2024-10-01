export const saveGameToStorage = ({ board, turn }) => {
    // Guardar aqui la partida. Usamos localStorage
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    //Removemos los valores 
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

