const Produto = require('../model/Produtos');

const cadastrar = async (req, res) => {
  const valores = req.body;
  try {
    const dados = await Produto.create(valores);
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao cadastrar o produto!', err);
    res.status(500).json({ message: 'Erro ao cadastrar o produto!' });
  }
};

const listar = async (req, res) => {
  try {
    const dados = await Produto.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao listar os produtos!', err);
    res.status(500).json({ message: 'Erro ao listar os produtos!' });
  }
};

const apagar = async (req, res) => {
  const { id } = req.params;
  try {
    await Produto.destroy({ where: { id } });
    res.status(200).json({ message: 'Produto removido com sucesso.' });
  } catch (err) {
    console.error('Erro ao apagar o produto!', err);
    res.status(500).json({ message: 'Erro ao apagar o produto!' });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const valores = req.body;
  try {
    await Produto.update(valores, { where: { id } });
    res.status(200).json({ message: 'Produto atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar o produto!', err);
    res.status(500).json({ message: 'Erro ao atualizar o produto!' });
  }
};

module.exports = { cadastrar, listar, apagar, atualizar };
