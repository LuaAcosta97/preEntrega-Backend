import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

const CartMOdel = mongoose.model('Cart', cartSchema);
export default CartMOdel;