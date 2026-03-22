const Note = require('../schema/Note')

const findAll = async () => {
    return await Note.findAll({
        attributes: ["id", "judul", "isi"]
    })
} 

const create = async (noteData) => {
    return await Note.create(noteData)
} 

const findById = async (id) => {
    return await Note.findByPk(id, {
        attributes: ["id", "judul", "isi"]
    })
} 

const updateById = async (id, noteData) => {
    return await Note.update(noteData, {
        where: {
            id: id,
        }
    })
}

const deletById = async (id) => {
    return await Note.destroy({
        where: {
            id: id,
        }
    })
}

module.exports={
    findAll, 
    create, 
    findById, 
    updateById, 
    deletById,
}