//Ejemplo de código con chatGPT
// Declaración de elementos HTML
const input = document.getElementById("archivoEntrada");
const tarjeta = document.getElementById("contenedorTarjeta");
const contenedorInput = document.getElementById("contenedorInput");

// Función para parsear el archivo
function parseFile(file) {
  const contenido = new FileReader();

  contenido.onload = (e) => {
    const resultado = e.target.result;
    const arrayDeResultado = resultado.split('\r\n');
    
    arrayDeResultado.shift();
    arrayDeResultado.pop();

    const arrayDeResultado2 = arrayDeResultado.map((item) =>
      item.split("'").filter((element) => element.length > 1)
    );

    crearProductos(arrayDeResultado2);
    console.log(arrayDeResultado2);
  };

  contenido.readAsText(file);
}

// Función para crear tarjetas de productos
function crearProductos(resultado) {
  const fragment = document.createDocumentFragment();

  for (const item of resultado) {
    const contenedor = document.createElement('div');
    contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');

    const imagenes = document.createElement('img');
    imagenes.src = `${item[3]}`;
    imagenes.setAttribute('class', 'imagen');

    const codigoProducto = document.createElement('p');
    codigoProducto.textContent = `${item[0]}`;
    codigoProducto.setAttribute('class', 'codigoProducto');

    const nombreProducto = document.createElement('h5');
    nombreProducto.textContent = `${item[1]}`;
    nombreProducto.setAttribute('class', 'nombreProducto');

    const cantidadProducto = document.createElement('p');
    cantidadProducto.textContent = `${item[2]}`;
    cantidadProducto.setAttribute('class', 'cantidadProductos');

    contenedor.prepend(imagenes);
    contenedor.append(codigoProducto);
    contenedor.append(nombreProducto);
    contenedor.append(cantidadProducto);

    fragment.appendChild(contenedor);
  }

  tarjeta.appendChild(fragment);
}

// Evento de cambio en el input
input.addEventListener('change', (event) => {
  contenedorInput.setAttribute('class', 'contenedorInputCerrado');
  const archivos = event.target.files;

  if (archivos.length > 0) {
    const archivo = archivos[0];
    parseFile(archivo);
  }
});