const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    precoFinal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra
