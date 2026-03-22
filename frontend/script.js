// Data awal (Dummy data seperti di gambar)
let notes = [
    {
        id: 1,
        title: "Feedbacks",
        content: "Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis.",
        date: "5 days ago"
    },
    {
        id: 2,
        title: "Weekly Task",
        content: "Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis.",
        date: "2 weeks ago"
    },
    {
        id: 3,
        title: "Lyrics",
        content: "Lorem ipsum dolor sit amet consectetur. Sollicitudin enim risus ut vestibulum morbi tellus sit ac. Fames auctor quisque et aliquam maecenas sed at vitae facilisis.",
        date: "3 weeks ago"
    }
];

// Elemen DOM
const notesGrid = document.getElementById('notes-grid');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const inputTitle = document.getElementById('note-title');
const inputContent = document.getElementById('note-content');

let isEditing = false;
let currentEditId = null;

// Fungsi untuk menampilkan catatan
function renderNotes() {
    notesGrid.innerHTML = '';
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <div class="note-card-header">
                <div class="note-card-title">${note.title}</div>
                <div class="note-actions">
                    <i class="fa-solid fa-pencil" onclick="editNote(${note.id})"></i>
                    <i class="fa-regular fa-trash-can" onclick="deleteNote(${note.id})"></i>
                </div>
            </div>
            <div class="note-card-content">
                ${note.content}
            </div>
            <div class="note-card-footer">
                ${note.date}
            </div>
        `;
        notesGrid.appendChild(noteCard);
    });
}

// Fungsi untuk mengubah UI form menjadi mode Edit
window.editNote = function(id) {
    const noteToEdit = notes.find(n => n.id === id);
    if (!noteToEdit) return;

    isEditing = true;
    currentEditId = id;
    
    // Ubah text UI sesuai gambar "Edit a Note"
    formTitle.innerText = "Edit a Note";
    submitBtn.innerText = "Edit";
    
    // Isi input dengan data catatan
    inputTitle.value = noteToEdit.title;
    inputContent.value = noteToEdit.content;
};

// Fungsi menghapus catatan (bonus fungsionalitas)
window.deleteNote = function(id) {
    notes = notes.filter(n => n.id !== id);
    renderNotes();
};

// Simulasi tombol Add / Edit ditekan
submitBtn.addEventListener('click', () => {
    if(inputTitle.value.trim() === '' || inputContent.value.trim() === '') return;

    if (isEditing) {
        // Logika Update (Edit)
        const noteIndex = notes.findIndex(n => n.id === currentEditId);
        if (noteIndex !== -1) {
            notes[noteIndex].title = inputTitle.value;
            notes[noteIndex].content = inputContent.value;
        }
        
        // Kembalikan UI ke mode "Add a Note"
        isEditing = false;
        currentEditId = null;
        formTitle.innerText = "Add a Note";
        submitBtn.innerText = "Add";

    } else {
        // Logika Create (Add)
        const newNote = {
            id: Date.now(), // ID unik sederhana
            title: inputTitle.value,
            content: inputContent.value,
            date: "Just now"
        };
        notes.unshift(newNote); // Tambah ke awal array
    }

    // Reset input form
    inputTitle.value = '';
    inputContent.value = '';
    
    // Update tampilan grid
    renderNotes();
});

// Render awal saat halaman dimuat
renderNotes();