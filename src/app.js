import express from 'express';

const app = express(); 
// corrobora si hay puerto, y si no hay lo asigna
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`listening on ${PORT}`));
 
app.get('/', (req, res)=>{
    res.send("HOla express");
});

app.get('/products',)
