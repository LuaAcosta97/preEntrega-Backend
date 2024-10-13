import fs from 'fs'

const productsSocket = (socket) => {
    socket.on("products", async () => {
        try {
            const data = await fs.promises.readFile('./src/files/products.json', 'utf-8');
            const products = JSON.parse(data);
            socket.emit("products", products);
            console.log("Productos enviados:", products); // Muestra los productos en consola
        } catch (error) {
            console.error("Error reading products:", error);
            socket.emit("error", "No se pudieron cargar los productos.");
        }
    });
};

export default productsSocket