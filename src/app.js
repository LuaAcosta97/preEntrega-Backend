import express from 'express';

import productsRouter from './Routes/products.router.js';
import cartRouter from './Routes/cart.router.js';
import viewsRouter from './Routes/views.router.js'

import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import productsSocket from './sockets/productsSocket.js'

const app = express();
// corrobora si hay puerto, y si no hay lo asigno
const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () => console.log(`listening on ${PORT}`));
//creamos el servidor para sockets dentro de nuestro servidor principal
const io = new Server(httpServer);

app.use('/static',express.static(`${__dirname}../public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs',handlebars.engine({extname:'.hbs' }))
app.set('views',__dirname + '/views')
app.set('view engine','hbs')

app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);
app.use('/',viewsRouter);

io.on('connection', Socket =>{
    productsSocket(Socket)
});



