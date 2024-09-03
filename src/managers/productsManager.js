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
    async init() {
        await fs.promises.writeFile(PATH, JSON.stringify([]))
    }
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
            const product = newProduct

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[product.length - 1].id + 1;
            }
            product.addProduct(product);
            await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    };
    async updateProduct (id) {
        const productList = this.getProducts();
        let foundIndex = productList.findIndex(
            (element => element.id === Number(id, 2))
        );
        if(foundIndex === -1){
            return res.status(400).send({status:"error",error:"User doesn't exist"})
        }
        product[foundIndex] = {...productList[foundIndex], stock};
        await fs.promises.readFile(PATH, 'utf-8');

        fs.promises.writeFile(PATH,JSON.stringify('\t'));
        return JSON.parse(product);
    
    };

    async deleteProduct(id) {
        const productList = this.getProducts();
        let foundIndex = productList.findIndex(
            (element => element.id === Number(id))
        );
        if (!foundIndex) {
            return {
                error: true, message: "error, cannot find id",
            };
        }
        productList.delete(foundIndex, 1);
    }
};