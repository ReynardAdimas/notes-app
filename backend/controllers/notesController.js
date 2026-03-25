const notesModel = require("../models/notesModels") 

const getAllNotes = async (req, res) => {
    try {
        const allDataNotes = await notesModel.findAll(); 
        res.status(200).json({
            message: "Notes retrieved successfully", 
            data: allDataNotes
        })
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving data", 
            error: error.message
        })
    }
} 

const createNotes = async (req, res) => {
    const { judul, isi } = req.body 

    try {
        const newNotes = await notesModel.create({judul, isi}) 
        res.status(201).json({
            message: "Notes created successfully", 
            data: newNotes
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation Error", 
            error: error.message
        })
    }
}

const getNotesById = async (req, res) => {
    const {id} = req.params 

    try {
        const notes = await notesModel.findById(id)
        if(!notes)
        {
            return res.status(404).json({
                message: "Notes not found"
            })
        } 

        res.status(200).json({
            message: "Notes retrieved successfully", 
            data: notes
        })
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving notes", 
            error:error.message
        })
    }
} 

const updateNotes = async (req, res) => {
    const {id} = req.params 
    const {judul, isi} = req.body 

    try {
        const notes = await notesModel.findById(id) 
        if(!notes)
        {
            return res.status(404).json({
                message: "Notes not found"
            })
        }  

        const updatedNote = await notesModel.updateById(id, {
            judul, isi
        })
        res.status(200).json({
            message: "Notes updated successfully", 
            data: updatedNote
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating Notes", 
            error: error.message
        })
    }
} 

const deleteNote = async (req, res) => {
    const {id} = req.params 

    try {
        const notes = await notesModel.findById(id) 
        if(!notes)
        {
            return res.status(404).json({
                message: "Notes not found"
            })
        }

        const deletedNote = await notesModel.deletById(id) 
        res.status(200).json({
            message: "Notes deleted successfully", 
            data: deletedNote
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting notes", 
            error: error.message
        })
    }
} 

module.exports = {
    getAllNotes, 
    createNotes, 
    getNotesById, 
    updateNotes, 
    deleteNote
}