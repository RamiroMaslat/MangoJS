let productos = []
const URL = "./db/data.json"
function obtenerProductos () {
  const productosEnDOM = localStorage.getItem('productos')
  if(productosEnDOM && productosEnDOM.length > 0){
    productos = JSON.parse(productosEnDOM)  
    mostrarProductos();
  }else{
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      productos = data
      localStorage.setItem('productos', JSON.stringify(productos))
      mostrarProductos();    
    }).catch(error =>
      Swal.fire({
      position: "top",
      icon: "error",
      title: `Error al cargar los productos: ${error}`,
      showConfirmButton: false,
      timer: 5000
    }))      
  }
 
}
const seccionProductos = document.getElementById('productos')

obtenerProductos();

function mostrarProductos () {
  productos.forEach(producto => {
  seccionProductos.innerHTML += `
    <div id="${producto.id}" class="card text-center mb-3" style="width: 18rem;">
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.producto}">
      <div class="card-body">
        <h5 class="card-title">${producto.producto}</h5>
        <p class="card-text">Precio: $${producto.precio}</p>
        <p id=stock${producto.id} class="card-text stock">
          ${producto.stock > 0 ? `Stock: ${producto.stock}` : `<span id="stock${producto.id}">Sin stock</span>`}
        </p>      
        <button id=${producto.id}type="button" class="btn btn-success">Agregar al Carrito</button>
      </div>
    </div>
    `
  });
  agregandoAlCarrito();
  
}


let productosRecuperados = JSON.parse(localStorage.getItem('productos')) 
let carritoRecuperado = JSON.parse(localStorage.getItem('carrito'))
let carrito = carritoRecuperado || []

function guardarJSON() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  localStorage.setItem('productos', JSON.stringify(productos))
}

const btnVaciarCarrito = document.querySelector('.vaciarCarrito')
const visualizarCarrito = document.querySelector('.botonCarrito')
const seccionCarrito = document.querySelector('.modal-body')
const stockDelProducto = document.querySelector('.stock')
const totalCompra = document.querySelector('.totalCompra')

function calcularValorTotal (array){
  let valorTotalCompra = array.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0) 
  return valorTotalCompra
}

function agregandoAlCarrito () {
  const btnAgregarCarrito = document.querySelectorAll('.btn-success')
  btnAgregarCarrito.forEach(boton => {
    boton.onclick = () => {
      let productoSeleccionado = productos.find(producto => producto.id === parseInt(boton.id))   
      let index = carrito.findIndex(prod => prod.id === productoSeleccionado.id)        
      const stockProducto = document.getElementById(`stock${productoSeleccionado.id}`)
      if(productoSeleccionado.stock > 0){     
  
        if(index === -1){
          carrito.push(productoCarrito = {...productoSeleccionado, cantidad: 1})
          productoSeleccionado.stock--          
          stockProducto.innerHTML = `Stock: ${productoSeleccionado.stock}`
          totalCompra.innerHTML = `Total: $${calcularValorTotal(carrito)}`     
        }else{      
          carrito[index].cantidad+=1 
          productoSeleccionado.stock--    
          let valorTotalCompra = carrito[index].cantidad * carrito[index].precio
          stockProducto.innerHTML = `Stock: ${productoSeleccionado.stock}`
          totalCompra.innerHTML = `Total: $${valorTotalCompra}`  
         
        }    
        Toastify({
          text: `El producto "${productoSeleccionado.producto}" se ha agreagdo al carrito`,
          duration: 2500,    
          newWindow: true,
          close: true,    
          gravity: "top", 
          position: "right",
          stopOnFocus: true, 
          style: {
            background: "linear-gradient(to right, #dfa10c, #88932a, #323137)",
          },
          
        }).showToast();
  
      }else {
        
        stockProducto.innerHTML = `<p id=stock class="card-text ">Sin stock</p>`   
        
        Swal.fire({
          position: "top",
          icon: "error",
          title: "El producto se quedó sin stock",
          showConfirmButton: false,
          timer: 1500
        });
      }    
      
      guardarJSON();   
    } 
   
  })
}


