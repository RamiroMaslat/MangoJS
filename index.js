



class Producto {
  constructor (id, producto, precio, stock, imagen){
    this.id = id;
    this.producto = producto;
    this.precio = precio;
    this.stock = stock
    this.imagen = imagen
  }  
}

const producto1 = new Producto(0, "Pantalón", 50000, 10, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRC27u0HwETvw68vwc_ZAt6DG1bGs6QAEoZYN6olTvGVrONYnvstZPmmScwM4-HqewXiDYWd8FPCQIpGsdI3QWG_D0cvrz6PcPY9F5um_ygX5Uq2CAoZPzd&usqp=CAc");
const producto2 = new Producto(1, "Remera", 20000, 20, "https://acdn-us.mitiendanube.com/stores/001/312/577/products/remera-essential-negro-fa8d2313b500986c0a17005231430778-1024-1024.jpg");
const producto3 = new Producto(2, "Sweater", 35000, 8, "https://acdn-us.mitiendanube.com/stores/252/220/products/9d1481e7-f3d6-45ae-9761-33718c96772d-9194a4c7b7ff38a3fe17456198022072-1024-1024.png");
const producto4 = new Producto(4, "Camisa", 25000, 7, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRqUL5kDm0oSF3VfT90KuNObAf307vBhdDIqpzyrkKlx8BFLo6wo2S659KRe1_eQZlcatNv8Gg5Woj3APIfkcWH9VOse_ZDzgGf05BHbTunRNP7esr34O8jxp6Qc66jvm5lAuhRF4s&usqp=CAc");
const producto5 = new Producto(3, "Traje de baño", 15000, 12, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRPjNJOCgK1FQGrSm1kvhEwZOZtFy-RiofwfUUil9BY6Dsvs7g23vAX9JwrJeVrq2GIoWYaNcj9vdfgLVJIgKlPoX1ORyQeNL37gcfwJtKYouSezrS2hIuaUJe2yRMCccfsT2fMGQ&usqp=CAc");
const producto6 = new Producto(5, "Bermuda", 40000, 9, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRndXjC_3xBxqVaqOBJOXv0YT8NSOH6-R-Yk3f3JnOvuhFffSywzqlloZvbo42RaZ_Dj9QC2TxXt_dMXrhXohXkQKxxtnOCrNUUYBeFmhaIbh-an8_PqVZcTXtr34X_JljCGjWxty3j&usqp=CAc");
const producto7 = new Producto(6, "Medias", 10000, 15, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRjODO4o7L2zsCi2qoLpYR3TyzO9V5-h0LjPxqDsosgVd3fEqP20bzaWu9GZhuRaRnfLW1PVRnleU4a7TeA2YSlL_24TqRlxAoYmPLYEQ8ervNp6tSeGNJ7QA");
const producto8 = new Producto(7, "Zapatillas", 55000, 5, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRXwC9MSGpwilJ2Fb8W3JKPTQljpTyDxewlj5eZWiJ_nCuHxzxt_YpibY1kx29lTXslDTWaeTvUhmznSx0Q6zueRCP8x86LZuQ3XrQYxCQCw38JgHhTmTlo");

const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8]

const seccionProductos = document.getElementById('productos')
let carrito = JSON.parse(localStorage.getItem('carrito')) || []




function guardarJSON (){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

function renderizarProductos(){
  productos.forEach(producto => {
    seccionProductos.innerHTML += `
    <div id="${producto.id}" class="card text-center mb-3" style="width: 18rem;">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.producto}">
      <div class="card-body">
        <h5 class="card-title">${producto.producto}</h5>
        <p class="card-text">Precio: $${producto.precio}</p>
        <p class="card-text">Stock: ${producto.stock}</p>
        <button id=${producto.id}type="button" class="btn btn-success">Agregar al Carrito</button>
      </div>
    </div>
    `
  });
}




productos.forEach(producto => {
  seccionProductos.innerHTML += `
  <div id="${producto.id}" class="card text-center mb-3" style="width: 18rem;">
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.producto}">
    <div class="card-body">
      <h5 class="card-title">${producto.producto}</h5>
      <p class="card-text">Precio: $${producto.precio}</p>
      <p id=stock${producto.id} class="card-text stock${producto.id}">Stock: ${producto.stock}</p>
      <button id=${producto.id}type="button" class="btn btn-success">Agregar al Carrito</button>
    </div>
  </div>
  `
});


const btnAgregarCarrito = document.querySelectorAll('.btn-success')
const btnVaciarCarrito = document.querySelector('.vaciarCarrito')
const visualizarCarrito = document.querySelector('.botonCarrito')
const seccionCarrito = document.querySelector('.modal-body')
const stockDelProducto = document.querySelector('.stock')
const totalCompra = document.querySelector('.totalCompra')
let valorTotalCompra = carrito.reduce((acc, producto) => acc + producto.precio, 0) 


btnAgregarCarrito.forEach(boton => {
  boton.onclick = () => {
    let productoSeleccionado = productos.find(producto => producto.id === parseInt(boton.id))   
    let index = carrito.findIndex(prod => prod.id === productoSeleccionado.id)
    let productoCarrito = {...productoSeleccionado}
    
    
    const stockProducto = document.getElementById(`stock${productoSeleccionado.id}`)
    if(productoSeleccionado.stock > 0){
      

      if(index === -1){
        carrito.push(productoCarrito = {...productoSeleccionado, cantidad: 1})
        productoSeleccionado.stock--
          
        stockProducto.innerHTML = `Stock: ${productoSeleccionado.stock}`
        totalCompra.innerHTML = `Total: $${valorTotalCompra}`
        
        
      }else{      
        carrito[index].cantidad+=1 
        productoSeleccionado.stock--        
        valorTotalCompra = carrito[index].cantidad * carrito[index].precio
        stockProducto.innerHTML = `Stock: ${productoSeleccionado.stock}`
        totalCompra.innerHTML = `Total: $${valorTotalCompra}`      
       
      }    

    }else {
      stockProducto.innerHTML = `Sin Stock`
      alert('El producto se quedó sin stock')

    }
    
    guardarJSON();   
  } 
})

function vaciarCarrito(){ 
  if(confirm("¿Estás seguro de que querés vaciar el carrito?")){
    seccionCarrito.innerHTML = ''
    carrito.forEach(item => {
      let producto = productos.find(p => p.id === item.id)
      if(producto){
        producto.stock += item.cantidad 
        nuevoStock = document.querySelector(`#stock${producto.id}`)      
        
        if(nuevoStock){
          nuevoStock.innerHTML = `Stock: ${producto.stock}`
        }   
      }    
     
    })    
    carrito = []
    
    
    guardarJSON(); 
  }   
  totalCompra.innerHTML = 'Total: $0'
  renderizarCarrito();
  
}

function renderizarCarrito(){  
    seccionCarrito.innerHTML =''
    totalCompra.innerHTML = `Total: $${valorTotalCompra}`
    if(carrito.length > 0){
    carrito.forEach(item => {    
      seccionCarrito.innerHTML += `
      <div id="${item.id}" class="card text-center mb-3" style="width: 18rem;">
        <img src="${item.imagen}" class="card-img-top" alt="${item.producto}">
        <div class="card-body">
          <h5 class="card-title">${item.producto}</h5>
          <p class="card-text">Precio: $${item.precio}</p>
          <div class="cantidadCarrito">
            <button id="menosCantidad" type="button" class="btn btn-light">-</button>
            <p id="cantidad" "class="card-text">Cantidad: ${item.cantidad}</p>   
            <button id="masCantidad" type="button" class="btn btn-light">+</button>    
          </div>
          
        </div>
      </div>
      `  
      const menosCantidad = document.querySelector('#menosCantidad')
      const masCantidad = document.querySelector('#masCantidad')
      const cantidad = document.querySelector('#cantidad')

      
    })
  }else {
    seccionCarrito.innerHTML = `
        <div class="carritoVacio">
          <p class="">No tienes elementos en el carrito!</p>
          <img src="./img/face.png" class="card-img-top" alt="Carita triste">  
        </div>              
      `  
  }
  

}




visualizarCarrito.onclick = () => {
  renderizarCarrito();
}


btnVaciarCarrito.onclick = () => {
  vaciarCarrito();
}

