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
    created_at: {
        type: DataTypes.DATE(6), 
        allowNull: false
    }, 
    updated_at: {
        type: DataTypes.DATE(6), 
        allowNull: false
    }
}) 

module.exports = Note