import { useState } from "react"
//Creamos la constante turns, lo que se va a mostrar en la tabla.
const TURNS = {
  X: 'x',
  O: 'o',
}
//Se crea la tabla con un array de 9 elementos donde rellenamos con null.
/* const board = Array(9).fill(null) */
//Pasamos el board a un estado.

//Square es el cuadrado del tablero.
//Propiedad children: lo que quiere tener dentro del tablero, ya sea la x o la o updateBoard: actualizar el tablero al hacer click. Index: para saber la posicion 
//Prop isSelected: booleano que te dice el turno.
const Square = ({children, isSelected, updateBoard, index }) => {
  //Se crea constante className para saber cual es seleccionado y se usa como props en el div.
  const className = `square ${ isSelected ? 'is-selected' : ''} `
  //se pasa el indice para saber en cual posición hizo el click.
  const handleClick = ()=>{
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

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
      //No bloquea la ejecución de la función que viene despues
      alert(`el ganador es ${newWinner}`)
      //En caso de hacer un console.log a continuación no mostraria el resultado actualizado.
      //console.log(newWinner)
    }
 }
 //updateBoard: función
 //updateBoard(): Ejecución de la función. Si pasas la ejecución de la función estaria ejecutandose solo al iniciar la app.
 


  return (
    <main className='board'>
        <h1>Tic-Tac-Toe</h1>
        
        <section className='game'>  
          {board.map((_, index)=>{
              return (
                <Square 
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                  
                  
                >
                  {board[index]}
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
    </main>
      
    
  )
}

export default App
