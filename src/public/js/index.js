const socket = io()
const realTimeProducts = document.getElementById("realTimeProducts")

socket.emit("products")
socket.on("products", (data) => {
    realTimeProducts.innerHTML = ""
    data.forEach(item => {
        const element = document.createElement("div")
        element.innerHTML = `
            <h3>${item.title}</h3>
            <div>${item.price}</div>
            <div>${item.stock}</div>
            <div>${item.code}</div>
            <button id="${item.id}" class="deleteItem">Eliminar</button>
            `  
        realTimeProducts.append(element)
    });
})

const formCreateProduct = document.getElementById("formCreateProduct")

formCreateProduct.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const stock = document.getElementById("stock").value
    const code = document.getElementById("code").value
    const product = {
        title,
        price,
        stock,
        code
    }
    await fetch(`http://localhost:8080/api/products`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    socket.emit('products')
    formCreateProduct.reset()
})

document.addEventListener('click', async function (event) {
    if (event.target && event.target.classList.contains('deleteItem')) {
        const id = event.target.id

        try {
            await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-Type': 'application/json'
                },
            })
            socket.emit('products')

        } catch (error) {
            console.error('error of connetion', error)
        }
    }
})