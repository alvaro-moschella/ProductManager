  const socket = io();

  socket.on('client-connected', () => {
    console.log('Cliente conectado');
  });

  socket.on('product-list', (products) => {
    console.log('productos: ', products);
    const productsDiv = document.getElementById('products-div');
    productsDiv.innerHTML = '';
      products.forEach((product) => {
        const p = document.createElement('p');
        p.innerHTML = `
        <li>
        <p><strong>Título</strong>: ${product.title}</p>
        <p><strong>Descripción</strong>: ${product.description}</p>
        <p><strong>Código</strong>: ${product.code}</p>
        <p><strong>Precio</strong>: ${product.price}</p>
        <p><strong>Estado</strong>: ${product.status}</p>
        <p><strong>Stock</strong>: ${product.stock}</p>
        <p><strong>Categoría</strong>: ${product.category}</p>
        <p><strong>Thumbnails</strong>: ${product.thumbnails}</p>
      </li>`;
        productsDiv.appendChild(p);
    });
  });