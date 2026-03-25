const API_URL = "http://localhost:3000/api/v1/notes" 

const inputTitle = document.getElementById("input-title")
const inputBody = document.getElementById("input-body")
const formTitle = document.getElementById("form-title")
const btnDesktop = document.getElementById("btn-submit-desktop")
const btnMobile = document.getElementById("btn-submit-mobile")
// const btnCancel = document.getElementById("btn-cancel")
// const btnCancelMobile = document.getElementById("btn-cancel-mobile")
const logoElement = document.querySelector(".logo")
const notesGrid = document.querySelector(".notes-grid") 

let currentEditId = null 

document.addEventListener("DOMContentLoaded", fetchNotes) 

async function fetchNotes() {
    try {
        const res = await fetch(API_URL) 
        const result = await res.json() 

        const notes = result.data || result 
        renderNotes(notes)
    } catch (error) {
        console.error("Gagal mengambil data dari server:", error)
    }
} 

async function saveNote() {
    const judul = inputTitle.value.trim()
    const isi = inputBody.value.trim()

    if(!judul || !isi) {
        alert("Judul dan isi catatan tidak boleh kosong")
        return
    } 

    const payload = {judul, isi} 

    try {
        if (currentEditId) {
            await fetch(`${API_URL}/${currentEditId}`, {
                method: "PUT", 
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify(payload)
            })
        } else {
            await fetch(API_URL, {
                method: "POST", 
                headers: { "Content-Type": "application/json"}, 
                body: JSON.stringify(payload)
            })
        } 
        resetForm() 
        fetchNotes()
    } catch (error) {
        console.error("Gagal menyimpan data:", error)
    }
} 

async function deleteNote(id) {
    if(!confirm("Apakah kamu yakin ingin menghapus catatan ini?")) return
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        fetchNotes()
    } catch (error) {
        console.error("Gagal menghapus data:", error)
    }
} 


function renderNotes(notes) {
    notesGrid.innerHTML = "" 
    notes.reverse().forEach(note => {
        const dateFormatted = timeAgo(note.createdAt || new Date())
        const noteCard = document.createElement("div")
        noteCard.className = "note-card" 

        noteCard.innerHTML = ` 
            <div class="note-header">
                <h4>${escapeHTML(note.judul)}</h4>
                <div class="note-actions">
                    <i class="fa-solid fa-pen btn-edit" title="Edit"></i>
                    <i class="fa-regular fa-trash-can btn-delete" title="Delete"></i>
                </div>
            </div>
            <p class="note-body">${escapeHTML(note.isi)}</p>
            <span class="note-date">${dateFormatted}</span>
        ` 

        noteCard.querySelector('.btn-edit').addEventListener('click', () => {
            setEditMode(note.id, note.judul, note.isi)
        })

        noteCard.querySelector('.btn-delete').addEventListener('click', () => {
            deleteNote(note.id)
        }) 
        notesGrid.appendChild(noteCard)
    })
}

function setEditMode(id, judul, isi) {
    currentEditId = id 
    inputTitle.value = judul
    inputBody.value = isi 

    formTitle.innerText = "Edit a Note" 
    btnDesktop.innerText = "Save Edit" 
    btnMobile.innerText = "Save Edit"  
    // btnCancel.style.display = "inline-block"
    // btnCancelMobile.style.display = "inline-block"
    window.scrollTo({
        top:0, 
        behavior: 'smooth'
    })
} 

function resetForm() {
    currentEditId = null 
    inputTitle.value = "" 
    inputBody.value = "" 

    formTitle.innerText = "Add a Note" 
    btnDesktop.innerText = "Add" 
    btnMobile.innerText = "Add" 

    // btnCancel.style.display = "none"
    // btnCancelMobile.style.display = "none"
} 

function escapeHTML(str) {
    if (!str) return "" 
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag] || tag)) 

} 

function timeAgo(dateString) {
    const date = new Date(dateString) 
    const seconds = Math.floor((new Date()- date)/1000) 

    let interval = seconds/86400 
    if(interval >= 1) return Math.floor(interval) + " days ago" 
    interval = seconds / 3600 
    if(interval >= 1) return Math.floor(interval) + " hours ago" 
    interval = seconds / 60 
    if(interval >= 1) return Math.floor(interval) + " mins ago" 
    return "Just now"
} 

btnDesktop.addEventListener("click", saveNote)
btnMobile.addEventListener("click", saveNote)
// btnCancel.addEventListener("click", resetForm)
// btnCancelMobile.addEventListener("click", resetForm)

logoElement.addEventListener("click", () => {
    window.location.reload()
})