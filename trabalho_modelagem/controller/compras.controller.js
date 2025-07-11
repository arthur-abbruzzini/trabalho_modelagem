const Compra = require('../model/Compras');

const cadastrar = async (req, res) => {
  const valores = req.body;
  try {
    const precoFinal = (valores.precoUnitario - (valores.precoUnitario * valores.desconto / 100)) * valores.quantidade;

    const novaCompra = await Compra.create({
      ...valores,
      precoFinal,
      dataCompra: new Date()
    });

    res.status(200).json(novaCompra);
  } catch (err) {
    console.error('Erro ao cadastrar os dados!', err);
    res.status(500).json({ message: 'Erro ao cadastrar os dados!' });
  }
};

const listar = async (req, res) => {
  try {
    const dados = await Compra.findAll();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao listar os dados!', err);
    res.status(500).json({ message: 'Erro ao listar os dados!' });
  }
};

const apagar = async (req, res) => {
  const { id } = req.params;
  try {
    await Compra.destroy({ where: { id } });
    res.status(200).json({ message: 'Compra removida com sucesso.' });
  } catch (err) {
    console.error('Erro ao apagar a compra!', err);
    res.status(500).json({ message: 'Erro ao apagar a compra!' });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const valores = req.body;
  try {
    await Compra.update(valores, { where: { id } });
    res.status(200).json({ message: 'Compra atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar a compra!', err);
    res.status(500).json({ message: 'Erro ao atualizar a compra!' });
  }
};

module.exports = { cadastrar, listar, apagar, atualizar };
