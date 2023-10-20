const crearProductos = (resultado) => {
    const fragment = document.createDocumentFragment();
    const productosAgrupados = {};
  
    for (const item of resultado) {
      const imagenRuta = obtenerRutaImagen(item[3]);
  
      if (!productosAgrupados[imagenRuta]) {
        productosAgrupados[imagenRuta] = {
          imagenes: [],
          productos: [],
        };
      }
  
      productosAgrupados[imagenRuta].imagenes.push(imagenRuta);
      productosAgrupados[imagenRuta].productos.push(item);
    }
  
    // Mostrar productos con imágenes repetidas en una tarjeta
    for (const imagenRuta in productosAgrupados) {
      const contenedor = document.createElement('div');
      contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');
  
      const imagenes = document.createElement('img');
      imagenes.src = productosAgrupados[imagenRuta].imagenes[0];
      imagenes.setAttribute('class', 'imagen');
  
      const productosEnTarjeta = productosAgrupados[imagenRuta].productos;
  
      // Crear descripciones combinadas de los productos en la misma imagen
      const descripcionProducto = document.createElement('p');
      const descripciones = productosEnTarjeta.map((prod) => `${prod[0]} - ${prod[1]} - ${prod[2]}`);
      descripcionProducto.textContent = descripciones.join(', ');
  
      contenedor.prepend(imagenes);
      contenedor.append(descripcionProducto);
  
      fragment.appendChild(contenedor);
    }
  
    // Mostrar productos sin imágenes repetidas en tarjetas individuales
    for (const item of resultado) {
      if (productosAgrupados[obtenerRutaImagen(item[3])].productos.length === 1) {
        const contenedor = document.createElement('div');
        contenedor.setAttribute('class', 'contenedorDinamicoTarjeta');
  
        const imagenes = document.createElement('img');
        imagenes.src = obtenerRutaImagen(item[3]);
        imagenes.setAttribute('class', 'imagen');
  
        const codigoProducto = document.createElement('p');
        codigoProducto.textContent = item[0];
        codigoProducto.setAttribute('class', 'codigoProducto');
  
        const nombreProducto = document.createElement('h5');
        nombreProducto.textContent = item[1];
        nombreProducto.setAttribute('class', 'nombreProducto');
  
        const cantidadProducto = document.createElement('p');
        cantidadProducto.textContent = item[2];
        cantidadProducto.setAttribute('class', 'cantidadProductos');
  
        contenedor.prepend(imagenes);
        contenedor.append(codigoProducto);
        contenedor.append(nombreProducto);
        contenedor.append(cantidadProducto);
  
        fragment.appendChild(contenedor);
      }
    }
  
    tarjeta.innerHTML = '';
    tarjeta.appendChild(fragment);
  };
  