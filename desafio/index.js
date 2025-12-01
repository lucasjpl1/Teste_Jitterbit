const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://userttest:admin123@cluster0.uyhgfbq.mongodb.net/desafio_pedidos?appName=Cluster0')
    .catch(err => console.log(err));


    const Order = mongoose.model('Order', {

        orderId: String,
        value: Number,
        creationDate: Date,
        items: [{
            productId: Number,
            quantity: Number,
            price: Number
        }]
    });

    app.post('/order', async (req, res) => {
        try {
            const body = req.body;
            const novoPedido = {
                orderId: body.numeroPedido,
                value: body.valorTotal,
                creationDate: bodyCriacao,
                items: body.items.map(item => {
                    return {
                        productId: Number(item.idItem),
                        quantity: item.quantidadeItem,
                        price: item.valoritem

                    };
                })
            };
        
            const resultado = await Order.create(novoPedido);
            res.status(201).json(resultado);
        
        } catch (error) {
            console.log(error);
            res.status(400).json({ erro: error.message });
        }
    });

    app.get('/order/list', async (req, res) => {
        try {
            const lista = await Order.find();
            res.json(lista);
        } catch (error) {
            res.status(500).json({ erro: "erro ao buscar" });
        }
    });

    app.get('/order/:id', async (req, res) => {
        try {
            const pedido = await Order.findOne({ orderId: req.params.id });
            if (!pedido) {
                return res.status(404).json({ msg: "Não encontrado" });
            }
            res.json(pedido);
        } catch (error) {
            res.status(500).json({ erro: "error.message"});
        }
    });

    app.put('/order/:id', async (req, res) => {
        try {
            const pedidoAtualizado = await Order.findOneAndUpdate(
                { orderId: req.params.id },
                req.body,
                { new: true }
            );
            res.json(pedidoAtualizado);
        } catch (error) {
            res.status(500).json({  erro: "error.message" });
        }
    });

    app.delete('/order/:id', async (req, res) => {
        try {
            await Order.findOneAndDelete({ orderId: req.params.id });
            res.json({ msg: "Deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ erro: "error.message" });
        }
    });

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})
            
