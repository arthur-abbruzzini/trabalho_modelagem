const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Configurações
const PORT = process.env.PORT || 3000;
const hostname = 'localhost';

// Conexão com banco de dados
const conn = require('./db/conn');

// Controllers
const usuarioController = require('./controller/usuario.controller');
const produtoController = require('./controller/produto.controller');
const compraController = require('./controller/compras.controller');

// Model direto (para uso em rota personalizada)
const Produto = require('./model/Produtos');
const { Op } = require('sequelize');

// -------------------- Middlewares --------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// -----------------------------------------------------

// -------------------- Rotas Usuário --------------------
app.post('/usuario', usuarioController.cadastrar);
app.get('/usuario', usuarioController.listar);
app.delete('/usuario/:id', usuarioController.apagar);
app.put('/usuario/:id', usuarioController.atualizar);
// --------------------------------------------------------

// -------------------- Rotas Produto ---------------------
app.post('/produto', produtoController.cadastrar);
app.get('/produto', produtoController.listar);
app.delete('/produto/:id', produtoController.apagar);
app.put('/produto/:id', produtoController.atualizar);

// Nova rota: buscar produtos por intervalo de ID
app.get('/produto/intervalo', async (req, res) => {
  const { idInicio, idFim } = req.query;

  if (!idInicio || !idFim) {
    return res.status(400).json({ message: 'Informe idInicio e idFim' });
  }

  try {
    const produtos = await Produto.findAll({
      where: {
        id: {
          [Op.between]: [Number(idInicio), Number(idFim)]
        }
      },
      order: [['id', 'ASC']],
      limit: 10
    });

    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos por intervalo:', err);
    res.status(500).json({ message: 'Erro no servidor ao buscar produtos.' });
  }
});
// ---------------------------------------------------------

// -------------------- Rotas Compra -----------------------
app.post('/compra', compraController.cadastrar);
app.get('/compra', compraController.listar);
app.delete('/compra/:id', compraController.apagar);
app.put('/compra/:id', compraController.atualizar);
// ---------------------------------------------------------

// Rota principal de teste
app.get('/', (req, res) => {
  res.status(200).json({ message: "Aplicação rodando!" });
});

// -------------------- Inicialização ----------------------
conn.sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Não foi possível conectar com o banco de dados!', err);
  });
// ---------------------------------------------------------
