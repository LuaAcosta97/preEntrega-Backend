import { Router } from "express";

const router = Router();

router.post ('/', async (req,res)=>{
    try{
        let products = await ProductModel.find({})
        res.json(products)
    }
    catch(error){
        console.log("cannot get products with mongoose"+error)
    }
})



export default router; 