function vaciarCarrito(){ 
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      denyButton: "btn btn-danger"
    },
    buttonsStyling: true
  });
  swalWithBootstrapButtons.fire({
    title: "Desea vaciar el carrito?",
    confirmButtonColor: "#198754",
    icon: "question",
    showDenyButton: true,    
    confirmButtonText: "Si",
    denyButtonText: `No`
  }).then((result) => {
    
    if (result.isConfirmed) {      
        seccionCarrito.innerHTML = ''
        carrito.forEach(item => {
          let producto = productos.find(p => p.id === item.id)
          if(producto){
            producto.stock += item.cantidad 
            let nuevoStock = document.querySelector(`#stock${producto.id}`)      
            
            if(nuevoStock){
              nuevoStock.innerHTML = `Stock: ${producto.stock}`
            }   
          }    
         
        })    
        carrito = []   
        guardarJSON();    
        renderizarCarrito();
        totalCompra.innerHTML = 'Total: $0'
            
      swalWithBootstrapButtons.fire("Su carrito ha sido vaciado", "", "success");
    } else if (result.isDenied) {
      swalWithBootstrapButtons.fire("Vaciado del carrito cancelado", "", "error");
    }
  });
  
}

function renderizarCarrito(){  
  seccionCarrito.innerHTML =''
  totalCompra.innerHTML = `Total: $${calcularValorTotal(carrito)}`  
  if(carrito.length > 0){
    carrito.forEach(item => {    
      seccionCarrito.innerHTML += `
        <div id="${item.id}" class="card text-center mb-3" style="width: 18rem;">
          <img src="${item.imagen}" class="card-img-top" alt="${item.producto}">
          <div class="card-body">
            <h5 class="card-title">${item.producto}</h5>
            <p class="card-text">Precio: $${item.precio}</p>
            <div class="cantidadCarrito">
              <button id=${item.id} type="button" class="btn btn-light menosCantidad">-</button>
              <p id=${item.id} class="card-text cantidad">Cantidad: ${item.cantidad}</p>   
              <button id=${item.id} type="button" class="btn btn-light masCantidad">+</button>    
            </div>            
          </div>
        </div>
      `      
    })

    const btnRestarProducto = document.querySelectorAll('.menosCantidad')
    const btnSumarProdcuto = document.querySelectorAll('.masCantidad')
    restarProducto(btnRestarProducto);
    sumarProducto(btnSumarProdcuto);

  }else {
    seccionCarrito.innerHTML = `
      <div class="carritoVacio">
        <p class="">No tienes elementos en el carrito!</p>
        <img src="./img/face.png" class="card-img-top" alt="Carita triste">  
      </div>              
    ` 
    totalCompra.innerHTML = `Total: $${calcularValorTotal(carrito)}` 
  }
  
  
}

visualizarCarrito.onclick = () => {
  renderizarCarrito();    
}

btnVaciarCarrito.onclick = () => {
  vaciarCarrito();
}

function restarProducto(btnRestar){
  btnRestar.forEach(btn =>{
    
    btn.onclick = () =>{      
      let productoSeleccionadoEnCarrito = carrito.find(producto => producto.id === parseInt(btn.id))
      let sumarStockProducto = productos.find(prod => prod.id === productoSeleccionadoEnCarrito.id)
      if(productoSeleccionadoEnCarrito.cantidad > 1){
        const cantidad = document.querySelector(`.cantidad[id="${btn.id}"]`)
        productoSeleccionadoEnCarrito.cantidad --
        
        if(sumarStockProducto){
          sumarStockProducto.stock+=1
          let nuevoStock = document.querySelector(`#stock${sumarStockProducto.id}`)      
          
          if(nuevoStock){
            nuevoStock.innerHTML = `Stock: ${sumarStockProducto.stock}`
          }  
        }    
        cantidad.innerHTML = `Cantidad ${productoSeleccionadoEnCarrito.cantidad}` 
        renderizarCarrito();
        guardarJSON(); 

      }else{
        carrito = carrito.filter(producto => producto.id !== parseInt(btn.id));
        sumarStockProducto.stock++
        productoSeleccionadoEnCarrito.cantidad --
        let nuevoStock = document.querySelector(`#stock${sumarStockProducto.id}`)
        nuevoStock.innerHTML = `Stock: ${sumarStockProducto.stock}`        
        renderizarCarrito();
        guardarJSON(); 
        
      }
    }
  })
}

