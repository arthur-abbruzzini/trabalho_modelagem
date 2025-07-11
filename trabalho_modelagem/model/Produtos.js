const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto
