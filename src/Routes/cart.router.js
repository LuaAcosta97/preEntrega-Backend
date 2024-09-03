import express from 'express';
import Router from "express";

const cartRouter = Router();

cartRouter.use(express.json);
cartRouter.use(express.urlencoded({ extended: true }));

cartRouter.get('/', (req, res) => {
    res.send({ });
});

cartRouter.post('/', (req, res) => {
    res.send({  });

});
cartRouter.put('/', (req, res) => {
    res.send({ });
});

cartRouter.delete('/', (req, res) => {
    res.send({ });
});

export default cartRouter