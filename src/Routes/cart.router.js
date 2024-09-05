import express from 'express';
import CartManager from '../managers/cartManager';

const cartRouter = express.Router();
const cartManager = new CartManager();

// middlewares
cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: true }));

cartRouter.post('/', async (req, res) => {
    // declaramos un body vacio
    const { } = req.body;
    // creamos el carrito con el arreglo de productos vacio
    try {
        await cartManager.createCart();
        res.status(201).send({ status: "success", message: "cart created" });
        // res.sendStatus(201); //estatus facil - created
    } catch (error) {
        console.log(error);
        res.status(500).send("cannot create cart");
    }
});
// obtener carrito por Id
cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const parsedId = parseInt(cid, 10);
        const cart = await cartManager.getCartById(parsedId);
        if (!cart) {
            return res.status(404).send("cart not found");
        }
        return res.send({ cart });

    } catch (error) {
        console.log(error);
        res.status(500).send("cannot get cart")
    }

});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params; // extraemos los parametros de ruta por id 
        const quantity = req.body.quantity || 1; // busca cantidad del cuerpo o 1 por defecto
        //verifica la existencia del id y hace la conversion(lo extrae)
        const parsedCartId = parseInt(cid, 10);
        const cart = await cartManager.getCartById(parsedCartId);
        if (!cart) {
            return res.status(404).send("cart not found");
        }

        const newProduct = {
            productId:parseInt(pid, 10),
            quantity
        };
        await cartManager.addProductToCart( parsedCartId, newProduct);//pasa los argumentos y lo crea 
        res.status(201).send({ status: "success", message: "product added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).send('error adding product to cart');
    }
});

export default cartRouter