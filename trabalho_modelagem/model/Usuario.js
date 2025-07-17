const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
})

module.exports = Usuario
