// routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');
const { Op } = require('sequelize');

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

module.exports = router;
