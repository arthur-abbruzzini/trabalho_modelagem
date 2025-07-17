const Usuario = require('../model/Usuario');

// Cadastrar usuário
const cadastrar = async (req, res) => {
  try {
    const {
      nome,
      sobrenome,
      idade,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      nascimento
    } = req.body;

    if (!nome || !sobrenome || !idade || !email || !telefone || !endereco || !cidade || !estado || !nascimento) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const usuario = await Usuario.create({
      nome,
      sobrenome,
      idade,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      nascimento
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

// Buscar por ID
const buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};

// Buscar por nome
const buscarPorNome = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ where: { nome: req.params.nome } });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar por nome:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// Atualizar usuário
const atualizar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const {
      nome,
      sobrenome,
      idade,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      nascimento
    } = req.body;

    if (!nome || !sobrenome || !idade || !email || !telefone || !endereco || !cidade || !estado || !nascimento) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    await usuario.update({
      nome,
      sobrenome,
      idade,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      nascimento
    });

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário
const deletar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

module.exports = {
  cadastrar,
  buscarPorId,
  buscarPorNome,
  atualizar,
  deletar
};
