const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const { Op } = require('sequelize');
const controller = require('../controller/usuario.controller'); // 👈 necessário para usar as novas funções

// Rota para gráfico de nome completo x idade (sem filtro)
router.get('/grafico-usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['nome', 'sobrenome', 'idade'],
      order: [['idade', 'DESC']]
    });

    const dadosGrafico = usuarios.map(u => ({
      nomeCompleto: `${u.nome} ${u.sobrenome}`,
      idade: u.idade
    }));

    res.json(dadosGrafico);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar dados dos usuários.' });
  }
});

// Nova rota para gráfico filtrado por intervalo de ID
router.get('/grafico-usuarios/intervalo', async (req, res) => {
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

    res.json(dadosGrafico);
  } catch (error) {
    console.error('Erro ao buscar usuários no intervalo:', error);
    res.status(500).json({ message: 'Erro ao buscar dados dos usuários.' });
  }
});

// 🔽 ROTAS ADICIONADAS ABAIXO 🔽

// Buscar usuário por ID
router.get('/id/:id', controller.buscarPorId);

// Buscar usuários por nome
router.get('/nome/:nome', controller.buscarPorNome);

// ✅ ROTA PARA LISTAR TODOS OS USUÁRIOS
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

module.exports = router;
