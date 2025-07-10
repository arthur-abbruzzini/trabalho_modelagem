const Usuario = require('./Usuario');
const Produto = require('./Produtos');
const Compra = require('./Compras');

// Um usuário pode ter várias compras
Usuario.hasMany(Compra, {
  foreignKey: 'usuarioId',
  as: 'comprasUsuario',
  onDelete: 'CASCADE'
});

// Cada compra pertence a um usuário
Compra.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuarioCompra',
  allowNull: false
});

// Um produto pode estar em várias compras
Produto.hasMany(Compra, {
  foreignKey: 'produtoId',
  as: 'comprasProduto',
  onDelete: 'CASCADE'
});

// Cada compra pertence a um produto
Compra.belongsTo(Produto, {
  foreignKey: 'produtoId',
  as: 'produtoCompra',
  allowNull: false
});

module.exports = { Usuario, Produto, Compra };
