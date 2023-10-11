let input = document.getElementById("archivoEntrada")
let areaTexto = document.getElementById("areaTexto")
let tarjeta = document.getElementById("contenedorTarjeta")
let imagenes = document.getElementById("imagen")
let contenedorInput = document.getElementById("contenedorInput")
// console.log(tarjeta.getAttribute('id'))

//Lectura de archivo .txt
input.addEventListener('change', ()=>{
    contenedorInput.setAttribute('class', 'contenedorInputCerrado');//hacemos desaparecer el input a través del cambio de clase.
    const archivos = input.files; //Obtiene los archivos seleccionados por el usuario en el input de selección de archivo.    
    console.log(archivos);
    
    if(archivos.length == 0) return; //Verifica si no se seleccionó ningún archivo y, en ese caso, detiene la ejecución de la función
    const archivo = archivos[0]; // Obtiene el primer archivo seleccionado (asumiendo que solo se permite seleccionar un archivo a la vez).
    const contenido = new FileReader(); //Crea un nuevo objeto FileReader que se utilizará para leer el contenido del archivo seleccionado.

    contenido.onload = (e)=>{ //Define una función que se ejecutará cuando se complete la lectura del archivo. 
        // console.log(e.target.result);
        const resultado =  e.target.result; //Obtiene el contenido del archivo leído y lo almacena en la variable "resultado".
        // console.log(resultado);
        const arrayDeResultado = resultado.split('\r\n') //convierto el resultado en un array separado por línea
        // console.log(arrayDeResultado)
        arrayDeResultado.shift() //le quito el primer elemento que son los titulos de las tablas
        arrayDeResultado.pop() // le quito el último elemento que son unas comillas.
        // console.log(arrayDeResultado) //esto es una arreglo con un string que cada posición. Ese string tiene todos los datos.
        
        const arrayDeResultado2 = []
        for(let item of arrayDeResultado){ //recorremos cada string con los datos
            arrayDeResultado2.push(item.split("'")) //transformamos cada elemento string en un arreglo con cada dato.
        };
        const arrayDeResultado3 = []; //creamos un arreglo vacío que va a ser el definitivo.
        for(let item of arrayDeResultado2){
            arrayDeResultado3.push(item.filter((element)=>{ //filtramos los elementos del array para poder eliminar comillas de más
                return element.length > 1; 
            })
        )};
        const arrayDeResultado4 = arrayDeResultado3.pop();
        crearProductos(arrayDeResultado3);
        console.log(arrayDeResultado3);
        // crearPagina(arrayDeResultado3);
    }
    contenido.readAsText(archivo)
});

//Armado de las imágenes.
const crearProductos = (resultado)=>{
  const fragment = document.createDocumentFragment() //creamos un fragmento para poder agregar las tarjetas
  const productosAgrupados = {}; //Creamos un objeto para los productos agrupados.
  
  for(const item of resultado){
    const imagenRuta = obtenerRutaImagen(item[3]);//la función para crear la ruta la saqué afuera de esta función.
   
    if (!productosAgrupados[imagenRuta]) {//Si no existen claves "imagenRuta" en el objeto...
      productosAgrupados[imagenRuta] = []; //se crea una nueva clave en objeto con el nombre "imagenRuta"
                                          //y se le asigna un arreglo vacío como valor. Este arreglo se va a llenar con los productos asociados 
                                          //"imagenRuta" como clave: productos relacionados como valor.
    }

    productosAgrupados[imagenRuta].push(item);//agregamos los elementos al arrelgo vacíu con clave "imagenRuta"
    console.log(productosAgrupados);

    //Creamos tarjetas para los productos no asociados.
    for(const claves in productosAgrupados){//recorro las claves del objeto
      if(productosAgrupados[claves].length === 1){//busco en cada clave que su valor contenga 1 sólo elemento.
        const producto = productosAgrupados[claves] [0];//como tiene un sólo elemento, lo buscamos en el indice 0 y lo guardamos en producto

        //Creo la tarjeta para el producto NO asociado
        const contenedor = document.createElement('div');//creo el div
        contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');//le asigno la clase
        
        //Creo el elemento imagen
        const imagenes = document.createElement('img');//creo elemento img
        imagenes.setAttribute('class', 'imagen');//le asigno la clase 

        //Creo el contenido de la imagen
          //Código de producto en <p></p>
        const codigoProducto = document.createElement('p');//creo el parrafo para el código de producto
        codigoProducto.textContent = producto[0];//asigno el código que está en el I[0] del arreglo de producto
        codigoProducto.setAttribute('class', 'nombreProducto');//le asigno la clase.
          
          //Nombre de producto en <h5></h5>
        const nombreProducto = document.createElement('h5');//creo el elemento h5
        nombreProducto.textContent = producto[1];//asigno el código que está en el I[1] del arreglo de producto
        nombreProducto.setAttribute('class', 'nombreProducto');//le asigno la clase.

          //Cantidad de producto en <p></p>
        const cantidadProducto = document.createComment('p');//creo el parrafo para el código de producto
        cantidadProducto.textContent = producto[2];//asigno el código que está en el I[2] del arreglo de producto
////////////////////CONTINUAR DESDE ACÁ CON LA CREACIÓN EN BASE AL appDos.js
      }
    }

    //Creo el contenedor de las tarjetas + la clase
    // const contenedor = document.createElement('div');
    // contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');

    // const imagenes = document.createElement('img');//Creo el elemento imagen
    // imagenes.src = imagenRuta;// le asigno la ruta al atributo "src"
    // imagenes.setAttribute('class', 'imagen');//le creo la clase "imagen"
      
    //   Creo la imagen y su atributo src
    //   const imagenes = document.createElement('img');
    //   imagenes.src = `${item[3]}`;
    //   imagenes.setAttribute('class', 'imagen');

      //Creo la imagen y su atributo src
    //   const imagenes = document.createElement('img');
    //   imagenes.src = imagenRuta;
    //   imagenes.setAttribute('class', 'imagen');
  
    //Creo el texto con el código de producto con su clase
    const codigoProducto = document.createElement('p');
    codigoProducto.textContent = `${item[0]}`;
    codigoProducto.setAttribute('class', 'codigoProducto');

    //Creo el nombre del producto con su clase
    const nombreProducto = document.createElement('h5');
    nombreProducto.textContent = `${item[1]}`;
    nombreProducto.setAttribute('class', 'nombreProducto');

    //Creamos la cantidad de productos por caja con su clase.
    const cantidadProducto = document.createElement('p');
    cantidadProducto.textContent = `${item[2]}`;
    cantidadProducto.setAttribute('class', 'cantidadProductos');

    //insertamos los elementos creados en el contenedor
    // console.log(contenedor);
    contenedor.prepend(imagenes) 
    contenedor.append(codigoProducto)
    contenedor.append(nombreProducto)
    contenedor.append(cantidadProducto)
    // console.log(contenedor)

    fragment.appendChild(contenedor)
  }

  // console.log(fragment)
  tarjeta.appendChild(fragment)
}

