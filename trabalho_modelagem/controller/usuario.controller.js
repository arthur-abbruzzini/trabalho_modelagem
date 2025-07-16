const Usuario = require('../model/Usuario');

// Cadastrar
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

// Listar todos
const listar = async (req, res) => {
  try {
    const dados = await Usuario.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao listar os usuários!', err);
    res.status(500).json({ message: 'Erro ao listar os usuários!' });
  }
};

// Apagar por ID
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

// Atualizar por ID
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

// Buscar por ID
const buscarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    console.error('Erro ao buscar o usuário por ID!', err);
    res.status(500).json({ message: 'Erro ao buscar o usuário por ID!' });
  }
};

// Buscar por nome
const buscarPorNome = async (req, res) => {
  const { nome } = req.params;
  try {
    const usuarios = await Usuario.findAll({
      where: {
        nome: nome
      }
    });
    res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao buscar o usuário por nome!', err);
    res.status(500).json({ message: 'Erro ao buscar o usuário por nome!' });
  }
};

module.exports = {
  cadastrar,
  listar,
  apagar,
  atualizar,
  buscarPorId,
  buscarPorNome
};
