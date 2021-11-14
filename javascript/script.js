//Selectors
const addButton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-input");
const beforeNotes = document.querySelector(".before-notes");
const notes = document.querySelector(".notes");
const newNote =document.getElementsByClassName("new-note");
const saveButton = document.querySelector(".save-button");
// Event Listeners
addButton.addEventListener('click', addNote);
addInput.addEventListener('keypress',checkEnterKey); 
notes.addEventListener('click',deleteCheck);
notes.addEventListener('click',editCheck);
document.addEventListener("DOMContentLoaded",getNotes);
// Functions

function addNote(){
    if(addInput.value!=""){
    beforeNotes.style.display ="none";
  
    const noteDiv = document.createElement('div');
    noteDiv.classList.add("new-note");
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    noteDiv.style.border = "1.5px solid #" +randomColor;

    const noteDetails = document.createElement('h2');
    noteDetails.classList.add("note-details");
    noteDetails.innerText = addInput.value;
    noteDetails.style.borderBottom = "1px solid #" +randomColor;
    noteDiv.appendChild(noteDetails);
    
    //Add notes to local storage
    let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];	
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(addInput.value);
        localStorage.setItem("todos", JSON.stringify(todos));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";

    noteDiv.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit";
    noteDiv.appendChild(editButton);
    notes.appendChild(noteDiv);
    addInput.value = "";
    }
    
}

function checkEnterKey(e){
    if(e.keyCode == 13){
        addNote();
    }
}
function deleteCheck(e){
    let item =e.target;
    if(item.classList[0]=="delete-button"){
        item.parentElement.remove();
        removeNotes(item);
        if(newNote.length==0){
            beforeNotes.style.display ="flex";
        }
    }    
}
function editCheck(e){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const item = e.target;
    if(item.classList[0]=="edit-button"){
      addInput.value = item.parentElement.children[0].innerText;
      const index=item.parentElement.children[0].innerText;
      saveButton.onclick = function() {
        item.parentElement.children[0].innerText =addInput.value;
        todos[todos.indexOf(index)] =addInput.value;
        localStorage.setItem("todos",JSON.stringify(todos));
        addInput.value="";
      }
    }  
}
function getNotes(){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }
  else {
      todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach( function(e){
    beforeNotes.style.display ="none";
    const noteDiv = document.createElement('div');
    noteDiv.classList.add("new-note");
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    noteDiv.style.border = "1.5px solid #" +randomColor;

    const noteDetails = document.createElement('h2');
    noteDetails.classList.add("note-details");
    noteDetails.innerText = e;
    noteDetails.style.borderBottom = "1px solid #" +randomColor;
    noteDiv.appendChild(noteDetails);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";

    noteDiv.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.classList.add("edit-button");
    editButton.innerText = "Edit";
    noteDiv.appendChild(editButton);
    notes.appendChild(noteDiv);
  })
}
function removeNotes(e){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index=e.parentElement.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

