const input = document.getElementById("archivoEntrada");
const areaTexto = document.getElementById("areaTexto");
const tarjeta = document.getElementById("contenedorTarjeta");
const imagenes = document.getElementById("imagen");
const contenedorInput = document.getElementById("contenedorInput");

//Función para leer el archivo .txt que ingresa por el imput.
input.addEventListener('change', ()=>{
    contenedorInput.setAttribute('class', 'contenedorInputCerrado');//hacemos desaparecer el input a través del cambio de clase.
    const archivos = input.files; //Obtiene los archivos seleccionados por el usuario en el input de selección de archivo.    
    
    if(archivos.length == 0) return; //Verifica si no se seleccionó ningún archivo y, en ese caso, detiene la ejecución de la función
    const archivo = archivos[0]; // Obtiene el primer archivo seleccionado (asumiendo que solo se permite seleccionar un archivo a la vez).
    const contenido = new FileReader(); //Crea un nuevo objeto FileReader que se utilizará para leer el contenido del archivo seleccionado.

    contenido.onload = (e)=>{ //Define una función que se ejecutará cuando se complete la lectura del archivo. 
        const resultado =  e.target.result; //Obtiene el contenido del archivo leído y lo almacena en la variable "resultado".
        const arrayDeResultado = resultado.split('\r\n'); //convierto el resultado en un array separado por línea.
        arrayDeResultado.shift(); //le quito el primer elemento que son los titulos de las tablas.
        arrayDeResultado.pop(); // le quito el último elemento que son unas comillas.
        const arrayDeResultado2 = []; //genero un nuevo arreglo para ir agregando los elementos modificados nuevos.
        for(let item of arrayDeResultado){ //recorremos cada string con los datos.
            arrayDeResultado2.push(item.split("'")); //transformamos cada elemento string en un arreglo con cada dato.
        };
        const arrayDeResultado3 = []; //creamos un arreglo vacío que va a ser el definitivo.

        for(let item of arrayDeResultado2){
            arrayDeResultado3.push(item.filter((element)=>{ //filtramos los elementos del array para poder eliminar comillas de más.
                return element.length > 1; 
            })
        )};

        crearProductos(arrayDeResultado3);
    };

    contenido.readAsText(archivo)
});

const obtenerRutaImagen = (rutaLocalCompleta)=>{
  const rutaInputCompleta = rutaLocalCompleta; //Tomo la ruta completa del archivo .txt
  const rutaRelativa = rutaInputCompleta.replace("D:\\", "");//Quitamos el "D:/" de la ruta y generamos una relativa
  const rutaBase = 'imagenes/'; //Genero ruta base para las imágenes dentro del directorio
  return `${rutaBase}${rutaRelativa}`;//armo la ruta completa de las imágenes con relativa + base
};

