let input = document.getElementById("archivoEntrada")
let areaTexto = document.getElementById("areaTexto")
let tarjeta = document.getElementById("contenedorTarjeta")
let imagenes = document.getElementById("imagen")
let contenedorInput = document.getElementById("contenedorInput")
// console.log(tarjeta.getAttribute('id'))

/////////////////////////////Código propio/////////////////////
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
        
        // for(let item of arrayDeResultado3){
        //   console.log(item);
        //     // item.pop();
        //     item.push("imagenes/4450.jpg"); //imagenes/chocolate1.jfif 
        // }
        const arrayDeResultado4 = arrayDeResultado3.pop();
        crearProductos(arrayDeResultado3);
        console.log(arrayDeResultado3);
        // crearPagina(arrayDeResultado3);
    }
    contenido.readAsText(archivo)
});


const crearProductos = (resultado)=>{
  const fragment = document.createDocumentFragment() //creamos un fragmento para poder agregar las tarjetas
  for(const item of resultado){
      //Creo el contenedor de las tarjetas + la clase
      const contenedor = document.createElement('div');
      contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');

    // Comienza la prueba de chatGPT
    // Supongamos que item[3] contiene la ruta completa "C:\Fotos\GOLOSINAS\ALFAJORES Y CHOCOLATES\607.jpg"
    const rutaLocalCompleta = item[3];
    console.log(rutaLocalCompleta);
    // Quita "C:/" de la ruta local
    const rutaRelativa = rutaLocalCompleta.replace("D:\\", "");
    console.log(rutaRelativa);

    // Construye la ruta completa en función de la ubicación de tu proyecto web
    const rutaBase = 'imagenes/'; // Ruta base para las imágenes
    const imagenRuta = `${rutaBase}${rutaRelativa}`;

    const imagenes = document.createElement('img');
    imagenes.src = imagenRuta;
    imagenes.setAttribute('class', 'imagen');
      
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


// //////////////////////Código hecho con PAPA PARSE://////////////////////
// // // Escuchar el evento de cambio del elemento <input>
// // input.addEventListener('change', (event) => {
// //   // Obtener el archivo seleccionado
// //   const file = event.target.files[0];

// //   // Leer el archivo con papa parse
// //   Papa.parse(file, {
// //     complete: (results) => {
// //       // Aquí tienes acceso a los datos parseados en 'results.data'
// //       const dataArray = results.data;
// //       // Haz lo que necesites con el array iterable 'dataArray'
// //       dataArray.shift();
// //       console.log(dataArray);
// //       const casiDefinitivo = dataArray.filter( array => array.length >= 4);
// //       console.log(casiDefinitivo);
// //     }
// //   });
// // });

// let resultadoCasiDefinitivo;

// input.addEventListener('change',  (event) => {
//   const file = event.target.files[0];
  
//   Papa.parse(file, {
//     complete: (results) => {
//       const dataArray = results.data;
//       dataArray.shift();
//       const casiDefinitivo = dataArray.filter((array, index, self) => {
//         const ultimoElemento = array[array.length - 1];
//         return self.some((a, i) => i !== index && a[a.length - 1] === ultimoElemento);
//       });
//       console.log(casiDefinitivo);

//       resultadoCasiDefinitivo = casiDefinitivo; // Asignar el valor al resultado fuera de la función

//       console.log(resultadoCasiDefinitivo);
//     }
//   });
// });

// Puedes utilizar resultadoCasiDefinitivo aquí o en cualquier otro lugar fuera de la función
// console.log(resultadoCasiDefinitivo);




