const crearProductos = (resultado) => {
    const fragment = document.createDocumentFragment();
    const productosAgrupados = {};//Creamos un objeto para rastrear productos agrupados.
  
    for (const item of resultado) {
      const imagenRuta = obtenerRutaImagen(item[3]);
  
      if (!productosAgrupados[imagenRuta]) {
        productosAgrupados[imagenRuta] = [];
      }
  
      productosAgrupados[imagenRuta].push(item);
  
      // Limpiamos tarjetas existentes en el contenedor
      tarjeta.innerHTML = '';
  
      // Mostrar productos que no tienen imágenes repetidas
      for (const imagenRuta in productosAgrupados) {
        if (productosAgrupados[imagenRuta].length === 1) {
          const producto = productosAgrupados[imagenRuta][0];
  
          // Crear una tarjeta para el producto individual
          const contenedor = document.createElement('div');
          contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');
  
          const imagenes = document.createElement('img');
          imagenes.src = imagenRuta;
          imagenes.setAttribute('class', 'imagen');
  
          const codigoProducto = document.createElement('p');
          codigoProducto.textContent = producto[0];
          codigoProducto.setAttribute('class', 'codigoProducto');
  
          const nombreProducto = document.createElement('h5');
          nombreProducto.textContent = producto[1];
          nombreProducto.setAttribute('class', 'nombreProducto');
  
          const cantidadProducto = document.createElement('p');
          cantidadProducto.textContent = producto[2];
          cantidadProducto.setAttribute('class', 'cantidadProductos');
  
          contenedor.prepend(imagenes);
          contenedor.append(codigoProducto);
          contenedor.append(nombreProducto);
          contenedor.append(cantidadProducto);
  
          fragment.appendChild(contenedor);
        }
      }
  
      // Mostrar productos agrupados por imagen
      for (const imagenRuta in productosAgrupados) {
        if (productosAgrupados[imagenRuta].length > 1) {
          const productos = productosAgrupados[imagenRuta];
  
          const contenedor = document.createElement('div');
          contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');
  
          const imagenes = document.createElement('img');
          imagenes.src = imagenRuta;
          imagenes.setAttribute('class', 'imagen');
  
          const descripcionProducto = document.createElement('p');
          descripcionProducto.textContent = productos.map((prod) => prod[1]).join(', ');
  
          contenedor.prepend(imagenes);
          contenedor.append(descripcionProducto);
  
          fragment.appendChild(contenedor);
        }
      }
    }
  
    tarjeta.appendChild(fragment);
  };
  
  function obtenerRutaImagen(rutaLocalCompleta) {
    const rutaRelativa = rutaLocalCompleta.replace("D:\\", "");
    const rutaBase = 'imagenes/';
    return `${rutaBase}${rutaRelativa}`;
  }
  