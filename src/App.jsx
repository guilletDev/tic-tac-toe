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

function App() {
 //Estado para iniciar el array con valores null. 
 const [board, setBoard] = useState(Array(9).fill(null))
 // Estado para saber de quien es el turno.
 const [turn, setTurn] = useState(TURNS.X)

 const updateBoard = (index)=>{
    const newBoard = [...board]
    newBoard[index] = turn //X o O
    setBoard(newBoard) //Actualizamos resultado. 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
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
