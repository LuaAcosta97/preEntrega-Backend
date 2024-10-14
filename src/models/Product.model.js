import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        String
    },
    code:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    stock:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

const ProductModel = mongoose.model('product', ProductSchema);
export default ProductModel;