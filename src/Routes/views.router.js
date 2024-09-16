import { Router } from "express";
import fs from 'fs';

const PATH = '../products.json';

const router = Router();

router.get ('/products', async (req,res)=>{
    const data = await fs.promises.readFile(PATH, JSON.stringify, 'utf-8')
    const products = JSON.parse(data)
    console.log(products)
    res.status(200).render("index", {products})
})

router.get ('/realTimeProducts', async (req,res)=>{
    
    res.status(200).render("realTimeProducts", {})
})

export default router;