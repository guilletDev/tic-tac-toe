import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { saveGameToStorage, resetGameStorage } from "./logic/storage"

//Se crea la tabla con un array de 9 elementos donde rellenamos con null.
/* const board = Array(9).fill(null) */
//Pasamos el board a un estado.




function App() {
 // Estado para iniciar el board con una funcion que obtiene valores del localStorage y sino muestra un array con valores null.
 const [board, setBoard] = useState(()=>{
  const boardFromStorage = window.localStorage.getItem('board')
  if(boardFromStorage) return JSON.parse(boardFromStorage) 
   return Array(9).fill(null)
 })
 // Estado para saber de quien es el turno.
 const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
 }  )
 // Estado para indicar ganador. Cuando es null no hay ganador y cuando es false hay empate.
 const [winner, setWinner] = useState(null)

 

 /*Funcion para resetear el juego */ 
const resetGame = ()=>{
  setBoard (Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  //Removemos los valores 
  resetGameStorage()
 }



 const updateBoard = (index)=>{
    //Si ya tiene algo dentro o hay ganador no se actualiza al hacer click de nuevo. Esto para que mantenga su valor.
    if(board[index] || winner) return 

    const newBoard = [...board]
    newBoard[index] = turn //X o O
    setBoard(newBoard) //Actualizamos resultado. 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X //Actualizar turno.
    setTurn(newTurn)
    // Guardar aqui la partida. Usamos localStorage
    saveGameToStorage({board: newBoard , turn: newTurn})

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      //La actualización de los estados en React son asíncrono
      setWinner(newWinner) 
      confetti()
      //No bloquea la ejecución de la función que viene despues
      /* alert(`el ganador es ${newWinner}`) */
      //En caso de hacer un console.log a continuación no mostraria el resultado actualizado.
      //console.log(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //El false indica Empate como indicamos al principio.
    }
 }
 //updateBoard: función
 //updateBoard(): Ejecución de la función. Si pasas la ejecución de la función estaria ejecutandose solo al iniciar la app.
 


  return (
    <main className='board'>
        <h1>Tic-Tac-Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        
        <section className='game'>  
          {board.map((square, index)=>{
              return (
                <Square 
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  
                  
                >
                  {square}
                </Square>
              )
          })}
        </section>
        
        {/* //Creamos la sección para saber de quien es el turno a travez del estado turn. */}
        <section className="turn">
            <Square isSelected={turn === TURNS.X} >
                {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O} >
                {TURNS.O}
            </Square>
        </section>

          <WinnerModal winner={winner} resetGame={resetGame} />
      
    </main>
      
    
  )
}

export default App
