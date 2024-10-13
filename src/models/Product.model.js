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
    available:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model('product', ProductSchema);