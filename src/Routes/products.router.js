import express from 'express';
import productsManager from "../managers/productsManager.js";

const productsRouter = express.Router();
const productsManagerInstance = new productsManager();

productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.get('/', async (req, res) => {
    try {
        const products = await productsManagerInstance.getProducts();
        res.send({ products })
    } catch (error) {
        console.log(error);
        res.status(500).send("cannot get products")
    }

});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManagerInstance.getProductById(pid);
        if (!product) {
            return res.status(404).send("product not found");
        }
        return res.send({ product })

    } catch (error) {
        console.log(error);
        res.status(500).send("cannot get product")
    }

});

productsRouter.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category } = req.body;
    // valida si envia la peticion

    try {
        const newProduct = {
            title,
            description,
            code,
            price,
            category,
            stock,
            status
            
            
        };
        if (!newProduct){
            return res.status(400).send({ status: "error", error: "incomplete info" })
        }
        await productsManagerInstance.addProduct(newProduct);

        res.status(201).send({ status: "success", message: " product created" });
        // res.sendStatus(201); //estatus facil - created
    } catch (error) {
        console.log(error);
        res.status(500).send("cannot create product");
    }
});
// con patch se puede cambiar una sola cosa, con put se manda a actualizar todo el objeto
productsRouter.put('/:pid', async (req, res) => {
    // extraemos el parametro por id para luego  actualizar algo del objeto.
    const { pid } = req.params;
    // cuerpo del objeto a actualizar
    const { body } = req.body;
    // encontrar el indice del usuario que quiero actualizar
    try {
        const updatedProduct = await productsManagerInstance.updateProduct( pid, { body });
        if (!updatedProduct) {
            return res.status(400).send({ status: "error", error: "product doesn't exist" })
        }
        res.send({ status: "success", message: "updated" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Cannot update product");
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const deleted = await productsManagerInstance.deleteProduct(pid);
        if (!deleted) {
            return res.status(400).send({ status: "error", error: "product doesn't exist" })
        }
        // si existia lo borra
        res.sendStatus(204, {status: "success", message: "product deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Cannot delete product");
    }
});

export default productsRouter