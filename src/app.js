import express from 'express';

import productsRouter from './Routes/products.router.js';
import cartRouter from './Routes/cart.router.js';

import __dirname from './utils.js';

const app = express();
// corrobora si hay puerto, y si no hay lo asigno
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);



