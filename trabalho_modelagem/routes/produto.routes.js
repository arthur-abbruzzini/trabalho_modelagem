const express = require('express');
const router = express.Router();
const Produto = require('../model/Produtos');
const { Op } = require('sequelize');
const controller = require('../controller/produto.controller'); // ✅ Importa o controller

// Rota para buscar produtos por intervalo de IDs
router.get('/intervalo', async (req, res) => {
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
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos por intervalo:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// ✅ NOVAS ROTAS:
router.get('/id/:id', controller.buscarPorId);
router.get('/nome/:nome', controller.buscarPorNome);

// CRUD padrão
router.post('/', controller.cadastrar);
router.get('/', controller.listar);
router.delete('/:id', controller.apagar);
router.put('/:id', controller.atualizar);

module.exports = router;
