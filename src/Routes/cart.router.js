import express from 'express';
import cartManager from '../managers/cartManager.js';

const cartRouter = express.Router();
const cartManagerInstance = new cartManager();

cartRouter.use(express.json());
cartRouter.use(express.urlencoded({ extended: true }));

cartRouter.post('/', async (req, res) => {
    // declaramos un body vacio
    req.body = {}
    // creamos el carrito con el arreglo de productos vacio
    try {
        const newCart = await cartManagerInstance.createCart();
        await cartManagerInstance.createCart(newCart);
        res.status(201).send({ status: "success", message: "cart created", cartId: newCart._id });
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
        const cart = await cartManagerInstance.getCartById(cid);
        if (!cart) {
            return res.status(404).send("cart not found");
        }
        return res.send({ status: "success", cart });

    } catch (error) {
        console.log(error);
        res.status(500).send("cannot get cart")
    }

});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params; // extraemos los parametros de ruta por id 
        const quantity = parseInt(req.body.quantity, 10) || 1 // busca cantidad del cuerpo o 1 por defecto

        const cart = await cartManagerInstance.getCartById(cid);
        if (!cart) {
            return res.status(404).send("cart not found");
        }

        const newProduct = {
            productId: pid,
            quantity
        };

        await cartManagerInstance.addProductToCart(cid, newProduct);//pasa los argumentos y lo crea 
        res.status(201).send({ status: "success", message: "product added to cart", cart });
    } catch (error) {
        console.log(error);
        res.status(500).send('error adding product to cart');
    }
});
//eliminar un producto específico del carrito
cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await cartManagerInstance.deleteProductFromCart(cid, pid);
        res.status(201).send({ status: "success", message: "Product deleted from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Error to delete product from cart" });
    }
});

//eliminar todos los productos del carrito
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartManagerInstance.deleteAllProducts(cid);
        res.status(201).send( result, { status: "success", message: "Product deleted from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Error to delete all products from cart" });
    }
});

export default cartRouter
