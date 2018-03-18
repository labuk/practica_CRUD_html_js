// Clase para crear nuevos productos
class Producto {
  // Contructor (string, string, string, float, int)
  constructor(pId, pNom, pRef, pDep, pPre, pSto){
    this.pId  = pId;  // Identificador
    this.pNom = pNom; // Nombre
    this.pRef = pRef; // Referencia
    this.pDep = pDep; // Departament
    this.pPre = pPre; // Precio
    this.pSto = pSto; // Stock
  }
}; // End class Producto

// Clase CRUD de Producto en Vista Administrador
class ProductoManager{

  // tipo = 0; //Vista administrador
  // tipo = 1; //Vista vendedor
  constructor(tipo){
    this.id = 0;
    this.tipo = tipo;
    this.productoArray = [];
  } // End constructor

  // Devuelve un valor único de identificador
  newId(){
    return ++this.id;
  } // End newId


  // Añade un objeto de la class Producto al array
  addProduct(producto){
    var lenght = this.productoArray.push(producto);
    //console.log(lenght);
    // Añade una fila con el nuevo producto
    this.addLineToHTMLTable(lenght-1);
    //console.log(producto);
    // Salva el nuevo array a memoria local
    this.saveProductArray();
  } // End addProduct


  // Borra un objeto de la class Producto del array
  deleteProduct(index_array){
    var lenght = this.productoArray.splice(index_array, 1);
    // Guarda el array en localStorage
    this.saveProductArray();
  } // End deleteProduct


