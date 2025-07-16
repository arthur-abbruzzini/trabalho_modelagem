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

// -------------------- Rotas Usuário --------------------
app.use('/usuario', usuarioRoutes);

app.post('/usuario', usuarioController.cadastrar);
app.get('/usuario', usuarioController.listar);
app.delete('/usuario/:id', usuarioController.apagar);
app.put('/usuario/:id', usuarioController.atualizar);

// ✅ ROTA ADICIONADA: Gráfico com intervalo de ID
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
app.post('/produto', produtoController.cadastrar);
app.get('/produto', produtoController.listar);
app.delete('/produto/:id', produtoController.apagar);
app.put('/produto/:id', produtoController.atualizar);

// Rota: buscar produtos por intervalo de ID
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
