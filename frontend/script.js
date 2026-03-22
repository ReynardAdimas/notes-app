let isEditMode = false;

function setEditMode() {
    isEditMode = true;
    updateUI();
}

function toggleMode() {
    // Simulasi jika tombol Add/Edit ditekan, kembali ke Add mode
    isEditMode = !isEditMode;
    updateUI();
}

function updateUI() {
    const title = document.getElementById('form-title');
    const btnDesktop = document.getElementById('btn-submit-desktop');
    const btnMobile = document.getElementById('btn-submit-mobile');

    if (isEditMode) {
        title.innerText = "Edit a Note";
        btnDesktop.innerText = "Edit";
        btnMobile.innerText = "Edit";
        
        // Sedikit mengubah tampilan input untuk mensimulasikan data yang sedang diedit
        document.querySelector('.input-title').value = "Weekly Task";
        document.querySelector('.input-body').value = "Lorem ipsum dolor sit amet...";
    } else {
        title.innerText = "Add a Note";
        btnDesktop.innerText = "Add";
        btnMobile.innerText = "Add";
        
        // Kosongkan form
        document.querySelector('.input-title').value = "";
        document.querySelector('.input-body').value = "";
    }
}