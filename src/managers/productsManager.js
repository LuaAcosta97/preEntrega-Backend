import fs from 'fs';

const PATH = './src/files/products.json';

export default class productsManager {
    constructor() {
        // vemos si existe el archivo en la ruta
        if (!fs.existsSync(PATH)) {
            this.init();
        } else {
            console.log("products file found")
        }
    }
    // se inicia el archivo con un array vacio
    async init() {
        await fs.promises.writeFile(PATH, JSON.stringify([]))
    }
    // llamamos/obtenenmos los productos
    async getProducts() {
        const data = await fs.promises.readFile(PATH, 'utf-8')
        const products = JSON.parse(data);
        return products;

    }

    async getProductsById(productId) {
        const data = await fs.promises.readFile(PATH, 'utf-8')
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);
        return product;
    }
    // agregando un nuevo producto
    async addProduct(newProduct) {

        try {
            // me fijo si hay productos
            const products = await this.getProducts();
            const product = { ...newProduct };

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
            product.push(product);
            await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    };
    async updateProduct(id, updatedData) {
        const products = this.getProducts();
        let foundIndex = products.findIndex(
            (p => p.id === Number(id))
        );
        if (foundIndex === -1) {
            return res.status(400).send({ status: "error", error: "User doesn't exist" })
        }
        products[foundIndex] = { ...products[foundIndex], ...updatedData };
        await fs.promises.readFile(PATH, 'utf-8');

        fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        return products[foundIndex];

    } catch(error) {
        console.error(error);
        return { error: "error to update product" };

    };

    async deleteProduct(id) {
        const products = this.getProducts();
        let foundIndex = products.findIndex(p => p.id === Number(id));

        if (!foundIndex) {
            return {
                error: true, message: "error, cannot find id"
            };
        }
        products.splice(foundIndex, 1);
        await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        return { success: true };

    } catch(error) {
        console.error(error);
        return { error: "error to delete product" };

    };
};