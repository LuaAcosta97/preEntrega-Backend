import fs from 'fs';

const PATH = './src/files/cart.json';


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
            };

            carts.push(newCart);
            await fs.promises.writeFile(PATH, JSON.stringify(carts, null, '\t'));
            return JSON.parse(newCart);
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
    async addProductToCart(cartId, newProduct) {
        try {
            const carts = await this.getCarts();
            // encontramos el carrito por Id
            let cart = carts.find(c => c.Id === cartId);
            if (!cart) {
                console.log('cart with ID ${cartId} not found')
            }

            // llamo a los productos
            const products = await this.getProducts();
            // le asigno al nuevo producto id y cantidad 
            const product = {
                ...newProduct,
                productId: products.length === 0 ? 1 : products[products.length - 1].id + 1,
                quantity: newProduct.quantity || 1 //usamos cantidad proporcionada o 1 por defecto
            }
            // se agrega el producto
            products.push(product);
            //guardamos lo actualizado
            await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log('error adding product to cart', error);
        }
    };
}