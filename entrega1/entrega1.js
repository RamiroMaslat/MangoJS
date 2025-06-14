
debugger
let carrito = []


function comprobandoValidacion(validacion){
  validacion = parseInt(prompt("Deseas comprar otra producto o ver el carrito?\n1.Si\n2.No"))
  while (validacion !== 1 && validacion !== 2 ) {
    validacion = parseInt(prompt("Debes colocar una opción correcta\n1.Si\n2.No"))
  }
  if (validacion == 1){
    menu = parseInt(prompt("Menú \nAñade algunos de los siguientes productos al carrito\n1-Computadora = $10.000 \n2-Parlante = $5.000\n3-Videojuego = $1.000\n4-Televisor = $50.000\n5-Mesa = $3.000\n6-Ver Carrito\n7-Salir"))
    
  }else{        
    menu = 7
  }
  return menu
  
}


menu = parseInt(prompt("Menú \nAñade algunos de los siguientes productos al carrito\n1-Computadora = $10.000 \n2-Parlante = $5.000\n3-Videojuego = $1.000\n4-Televisor = $50.000\n5-Mesa = $3.000\n6-Ver Carrito\n7-Salir"))

while(menu !== 1 && menu !== 2 && menu !==3 && menu !==4 && menu !== 5 && menu !== 6 && menu !== 7){
  menu = parseInt(prompt("Error, elige una opción correcta"))
}

let compraTotal = 0

while(menu !== 7) {
  let validacion

  switch (menu) {
    case 1:
      compraTotal = compraTotal + 10000
      carrito.push("Computadora = $10.000")
      alert(`Se ha añadido la Computadora al Carrito`)
      comprobandoValidacion();      
      break

    case 2:
      compraTotal = compraTotal + 5000
      carrito.push("Parlante = $5.000")
      alert(`Se ha añadido el Parlante al Carrito`)
      comprobandoValidacion();  
      break

    case 3:
      compraTotal = compraTotal + 1000
      carrito.push("Videojuego = $1.000")
      alert(`Se ha añadido el Videojuego al Carrito`)
      comprobandoValidacion();  
      break

    case 4:
      compraTotal = compraTotal + 50000
      carrito.push("Televisor = $50.000")
      alert(`Se ha añadido el Televisor al Carrito`)
      comprobandoValidacion();  
      break

    case 5:
      compraTotal = compraTotal + 3000
      carrito.push("Mesa = $3.000")
      alert(`Se ha añadido la Mesa al Carrito`)
      comprobandoValidacion();  
      break

    case 6:
      alert(`Su carrito es:\n${carrito}\nPor un total de ${compraTotal}`)   
      comprobandoValidacion();  
      break

    case 7:  
    break       
  } 

}

alert("Gracias por comprar")


