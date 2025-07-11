const Usuario = require('../model/Usuario');

const cadastrar = async (req, res) => {
  const valores = req.body;
  try {
    const dados = await Usuario.create(valores);
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao cadastrar o usuário!', err);
    res.status(500).json({ message: 'Erro ao cadastrar o usuário!' });
  }
};

const listar = async (req, res) => {
  try {
    const dados = await Usuario.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao listar os usuários!', err);
    res.status(500).json({ message: 'Erro ao listar os usuários!' });
  }
};

const apagar = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.destroy({ where: { id } });
    res.status(200).json({ message: 'Usuário removido com sucesso.' });
  } catch (err) {
    console.error('Erro ao apagar o usuário!', err);
    res.status(500).json({ message: 'Erro ao apagar o usuário!' });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const valores = req.body;
  try {
    await Usuario.update(valores, { where: { id } });
    res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar o usuário!', err);
    res.status(500).json({ message: 'Erro ao atualizar o usuário!' });
  }
};

module.exports = { cadastrar, listar, apagar, atualizar };
