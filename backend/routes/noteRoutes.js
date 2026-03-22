const express = require("express")
const router = express.Router() 
const noteController = require('../controllers/notesController')

router.get("/", noteController.getAllNotes)
router.get("/:id", noteController.getNotesById)
router.post("/", noteController.createNotes)
router.put("/:id", noteController.updateNotes)
router.delete("/:id", noteController.deleteNote) 

module.exports = router