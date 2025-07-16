const Produto = require('../model/Produtos');
const { Op } = require('sequelize');

module.exports = {
  // Buscar produto por ID
  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
      res.json(produto);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar produto' });
    }
  },

  // Buscar por nome (usando 'titulo' no banco de dados)
  async buscarPorNome(req, res) {
    const { nome } = req.params;
    try {
      const produtos = await Produto.findAll({
        where: {
          titulo: {
            [Op.like]: `%${nome}%` // usa 'titulo' corretamente
          }
        }
      });

      res.json(produtos);
    } catch (err) {
      console.error('Erro ao buscar produto por nome:', err);
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  },

  // Listar todos os produtos
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar produtos' });
    }
  },

  // Cadastrar novo produto
  async cadastrar(req, res) {
    const { titulo, preco, descricao, categoria, desconto, estoque, marca, imagem } = req.body;
    try {
      const novo = await Produto.create({
        titulo,
        preco,
        descricao,
        categoria,
        desconto,
        estoque,
        marca,
        imagem
      });
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
  },

  // Atualizar produto existente
  async atualizar(req, res) {
    const { id } = req.params;
    const { titulo, preco, descricao, categoria, desconto, estoque, marca, imagem } = req.body;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
      await produto.update({
        titulo,
        preco,
        descricao,
        categoria,
        desconto,
        estoque,
        marca,
        imagem
      });
      res.json(produto);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  },

  // Apagar produto
  async apagar(req, res) {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
      await produto.destroy();
      res.json({ message: 'Produto apagado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao apagar produto' });
    }
  }
};
