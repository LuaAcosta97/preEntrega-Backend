import { Router } from "express";
import fs from 'fs';

const PATH = "./src/files/products.json"

const router = Router();

router.get ('/products', async (req,res)=>{
    const data = await fs.promises.readFile(PATH, 'utf-8')
    const products = JSON.parse(data)
    res.status(200).render("index", {products})
})

router.get ('/create-products', async (req,res)=>{
    const data = await fs.promises.readFile(PATH, 'utf-8')
    const products = JSON.parse(data)
    res.status(200).render("realTimeProducts", {products})
})

export default router; 