const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const hostname = 'localhost';

// Controllers
const usuarioController = require('./controller/usuario.controller');
const produtoController = require('./controller/produto.controller');
const compraController = require('./controller/compras.controller');

// Conexão com banco de dados
const conn = require('./db/conn');

// ------------ Middlewares ------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// -------------------------------------------

// Usuário
app.post('/usuario', usuarioController.cadastrar);
app.get('/usuario', usuarioController.listar);
app.delete('/usuario/:id', usuarioController.apagar);
app.put('/usuario/:id', usuarioController.atualizar);

// Produtos
app.post('/produto', produtoController.cadastrar);
app.get('/produto', produtoController.listar);
app.delete('/produto/:id', produtoController.apagar);
app.put('/produto/:id', produtoController.atualizar);

// Compras
app.post('/compra', compraController.cadastrar);
app.get('/compra', compraController.listar);
app.delete('/compra/:id', compraController.apagar);
app.put('/compra/:id', compraController.atualizar);


app.get('/', (req, res) => {
  res.status(200).json({ message: "Aplicação rodando!" });
});

// -------------------------------------------
conn.sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Não foi possível conectar com o banco de dados!', err);
  });
