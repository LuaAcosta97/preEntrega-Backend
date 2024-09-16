import fs from 'fs';
import productsManager from './productsManager.js';

const PATH = './src/files/cart.json';
const PATHprod = './src/files/products.json';

const productManager = new productsManager(PATHprod);

export default class cartManager {
    constructor() {
        // vemos si existe el archivo en la ruta
        if (!fs.existsSync(PATH)) {
            this.init();
        } else {
            console.log("cart file found")
        }
    }
    // se inicia archivo del carrito con un array vacio
    async init() {
        await fs.promises.writeFile(PATH, JSON.stringify([]))
        console.log()
    }

    async createCart() {
        // creando un cart vacio con su estructura
        // con id autogenerado y un arreglo de productos vacio
        try {
            let carts = await this.getCarts()
            let newCart = {
                id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
                products: []
            };

            carts.push(newCart);
            await fs.promises.writeFile(PATH, JSON.stringify(carts, null, '\t'));
            return newCart;
        } catch (error) {
            console.log(error);
        };
    }

    // llamamos a todos los carritos
    async getCarts() {
        const data = await fs.promises.readFile(PATH, 'utf-8');
        return JSON.parse(data);
    }

    // se los llama por id 
    async getCartById(cartId) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === cartId);
    }

    // agregando un nuevo producto
    async addProductToCart(cid, newProduct) {

        try {
            const carts = await this.getCarts();
            const products = await productManager.getProducts();

            // encontramos el carrito por Id
            let cart = carts.find(cart => cart.id === cid);
            if (!cart) {
                console.log('cart with ID not found');
            };
            //si no tiene el array de productos se lo agrego
            if (!cart.products) {
                cart.products = [];
            }

            // le asigno al producto id y cantidad 
            const product = {
                ...newProduct,
                productId: newProduct.productId || (products.length === 0 ? 1 : products[products.length - 1].id + 1),
                quantity: newProduct.quantity || 1 //usamos cantidad proporcionada o 1 por defecto
            }

            // Verifica si el producto ya está en el carrito
            const existingProductIndex = cart.products.findIndex(p => p.productId === product.productId);
            if (existingProductIndex > -1) {
                // Actualiza la cantidad del producto si ya existe
                cart.products[existingProductIndex].quantity += product.quantity;
            } else {
                // Agrega el nuevo producto al carrito
                cart.products.push(product);
            }
            // Guarda los carritos actualizados
            await fs.promises.writeFile(PATH, JSON.stringify(carts, null, '\t'));
            return { success: 'Product added to cart' };

        } catch (error) {
            console.log('error adding product to cart', error);
            return { status: 'error', message: 'Error adding product to cart' };
        }
    };
}
