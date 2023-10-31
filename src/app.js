import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8080;

import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

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