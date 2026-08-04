// =========================
// Advanced Notes Pro
// Part 1
// =========================

const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const noteCategory = document.getElementById("noteCategory");

const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

const themeBtn = document.getElementById("themeBtn");
const sortNotes = document.getElementById("sortNotes");
const exportBtn = document.getElementById("exportBtn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editIndex = null;

// =========================
// Open Popup
// =========================

addBtn.addEventListener("click", () => {

    popup.style.display = "flex";

});

// =========================
// Close Popup
// =========================

closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

    clearForm();

});

// =========================
// Save Note
// =========================

saveBtn.addEventListener("click", () => {

    if (
        noteTitle.value.trim() === "" ||
        noteText.value.trim() === ""
    ) {

        alert("Please enter title and note.");

        return;

    }

    const note = {

        title: noteTitle.value,

        text: noteText.value,

        category: noteCategory.value,

        date: new Date().toLocaleString()

    };

    if (editIndex === null) {

        notes.unshift(note);

    } else {

        notes[editIndex] = note;

        editIndex = null;

    }

    saveNotes();

    displayNotes();

    popup.style.display = "none";

    clearForm();

});

// =========================
// Local Storage
// =========================

function saveNotes() {

    localStorage.setItem(

        "notes",

        JSON.stringify(notes)

    );

}

// =========================
// Clear Form
// =========================

function clearForm() {

    noteTitle.value = "";

    noteText.value = "";

    noteCategory.value = "Personal";

}// =========================
// Part 2
// Display, Edit, Delete,
// Search
// =========================

function displayNotes() {

    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {

        notesContainer.innerHTML += `

        <div class="note">

            <h3>${note.title}</h3>

            <small>📂 ${note.category}</small><br>
            <small>📅 ${note.date}</small>

            <p>${note.text}</p>

            <div class="actions">

                <button class="edit"
                onclick="editNote(${index})">

                ✏ Edit

                </button>

                <button class="delete"
                onclick="deleteNote(${index})">

                🗑 Delete

                </button>

            </div>

        </div>

        `;

    });

}

// =========================
// Delete Note
// =========================

function deleteNote(index) {

    if (confirm("Delete this note?")) {

        notes.splice(index, 1);

        saveNotes();

        displayNotes();

    }

}

// =========================
// Edit Note
// =========================

function editNote(index) {

    const note = notes[index];

    noteTitle.value = note.title;

    noteText.value = note.text;

    noteCategory.value = note.category;

    editIndex = index;

    popup.style.display = "flex";

}

// =========================
// Search
// =========================

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const allNotes = document.querySelectorAll(".note");

    allNotes.forEach(note => {

        if (note.innerText.toLowerCase().includes(value)) {

            note.style.display = "block";

        } else {

            note.style.display = "none";

        }

    });

});// =========================
// Part 3 (Final)
// Theme • Sort • Export
// =========================

// Dark Mode

let dark = true;

themeBtn.addEventListener("click", () => {

    dark = !dark;

    if (dark) {

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e293b)";

        document.body.style.color = "#fff";

        themeBtn.innerHTML = "🌙";

    } else {

        document.body.style.background =
        "linear-gradient(135deg,#f8fafc,#dbeafe)";

        document.body.style.color = "#111827";

        themeBtn.innerHTML = "☀️";

    }

});

// =========================
// Sort Notes
// =========================

sortNotes.addEventListener("change", () => {

    if (sortNotes.value === "az") {

        notes.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    } else if (sortNotes.value === "old") {

        notes.reverse();

    } else {

        notes.reverse();

    }

    saveNotes();

    displayNotes();

});

// =========================
// Export Notes (JSON)
// =========================

exportBtn.addEventListener("click", () => {

    const data = JSON.stringify(notes, null, 2);

    const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "notes-backup.json";

    a.click();

    URL.revokeObjectURL(url);

});

// =========================
// Close Popup
// =========================

window.addEventListener("click", (e) => {

    if (e.target === popup) {

        popup.style.display = "none";

        clearForm();

    }

});

// =========================
// Start App
// =========================

displayNotes();