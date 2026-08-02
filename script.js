// =========================
// Notes App Pro
// JavaScript
// =========================

const addBtn = document.getElementById("addBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");

const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

const themeBtn = document.getElementById("themeBtn");


let notes =
JSON.parse(localStorage.getItem("notes")) || [];

let editIndex = null;


// Open Popup

addBtn.onclick = ()=>{

popup.style.display="flex";

};


// Close Popup

closeBtn.onclick = ()=>{

popup.style.display="none";

clearForm();

};


// Save Note

saveBtn.onclick = ()=>{


if(
noteTitle.value==="" ||
noteText.value===""

){

alert("Please write note");

return;

}


let note={

title:noteTitle.value,

text:noteText.value,

date:new Date().toLocaleDateString()

};



if(editIndex===null){

notes.push(note);

}else{

notes[editIndex]=note;

editIndex=null;

}



saveNotes();

displayNotes();

popup.style.display="none";

clearForm();


};



// Display Notes

function displayNotes(){

notesContainer.innerHTML="";


notes.forEach((note,index)=>{


notesContainer.innerHTML+=`

<div class="note">

<h3>${note.title}</h3>

<p>${note.text}</p>

<small>${note.date}</small>

<br>


<button class="edit"
onclick="editNote(${index})">

Edit

</button>


<button class="delete"
onclick="deleteNote(${index})">

Delete

</button>


</div>


`;


});


}



// Delete

function deleteNote(index){

notes.splice(index,1);

saveNotes();

displayNotes();

}



// Edit

function editNote(index){

let note=notes[index];


noteTitle.value=note.title;

noteText.value=note.text;


editIndex=index;


popup.style.display="flex";


}



// Search

search.onkeyup=()=>{


let value=
search.value.toLowerCase();


let allNotes=
document.querySelectorAll(".note");


allNotes.forEach(note=>{


if(
note.innerText
.toLowerCase()
.includes(value)

){

note.style.display="block";


}else{


note.style.display="none";


}


});


};




// Local Storage

function saveNotes(){

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}



// Clear Form

function clearForm(){

noteTitle.value="";

noteText.value="";

}



// Dark Mode

let dark=true;


themeBtn.onclick=()=>{


dark=!dark;


if(dark){


document.body.style.background=
"linear-gradient(135deg,#0f172a,#1e293b)";


}else{


document.body.style.background=
"linear-gradient(135deg,#f8fafc,#dbeafe)";


document.body.style.color="#111";


}


};



// Start

displayNotes();