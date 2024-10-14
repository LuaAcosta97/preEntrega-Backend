import { Router } from "express";
import fs from 'fs';

const PATH = "./src/files/products.json"

const viewsRouter = Router();

viewsRouter.get ('/products', async (req,res)=>{
    const data = await fs.promises.readFile(PATH, 'utf-8')
    const products = JSON.parse(data)
    res.status(200).render("index", {products})
})

viewsRouter.get ('/realTimeProducts', async (req,res)=>{
    const data = await fs.promises.readFile(PATH, 'utf-8')
    const products = JSON.parse(data)
    res.status(200).render("realTimeProducts", {products})
})
viewsRouter.get('/cart', async (req, res) => {
    try {
        const data = await fs.promises.readFile("./src/files/cart.json", 'utf-8')
        const cart = JSON.parse(data)
        res.render("cart", { cart });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading cart");
    }
});

export default viewsRouter; 