  // Carga el array de Productos
  loadProductArray(){
    // Inicializamos localStorage
    localStorage.pm = localStorage.pm || 0;

    // localStorage.pm está vacío ? Rellena datos : Carga pm con localStorage.pm
    if (localStorage.pm == 0) {
      // Creamos elementos para que la tabla no aparezca vacía
      var p1 = new Producto(pm.newId(),'Lapiz','P1','Papelería',1.0,10);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Goma','P2','Papelería',2.0,10);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'CD','T1','Tecnología',4.1,9);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Regla','P3','Papelería',1.5,4);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Diccionario','L1','Librería',14.5,1);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Toner','T2','Tecnología',4.9,3);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Folios','P4','papelería',3,15);
      pm.addProduct(p1);
      var p1 = new Producto(pm.newId(),'Revista','L2','Librería',2.1,3);
      pm.addProduct(p1);
      localStorage.pm = JSON.stringify(pm);
    } else {
      var loadPM = JSON.parse(localStorage.pm);
      this.id = loadPM.id;
      this.productoArray = loadPM.productoArray;
      pm.buildTable();
    } // End if localstorage.pm

  } // End loadProductArray

  // Salva el array de Productos
  saveProductArray(){
    // Guardamos en localStorage
    localStorage.pm = JSON.stringify(pm);
  } // End saveProductArray

  // Actualiza el valor de pSto - variable de Stock
  buyProduct(index){
    this.productoArray[index].pSto--;
  } // End buyProduct


  // Actualiza el objeto Product del array
  updateProduct(index, pNom, pRef, pDep, pPre, pSto){
    this.productoArray[index].pNom = pNom; // Nombre
    this.productoArray[index].pRef = pRef; // Referencia
    this.productoArray[index].pDep = pDep; // Departament
    this.productoArray[index].pPre = pPre; // Precio
    this.productoArray[index].pSto = pSto; // Stock
    console.log(this.productoArray[index]);
    // Guardamos el nuevo Producto
    this.saveProductArray();
  } // End buyProduct

  // Crea la tabla de productos
  buildTable(){
    // Get the body of the table using the selector API
    for(let j in this.productoArray) {
      this.addLineToHTMLTable(j);
    }
  } // End buildTable



  // Añade la linea con el elemento del index del array a la tabla Html
  addLineToHTMLTable(index_array, index_table = -1) {
    // Get the body of the table using the selector API
    var tableBody = document.querySelector("#tableContactBody");
  
    // Obtengo el elemento del array
    var producto = this.productoArray[index_array];

    // Comprueba si queda Stock en la vista vendedor. La vista Admin muestra todo
    if(producto.pSto > 0 || this.tipo == 0){

      // Añade una nueva fila a la tabla
      // index_table = -1 -> Nueva fila. Se añade al final
      // index_table != -1 -> Fila modificada. Se añade en la posición que ocupaba en la tabla
      //console.log("Indice de tabla");
      //console.log(index_table);
      if(index_table == -1) {
        var lastRow = tableBody.rows.length
        var newRow = tableBody.insertRow(lastRow);
      } else {
        // Le resto uno porque inserta en la fila siguiente al indice
        var newRow = tableBody.insertRow(index_table-1);
      }
      // - Celda Id
      var idCell  = newRow.insertCell();
      idCell.innerHTML = producto.pId;
      // - Celda botón comprar - Sólo en vista vendedor tipo == 1
      if(this.tipo == 1) { // Vista Vendedor
        // - Button Buy
        var buyCell  = newRow.insertCell();
        var buttonBuy = document.createElement('button');
          buttonBuy.classList.add("btn");
          buttonBuy.classList.add("btn-success");
          buttonBuy.classList.add("btn-sm");
          buttonBuy.innerHTML = 'Compra';
          // Guardamos la posición en productoArray[]
          buttonBuy.value = index_array;
          // Añado Listener al boton para borrar elemento
          buttonBuy.addEventListener("click", function(){
            console.log("Click Compra Button");
            // Tengo que usar el objeto pm porque cambia el objeto de referencia this por el botón
            console.log(this);
            // ( valor del boton con el índice del array, valor de la final en la tabla) 
            pm.toBuyList(this.value, this.parentNode.parentNode.rowIndex);
          });
        // Añado el botón Buy a la tabla
        buyCell.appendChild(buttonBuy);
      }// End Botón comprar
      // - Celda Nombre
      var nomCell  = newRow.insertCell();
      nomCell.innerHTML = producto.pNom;
      // - Celda Referencia
      var refCell   = newRow.insertCell();
      refCell.innerHTML = producto.pRef;
      // - Celda Departamento
      var depCell  = newRow.insertCell();
      depCell.innerHTML = producto.pDep;
      // - Celda Precio
      var preCell  = newRow.insertCell();
      preCell.innerHTML = producto.pPre;
      // - Celda Stock
      var stoCell  = newRow.insertCell();
      stoCell.innerHTML = producto.pSto;
      // - Celda Botón Delete - Sólo en vista admin tipo == 0
      if(this.tipo == 0){ // Vista Administrador
        // - Button Delete
        var deleteCell  = newRow.insertCell();
        var buttonDelete = document.createElement('button');
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn-danger");
        buttonDelete.classList.add("btn-sm");
        buttonDelete.innerHTML = 'Borrar';
        // Guardamos la posición en productoArray[]
        buttonDelete.value = index_array;
        // Añado Listener al boton para borrar elemento
        buttonDelete.addEventListener("click", function(){
          if (confirm("¿Quieres borrar el producto?")) {
            pm.deleteProduct(this.value);
            ProductoManager.deleteRow(this.parentNode.parentNode.rowIndex);
          }         
        });
        // Añado el botón Delete a la tabla
        deleteCell.appendChild(buttonDelete);
        // - Button Update
        var updateCell = newRow.insertCell();
        var buttonUpdate = document.createElement('button');
        buttonUpdate.classList.add("btn");
        buttonUpdate.classList.add("btn-warning");
        buttonUpdate.classList.add("btn-sm");
        buttonUpdate.innerHTML = 'Actualizar';
        // Guardamos la posición en productoArray[]
        buttonUpdate.value = index_array;
        buttonUpdate.addEventListener("click", function(){
          // Escondemos el botón addProducto y mostramos el updateProducto
          document.querySelector("#addProducto").style.display = "none";
          document.querySelector("#updateProducto").style.display = "block";
          // Rellenamos los campos del formulario
          document.querySelector("#pArrayIndex").value = this.value; // Input hidden
          document.querySelector("#pNom").value = pm.productoArray[this.value].pNom;
          document.querySelector("#pRef").value = pm.productoArray[this.value].pRef;
          document.querySelector("#pPre").value = pm.productoArray[this.value].pPre;
          document.querySelector("#pSto").value = pm.productoArray[this.value].pSto;
          // Marcamos el radioButton que corresponda
          var pDep  = document.querySelectorAll(".pDep");
          for (var i = pDep.length - 1; i >= 0; i--) {
            if(pDep[i].value == pm.productoArray[this.value].pDep){
              pDep[i].checked = "true";
            }
          // Guardamos el nº de fila de la tabla en el value del boton updateProducto
          document.querySelector("#updateProducto").value = this.parentNode.parentNode.rowIndex;
          }
          //document.querySelector(".pDep:checked").value;  
        });
        updateCell.appendChild(buttonUpdate);
      }// End Botón delete 
    }// End if stock
  }// End addLineToHTMLTable


  // deleteRow(celda element) 
  // - Elmina la fila = tableIndex, de la tabla con 
  static deleteRow(tableIndex){
    document.querySelector("#tableProduct").deleteRow(tableIndex);
  } // End deleteRow


  // updateRow(celda element) 
  // - Actualiza la fila = tableIndex de la tabla
  updateRow(arrayIndex, tableIndex, pNom, pRef, pDep, pPre, pSto){
    this.updateProduct(arrayIndex, pNom, pRef, pDep, pPre, pSto)
    ProductoManager.deleteRow(tableIndex);
    this.addLineToHTMLTable(arrayIndex, tableIndex);
  } // End deleteRow


  // El vendedor pulsa el botón comprar, actualizamos el stock y añadimos a la lista de la compra
  toBuyList(arrayIndex, tableIndex){
    // Actualizamos el stock
    this.buyProduct(arrayIndex);
    // Borro la linea de la tabla y la vuelvo a crear con nuevo valor de stock
    ProductoManager.deleteRow(tableIndex);
    this.addLineToHTMLTable(arrayIndex, tableIndex);
    // Lista ul de la compra
    var ulBuy = document.querySelector("#listProduct ul");
    var liBuy = document.createElement('li');
      liBuy.innerHTML = this.productoArray[arrayIndex].pNom + '<div class="pull-right">'
                + this.productoArray[arrayIndex].pPre + " €" + '</div>';
    ulBuy.appendChild(liBuy);
    // span Precio total
    var precioTotal = document.querySelector("#listPrecio");
    // El parseFloat produce cifras decimales pequeñas - Lo solucionana redondeando
    precioTotal.innerHTML = Math.round(parseFloat(precioTotal.innerHTML)*100 
              + parseFloat(this.productoArray[arrayIndex].pPre)*100)/100 + " €";
  } // End toBuyList

}; // End class ProductManager