function sumarProducto(btnSumar){
  btnSumar.forEach(btn => {
    btn.onclick = () =>{
      
      let productoSeleccionadoEnCarrito = carrito.find(producto => producto.id === parseInt(btn.id))
      let stockProducto = productos.find(prod => prod.id === productoSeleccionadoEnCarrito.id)   
      let nuevoStock = document.querySelector(`#stock${stockProducto.id}`)   
      const cantidad = document.querySelector(`.cantidad[id="${btn.id}"]`)
      if(stockProducto.stock === 0){
        
        nuevoStock.innerHTML = `<p id=stock${stockProducto.id} class="card-text stock">${stockProducto.stock > 0 ? `Stock: ${stockProducto.stock}` : `<span id="stock">Sin stock</span>`}</p>`
        Swal.fire({
          position: "top",
          icon: "error",
          title: "El producto se quedó sin stock",
          showConfirmButton: false,
          timer: 1500
        });        
        
      }else{        
        stockProducto.stock--
        productoSeleccionadoEnCarrito.cantidad++ 

        if(nuevoStock){
          nuevoStock.innerHTML = `Stock: ${stockProducto.stock}`  
        }       
      }
      renderizarCarrito();
      guardarJSON(); 
    }
  })
}

const btnPago = document.querySelector('#pago')


btnPago.onclick = () => {
  
  if (carrito.length === 0) {
    Swal.fire({
      confirmButtonColor: "#198754",
      icon: 'warning',
      title: 'Carrito vacío',
      text: 'Agrega productos antes de pagar',
    });
    return;
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
  modal.hide();
  Swal.fire({
    title: 'Completa los datos para finalizar la compra',
    html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre completo">
      <input id="swal-email" class="swal2-input" type="email" placeholder="Correo electrónico">
      <input id="swal-calle" class="swal2-input" placeholder="Calle">
      <input id="swal-numeroCalle" class="swal2-input" placeholder="Número de la dirección">
      <input id="swal-piso" class="swal2-input" placeholder="Piso">
      <input id="swal-telefono" class="swal2-input" placeholder="Teléfono">
    `,
    confirmButtonColor: "#198754",
    cancelButtonColor:"#FF0000",
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Confirmar compra',
    cancelButtonText: 'Cancelar',  
    preConfirm: () => {
      const nombre = document.getElementById('swal-nombre').value;
      const email = document.getElementById('swal-email').value;
      const calle = document.getElementById('swal-calle').value;
      const numeroCalle = document.getElementById('swal-numeroCalle').value
      const piso = document.getElementById('swal-piso').value
      const telefono = document.getElementById('swal-telefono').value

      const direccion = `${calle} ${numeroCalle} Piso: ${piso}`
      const telefonoValido = /^[0-9\s\-().]+$/;
      const pisoValido = /^\d+$/.test(piso);
      const calleValida = /^[a-z\A-Z\s]+$/.test(calle)
      const numeroCalleValido = /^\d+$/.test(numeroCalle);


      switch(true){
        case !nombre || !email || !calle || !numeroCalle || !piso || !telefono:
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false

        case nombre.length < 3:
          Swal.showValidationMessage('El nombre debe tener más de 3 caracteres');
          return false;

        case email.length < 3 || !email.includes('@') || !email.includes('.'):
          Swal.showValidationMessage('Coloca un mail valido')
          return false

        case !calleValida:
          Swal.showValidationMessage('Coloca una calle válida')
          return false

        case !numeroCalleValido || numeroCalle > 70000:
          Swal.showValidationMessage('Debes colocar un número de calle válido')
          return false

        case !pisoValido:
          Swal.showValidationMessage('Debes colocar un piso válido')
          return false

        case telefono.lenght < 5 || !telefonoValido.test(telefono):
          Swal.showValidationMessage('Debes colocar un teléfono válido')
          return false

        default:
          return { nombre, email, calle, numeroCalle, piso, direccion };
      } 
    }

  }).then((result) => {
    if (result.isConfirmed) {
      
      Swal.fire({  
        confirmButtonColor: "#198754",    
        title:'¡Compra realizada!',
        text: `Gracias ${result.value.nombre}, te enviaremos el pedido a ${result.value.direccion}. En breve recibirás un email con la confirmación de la compra`,
        icon: 'success'
      });

      carrito = [];
      guardarJSON();
      renderizarCarrito();
      totalCompra.innerHTML = 'Total: $0';
    }
  });
 
}