(function () {
    const socket = io();

    socket.on('product-list', (products) => {
        console.log('productos: ', products);
    });
  /*
    document
      .getElementById('form-message')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('input-message');
        const newMessage = {
          username,
          body: input.value,
        };
        socket.emit('new-message', newMessage);
        input.value = '';
        input.focus();
      });
  
    socket.on('product-list-updated', (products) => {
      console.log('products: ', products);
      const productsDiv = document.getElementById('products-div');
      productsDiv.innerText = '';
      productsDiv.forEach((product) => {
        const p = document.createElement('p');
        p.innerText = `${message.username}: ${message.body}`;
        logMessages.appendChild(p);
      });
    });
  */
  })();