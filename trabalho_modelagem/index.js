const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const hostname = 'localhost';

// -------------------- Conexão com Banco de Dados --------------------
const conn = require('./db/conn');

// -------------------- Middlewares --------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------- Importação de Models --------------------
const Produto = require('./model/Produtos');
const Usuario = require('./model/Usuario');

// -------------------- Importação de Controllers --------------------
const compraController = require('./controller/compras.controller');

// -------------------- Importação de Rotas --------------------
const usuarioRoutes = require('./routes/usuario.routes');
const produtoRoutes = require('./routes/produto.routes');

// -------------------- Rota de Teste --------------------
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Aplicação rodando!' });
});

// -------------------- Rotas de Usuário --------------------
app.use('/usuario', usuarioRoutes);

// -------------------- Rotas de Produto --------------------
app.use('/produto', produtoRoutes);

// -------------------- Rotas de Compra --------------------
app.post('/compra', compraController.cadastrar);
app.get('/compra', compraController.listar);
app.put('/compra/:id', compraController.atualizar);
app.delete('/compra/:id', compraController.apagar);

// -------------------- Inicialização --------------------
conn.sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
