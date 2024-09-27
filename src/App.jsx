import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
//Creamos la constante turns, lo que se va a mostrar en la tabla.
const TURNS = {
  X: 'x',
  O: 'o',
}
//Se crea la tabla con un array de 9 elementos donde rellenamos con null.
/* const board = Array(9).fill(null) */
//Pasamos el board a un estado.


// Todos los combos ganadores.
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
 // Estado para iniciar el array con valores null. 
 const [board, setBoard] = useState(Array(9).fill(null))
 // Estado para saber de quien es el turno.
 const [turn, setTurn] = useState(TURNS.X)
 // Estado para indicar ganador. Cuando es null no hay ganador y cuando es false hay empate.
 const [winner, setWinner] = useState(null)

 //Revisamos todas las combinaciones ganadoras para ver si X o O ganó.
 const checkWinner = (boardToCheck)=>{
  //Para cada combinacion que tenemos
  for( const combo of WINNER_COMBOS ){
      //recuperamos posiciones el 0,1,2
      const [a, b, c] = combo 
      if(
        boardToCheck[a] && // si en la posicion 0 hay una X o una O
        boardToCheck[a] === boardToCheck [b] && // si en la posicion 0 y 2 son los mismo
        boardToCheck[a] === boardToCheck[c] // Tendriamos ganador si coincide los tres.
      ){
        return boardToCheck[a] //Devolvemos El Ganador.
      }
      
  }
  return null //Si no hay ganador.
 }

 /*Funcion para resetear el juego */ 
const resetGame = ()=>{
  setBoard (Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
 }

const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=> square !== null)
}

 const updateBoard = (index)=>{
    //Si ya tiene algo dentro o hay ganador no se actualiza al hacer click de nuevo. Esto para que mantenga su valor.
    if(board[index] || winner) return 

    const newBoard = [...board]
    newBoard[index] = turn //X o O
    setBoard(newBoard) //Actualizamos resultado. 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X //Actualizar turno.
    setTurn(newTurn)
    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
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

        {/* Creamos el modal para indicar quien es el ganador */}
        {
          winner !== null && (
            <section className='winner'>
              <div className="text">
                 <h2>
                    {
                       winner === false ? 'Empate' : 'Ganó'
                    }
                 </h2>

                 <header className="win">
                      {winner && <Square>{winner}</Square> }
                 </header>
                 <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                 </footer>
                 
              </div>


            </section>
          )
          
        }
    </main>
      
    
  )
}

export default App