// Función que crea las tarjetas de productos, asociados y NO asociados.
const crearProductos = (resultado)=>{
  const fragment = document.createDocumentFragment() //creamos un fragmento para poder agregar las tarjetas y optimizar el proceso.
  const productosAgrupados = {}; //Creamos un objeto para los productos agrupados.
  
  for(const item of resultado){ //recorremos el arreglo con todos los productos para leer sus datos.
    const imagenRuta = obtenerRutaImagen(item[3]);//la función para crear la ruta la saqué afuera de esta función.
      
    if(!productosAgrupados[imagenRuta]){//Si no existen claves "imagenRuta" en el objeto productosAgrupados.
      productosAgrupados[imagenRuta] = {//creo la clave imagenRuta y como valor un objeto de dos propiedades.
        imagenes: [],//propiedad imagen.
        productos: []//propiedad producto.
      };
    };
    
    //lleno los clave/arreglos imagen y productos del objeto productosAgrupados.
    productosAgrupados[imagenRuta].imagenes.push(imagenRuta);//lleno el clave/arreglo imagenes con todas las rutas de imágenes
    productosAgrupados[imagenRuta].productos.push(item);//lleno la clave/arreglo productos con las descripciones.
  };

  for (const imagenRuta in productosAgrupados) {//recorro el objeto productosAgrupados que ya está completo de productos.
  
    if (productosAgrupados[imagenRuta].imagenes.length > 1) { // Verificamos si hay imágenes repetidas
      const contenedor = document.createElement('div'); //creamos el contenedor tarjeta.
      contenedor.setAttribute('class', 'contenedorDinamicoTarjeta'); //creamos la clase

      const imagenes = document.createElement('img'); //creamos el elemento img
      imagenes.src = productosAgrupados[imagenRuta].imagenes[0]; //llenamos el elemento img
      imagenes.setAttribute('class', 'imagen'); //creamos la clase

      const descripciones = document.createElement('div'); //contenedor para las descripciones de los productos.
      descripciones.setAttribute('class', 'contenedorDescripciones'); //le creo su clase.

      for (const producto of productosAgrupados[imagenRuta].productos) {// Itero sobre las descripciones de los productos repetidos.
        
        const descripcionProducto = document.createElement('div'); //Contenedor individual para descripciones y poder manejar display.
        descripcionProducto.setAttribute('class', 'descripcionProducto'); // Clase para aplicar CSS a esas descripciones.

        const codigoProducto = document.createElement('p'); //creo elemento p para código producto.
        codigoProducto.textContent = producto[0]; //le doy el contenido
        codigoProducto.setAttribute('class', 'codigoProducto'); //le doy la clase

        const nombreProducto = document.createElement('h5'); //creo elemento h5 para descripción producto.
        nombreProducto.textContent = producto[1]; //le doy el contenido.
        nombreProducto.setAttribute('class', 'nombreProducto'); //le doy la clase.

        const cantidadProducto = document.createElement('p'); //creo elemento p para cantidad de producto.
        cantidadProducto.textContent = producto[2]; // le doy el contenido.
        cantidadProducto.setAttribute('class', 'cantidadProductos'); // le doy la clase.
        
        //Agrego los elementos creados en los div individuales.
        descripcionProducto.appendChild(codigoProducto);
        descripcionProducto.appendChild(nombreProducto);
        descripcionProducto.appendChild(cantidadProducto);

        //Agrego los div creados con las descripciones individuales en el contenedor de descripciones de la tarjeta.
        descripciones.appendChild(descripcionProducto);
      };

      //Agrego la imagen y el contenedor de descripciones al contenedor principal o tarjeta.
      contenedor.appendChild(imagenes);
      contenedor.appendChild(descripciones);

      //Agrego la tarjeta creada dentro del fragmento de código para mostrarlo en el HTML.
      fragment.appendChild(contenedor);

    } else {//Si los productos no están repetidos los creamos abajo.
    
      const contenedor = document.createElement('div'); //Creo el contenedor para las imagenes.
      contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');//Le doy la clase.

      const imagenes = document.createElement('img');
      imagenes.src = productosAgrupados[imagenRuta].imagenes[0];
      imagenes.setAttribute('class', 'imagen');

      const codigoProducto = document.createElement('p');
      codigoProducto.textContent = productosAgrupados[imagenRuta].productos[0][0]; // Tomamos el código del primer producto
      codigoProducto.setAttribute('class', 'codigoProducto');

      const nombreProducto = document.createElement('h5');
      nombreProducto.textContent = productosAgrupados[imagenRuta].productos[0][1]; // Tomamos el nombre del primer producto
      nombreProducto.setAttribute('class', 'nombreProducto');

      const cantidadProducto = document.createElement('p');
      cantidadProducto.textContent = productosAgrupados[imagenRuta].productos[0][2]; // Tomamos la cantidad del primer producto
      cantidadProducto.setAttribute('class', 'cantidadProductos');

      contenedor.appendChild(imagenes);
      contenedor.appendChild(codigoProducto);
      contenedor.appendChild(nombreProducto);
      contenedor.appendChild(cantidadProducto);

      fragment.appendChild(contenedor);
    }
  }

  tarjeta.appendChild(fragment);
}

