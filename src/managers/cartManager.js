import CartMOdel from "../models/cart.model.js";

export default class cartManager {
    async createCart() {
        const newCart = new Cart();
        return await newCart.save(); // Guarda el carrito vacío en Mongo
    }

    // llamamos a todos los carritos
    async getCarts() {
        try {
            const carts = await CartMOdel.find();
            return carts;
        } catch (error) {
            console.error('Error getting carts:', error);
            return ('Error getting carts');
        };
    }

    // se los llama por id 
    async getCartById(cartId) {
            return await Cart.findById(cartId).populate('products.productId'); // Populate para obtener detalles del producto
        }

    // agregando un nuevo producto
    async addProductToCart(cid, newProduct) {

        try {
            const cart = await this.getCartById(cid);
        if (!cart) {
            return ('Cart not found');
        }
        //filtra para buscar el producto por id
        const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === newProduct.productId.toString());

        if (existingProductIndex !== -1) {
            // Si el producto ya existe, actualiza la cantidad
            cart.products[existingProductIndex].quantity += newProduct.quantity;
        } else {
            // Si el producto no existe, lo añáde
            cart.products.push(newProduct);
        }
        return await cart.save(); // Guarda los cambios en el carrito
        } catch (error) {
            console.log('error adding product to cart', error);
            return { status: 'error', message: 'Error adding product to cart' };
        }
    };
    async deleteProductFromCart(cid, productId) {
        // Busca el carrito por su id
        const cart = await CartMOdel.findById(cid);
        if (!cart) {
            throw new Error('Cart not found');
        }
        // Filtra para eliminar el producto que coincida con el productId
        cart.products = cart.products.filter(product => product.productId.toString() !== productId.toString());

        // Guarda los cambios en el carrito
        return await cart.save();
    };
    async deleteAllProducts(cid) {
        try {
            const cart = await CartMOdel.findById(cid);
            if (!cart) {
                return { status: "error", message: "cart cannot found" }
            }
            // Vacíamos el array de productos
            cart.products = [];
            // Guardamos los cambios en el carrito
            await cart.save();
            return { status: "success", message: "all products deleted from cart " };
        } catch (error) {
            console.error("error to all products", error);
            return { error: "error to delete all products" };
        }
    };
}
