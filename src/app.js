import express from 'express';
import path from 'path';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';

const app = express();
const PORT = 8080;

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/js', express.static(path.join(__dirname, 'public/js'), {
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'application/javascript');
  },
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api', productsRouter, cartsRouter);

app.use('/', viewsRouter);

app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error no controlado: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;