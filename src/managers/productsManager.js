
const ProductModel = '../models/Product.model.js';

export default class productsManager {
    // llamamos/obtenenmos los productos
    async getProducts() {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            console.error('Error getting products:', error);
            throw new Error('Error getting products');
        }
    }
    // obtengo los prods por el Id
    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return { status: "error", message: "product not found" };
            }
            return product;
        } catch (error) {
            console.error('Error getting  by Id', error);
            throw new Error('Error getting product by Id');
        }
    }
    // agregando un nuevo producto
    async addProduct(newProduct) {

        try {
            const product = new ProductModel(newProduct);
            const savedProduct = await product.save();
            return savedProduct;

        } catch (error) {
            console.error('Error adding product:', error);
            throw new Error('Error adding product');
        }
    };
    // actualizando el producto
    async updateProduct(id, updatedData) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedProduct) {
                return { status: "error", message: "cannot found product" }
            }
            return updatedProduct;
        } catch (error) {
            console.error("error to update product", error);
            return { error: "error to update product" };
        }
    };
    // eliminando el producto
    async deleteProduct(id) {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                return { status: "error", message: "cannot found product" }
            }
            return { status: "success", message: "product deleted" };
        } catch (error) {
            console.error("error to update product", error);
            return { error: "error to update product" };
        }
    };
};