import express from 'express';
import cartManager from '../managers/cartManager.js';

const cartRouter = express.Router();
const cartManagerInstance = new cartManager();

// middlewares
cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: true }));

cartRouter.post('/', async (req, res) => {
    // declaramos un body vacio
    req.body = {}
    const newCart = [];
    // creamos el carrito con el arreglo de productos vacio
    try {
        await cartManagerInstance.createCart(newCart);
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
        const cart = await cartManagerInstance.getCartById(parsedId);
        if (!cart) {
            return res.status(404).send("cart not found");
        }
        return res.send({ cart });

    } catch (error) {
        console.log(error);
        res.status(500).send("cannot get cart")
    }

});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params; // extraemos los parametros de ruta por id 
        const quantity = parseInt(req.body.quantity, 10) || 1 // busca cantidad del cuerpo o 1 por defecto
        //verifica la existencia del id y hace la conversion(lo extrae)
        const parsedCartId = parseInt(cid, 10);
        const parsedProductId = parseInt(pid, 10);

        // Asegúrate de que los IDs sean números válidos
        if (isNaN(parsedCartId) || isNaN(parsedProductId)) {
            return res.status(400).json({ status: "error", message: "Invalid cart or product ID" });
        }

        const cart = await cartManagerInstance.getCartById(parsedCartId);
        if (!cart) {
            return res.status(404).send("cart not found");
        }

        const newProduct = {
            productId: parsedProductId,
            quantity
        };
        
        await cartManagerInstance.addProductToCart( parsedCartId, newProduct);//pasa los argumentos y lo crea 
        res.status(201).send({ status: "success", message: "product added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).send('error adding product to cart');
    }
});

export default cartRouter
