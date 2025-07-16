const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const hostname = 'localhost';

// Conexão com banco de dados
const conn = require('./db/conn');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importar Models
const Produto = require('./model/Produtos');
const Usuario = require('./model/Usuario');
const { Op } = require('sequelize'); // Importação necessária para filtros

// Importar Controllers
const usuarioController = require('./controller/usuario.controller');
const produtoController = require('./controller/produto.controller');
const compraController = require('./controller/compras.controller');

// Importar Rotas externas
const usuarioRoutes = require('./routes/usuario.routes');
const produtoRoutes = require('./routes/produto.routes'); // ✅ ADICIONADA

// -------------------- Rotas Usuário --------------------
app.use('/usuario', usuarioRoutes);  // Usa todas as rotas do usuario.routes.js

// ✅ ROTA ADICIONAL (gráfico com intervalo de ID, já existe em usuario.routes.js)
app.get('/usuario/grafico/idade/intervalo', async (req, res) => {
  const { idInicio, idFim } = req.query;

  if (!idInicio || !idFim) {
    return res.status(400).json({ message: 'Informe idInicio e idFim' });
  }

  try {
    const usuarios = await Usuario.findAll({
      where: {
        id: {
          [Op.between]: [Number(idInicio), Number(idFim)]
        }
      },
      attributes: ['nome', 'sobrenome', 'idade'],
      order: [['id', 'ASC']]
    });

    const dadosGrafico = usuarios.map(u => ({
      nomeCompleto: `${u.nome} ${u.sobrenome}`,
      idade: u.idade
    }));

    res.status(200).json(dadosGrafico);
  } catch (error) {
    console.error('Erro ao buscar usuários no intervalo:', error);
    res.status(500).json({ message: 'Erro ao buscar dados dos usuários.' });
  }
});

// -------------------- Rota de teste --------------------
app.get('/', (req, res) => {
  res.status(200).json({ message: "Aplicação rodando!" });
});

// -------------------- Rotas Produto --------------------
app.use('/produto', produtoRoutes); // ✅ USANDO ROTAS DO ARQUIVO produto.routes.js

// -------------------- Rotas Compra --------------------
app.post('/compra', compraController.cadastrar);
app.get('/compra', compraController.listar);
app.delete('/compra/:id', compraController.apagar);
app.put('/compra/:id', compraController.atualizar);

// -------------------- Inicialização --------------------
conn.sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Não foi possível conectar com o banco de dados!', err);
  });