const obtenerRutaImagen = (rutaLocalCompleta)=>{
  const rutaInputCompleta = item[3]; //Tomo la ruta completa del archivo .txt
  // console.log(rutaLocalCompleta);
  const rutaRelativa = rutaInputCompleta.replace("D:\\", "");//Quitamos el "C:/" de la ruta y generamos una relativa
  // console.log(rutaRelativa);
  const rutaBase = 'imagenes/'; //Genero ruta base para las imágenes dentro del directorio
  return `${rutaBase}${rutaRelativa}`;//armo la ruta completa de las imágenes con relativa + base
}
  


// //Armado de las imágenes.
// const crearProductos = (resultado)=>{
//   const fragment = document.createDocumentFragment() //creamos un fragmento para poder agregar las tarjetas
//   for(const item of resultado){
//     //Creo el contenedor de las tarjetas + la clase
//     const contenedor = document.createElement('div');
//     contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');

//     //Supongamos que item[3] contiene la ruta completa "C:\Fotos\GOLOSINAS\ALFAJORES Y CHOCOLATES\607.jpg"
//     const rutaLocalCompleta = item[3]; //Tomo la ruta completa del archivo .txt
//     // console.log(rutaLocalCompleta);
//     const rutaRelativa = rutaLocalCompleta.replace("D:\\", "");//Quitamos el "C:/" de la ruta y generamos una relativa
//     // console.log(rutaRelativa);
//     const rutaBase = 'imagenes/'; //Genero ruta base para las imágenes dentro del directorio
//     const imagenRuta = `${rutaBase}${rutaRelativa}`;//armo la ruta completa de las imágenes con relativa + base

//     const imagenes = document.createElement('img');//Creo el elemento imagen
//     imagenes.src = imagenRuta;// le asigno la ruta al atributo "src"
//     imagenes.setAttribute('class', 'imagen');//le creo la clase "imagen"
      
//     //   Creo la imagen y su atributo src
//     //   const imagenes = document.createElement('img');
//     //   imagenes.src = `${item[3]}`;
//     //   imagenes.setAttribute('class', 'imagen');

//       //Creo la imagen y su atributo src
//     //   const imagenes = document.createElement('img');
//     //   imagenes.src = imagenRuta;
//     //   imagenes.setAttribute('class', 'imagen');
  
//     //Creo el texto con el código de producto con su clase
//     const codigoProducto = document.createElement('p');
//     codigoProducto.textContent = `${item[0]}`;
//     codigoProducto.setAttribute('class', 'codigoProducto');

//     //Creo el nombre del producto con su clase
//     const nombreProducto = document.createElement('h5');
//     nombreProducto.textContent = `${item[1]}`;
//     nombreProducto.setAttribute('class', 'nombreProducto');

//     //Creamos la cantidad de productos por caja con su clase.
//     const cantidadProducto = document.createElement('p');
//     cantidadProducto.textContent = `${item[2]}`;
//     cantidadProducto.setAttribute('class', 'cantidadProductos');

//     //insertamos los elementos creados en el contenedor
//     // console.log(contenedor);
//     contenedor.prepend(imagenes) 
//     contenedor.append(codigoProducto)
//     contenedor.append(nombreProducto)
//     contenedor.append(cantidadProducto)
//     // console.log(contenedor)

//     fragment.appendChild(contenedor)
//   }

//   // console.log(fragment)
//   tarjeta.appendChild(fragment)
// }
