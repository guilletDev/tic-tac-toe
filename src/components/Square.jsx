//Square es el cuadrado del tablero.
//Propiedad children: lo que quiere tener dentro del tablero, ya sea la x o la o updateBoard: actualizar el tablero al hacer click. Index: para saber la posicion 
//Prop isSelected: booleano que te dice el turno.
export const Square = ({children, isSelected, updateBoard, index }) => {
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
  