// Función de inicialización del script
function init(tipo){

  // Variable Global 
  pm = new ProductoManager(tipo); //Class ProductoManager
  pm.loadProductArray();

  // JS vista Administrador
  if(tipo == 0) {
    // Listener de Submit del formulario Producto
    document.querySelector("#addProducto").addEventListener("click", readFormToProduct);
    // Listener del botón para Limpiar el formulario Producto
    document.querySelector("#cleanProducto").addEventListener("click", cleanForm);
    // Listener del botón para Modificar un Producto
    document.querySelector("#updateProducto").addEventListener("click", updateFormToProducto);
  } 

  if(tipo == 1) {
    // Listener del botón para Finalizar una Compra
    document.querySelector("#finishBuy").addEventListener("click", finishBuy);
  }

} // End init(tipo)


// Guarda el formulario en el array
function readFormToProduct(){
    console.log('Click #addProducto');
    // Campos formulario: pNom, pRef, pDep, pPre, pSto
    let pNom = document.querySelector("#pNom").value;
    let pRef = document.querySelector("#pRef").value;
    let pPre = document.querySelector("#pPre").value;
    let pSto = document.querySelector("#pSto").value;
    let pDep = document.querySelector(".pDep:checked").value;
    if(pNom && pRef && pPre && pSto && pDep) {
      let p_new = new Producto(pm.newId(),pNom,pRef,pDep,pPre,pSto);
      pm.addProduct(p_new);
      // Limpiamos formulario
      cleanForm();
      $("#mySuccess").collapse('show');
    } else {
      $("#myAlert").collapse('show');
    }
}

// Devuelve el formulario a su estado original
function cleanForm(){
    console.log('Click #addProducto');
    // Mostramos el botón addProducto si estuviera oculto
    document.querySelector("#updateProducto").style.display = "none";
    document.querySelector("#addProducto").style.display = "block";
    // Campos formulario: pNom, pRef, pDep, pPre, pSto
    document.querySelector("#pNom").value = "";
    document.querySelector("#pRef").value = "";
    document.querySelector("#pPre").value = "";
    document.querySelector("#pSto").value = "";
}

// Actualiza la fila con los valores del formulario
function updateFormToProducto(){
  console.log('Click #updateProducto');
  var arrayIndex = document.querySelector("#pArrayIndex").value;
  var tableIndex = document.querySelector("#updateProducto").value;
  // Campos formulario: pNom, pRef, pDep, pPre, pSto
  let pNom = document.querySelector("#pNom").value;
  let pRef = document.querySelector("#pRef").value;
  let pPre = document.querySelector("#pPre").value;
  let pSto = document.querySelector("#pSto").value;
  let pDep = document.querySelector(".pDep:checked").value;
  if(pNom && pRef && pPre && pSto && pDep) {
    pm.updateRow(arrayIndex, tableIndex, pNom, pRef, pDep, pPre, pSto);
    cleanForm();
    $("#myWarning").collapse('show');
  } else {
    $("#myAlert").collapse('show');
  }
}

// Limpia lista de la compra y salva el ProductArray con el Stock modificado
function finishBuy(){
  console.log('Click #finishBuy');
  if(confirm("El importe total de la compra es " +document.querySelector("#listPrecio").innerHTML+ " ¿Finaliza la compra? ")){
    document.querySelector("#listProduct ul").innerHTML = "";
    document.querySelector("#listPrecio").innerHTML = "0";
    pm.saveProductArray();
    $("#myAlert").collapse('show');
  }

}

// Variable Global 
var pm; //Class ProductoManager


// Bootstrap
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
})