const { DataTypes } = require('sequelize')
const sequelize = require('../config/database') 

const Note = sequelize.define("Note", {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    }, 
    judul: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
    isi: {
        type: DataTypes.STRING, 
        allowNull: false
    }, 
}, {
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
}) 

module.exports = Note