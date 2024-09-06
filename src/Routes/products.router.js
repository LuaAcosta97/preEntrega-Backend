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
        const parsedId = parseInt(pid, 1);
        const product = await productsManagerInstance.getProductById(parsedId);
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
    const { title } = req.body;
    // valida si envia la peticion
    if (!title) {
        // si se equivoco en la peticion, mando el status con el mensaje de error
        return res.status(400).send({ status: "error", error: "incomplete values" });
    }
    try {
        const newProduct = {
            title: "Crema humectante Kepp Matt 150ML",
            description: " protege y humecta la piel, efecto mate",
            code: "03.0",
            typeSkin: "Mixta",
            price: 6.400,
            status: "true",
            stock: 3,
            category: "SkinCare"

        };
        await productsManagerInstance.addProduct(newProduct);

        res.status(201).send({ status: "success", message: " created" });
        // res.sendStatus(201); //estatus facil - created
    } catch (error) {
        console.log(error);
        res.status(500).send("cannot create product");
    }
});

productsRouter.put('/:pid', async (req, res) => {
    // extraemos el parametro por id para luego  actualizar algo del objeto.
    const { pid } = req.params;
    // cuerpo del objeto a actualizar
    const { stock } = req.body;
    // encontrar el indice del usuario que quiero actualizar
    try {
        const parsedId = parseInt(pid, 10);
        const updatedProduct = await productsManagerInstance.updateProduct(parsedId, { stock });
        if (!updatedProduct) {
            return res.status(400).send({ status: "error", error: "product doesn't exist" })
        }
        res.send({ status: "success", message: "updated" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Cannot update product");
    }
});

productsRouter.delete('/:uid', async (req, res) => {
    const { pid } = req.params;
    try {
        //verifica la existencia del objeto
        const parsedId = parseInt(pid, 10);
        const deleted = await productsManagerInstance.deleteProduct(parsedId);
        if (!deleted) {
            return res.status(400).send({ status: "error", error: "product doesn't exist" })
        }
        // si existia lo borra
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send("Cannot delete product");
    }
});

export default productsRouter