
//DOM Variables
const todocardError = document.getElementById('error');
const todocardLine = document.getElementById('add-task');
const todocardSubmit = document.getElementById('add-task-btn');

let editBool = false;

todocardLine.value = '';

let linesString = localStorage.getItem('Lines');
let lines = [];

if (linesString) {
  try {
    lines = JSON.parse(linesString);
  } catch (error) {
    console.error('Error parsing linesString:', error);
  }
}

let cards = { Lines: lines };
console.log('cards ::',cards)

if (Array.isArray(cards.Lines)) {
    cards.Lines.forEach((index) => {
        document.getElementsByClassName('todo-list-card').innerHTML += `
        <label for="checkbox" id="label-checkbox">${cards.Lines[index]}</label>`;
    })
}

todocardSubmit.addEventListener('click', (event)=> {
    event.preventDefault();
    editBool = false;
    tempLine = todocardLine.value.trim();
    if (!tempLine) {
        todocardError.classList.remove('hide');
    } else {
        viewList();
        cards.Lines.push(todocardLine.value);
        localStorage.setItem("Lines", JSON.stringify(cards.Lines));
        todocardLine.value = '';
    }
})


function viewList() {
    let boxcard = document.getElementsByClassName('todo-list');
    let div = document.createElement('div');
    div.classList.add('todo-list-card');

    // Checkbox
    let checkbtn = document.createElement('div');
    checkbtn.innerHTML = `<input type="checkbox" id="checkbox">`
    checkbtn.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.children[0].classList.toggle('label-checkedbox');
    })
    // Line
    div.innerHTML += `
    <label for="checkbox" id="label-checkbox">${todocardLine.value}</label>`;

    // Delete
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id','btn-trash');
    deleteBtn.innerHTML = `<img src="./images/icons8-trash.svg" id="trash" />`;
    deleteBtn.addEventListener('click', () => {
        modifyElement(deleteBtn);
    })

    //Edit
    let editBtn = document.createElement('button');
    editBtn.setAttribute('id','btn-edit');
    editBtn.innerHTML = `<img src="./images/icons8-edit-64.png" id="edit" />`;
    editBtn.addEventListener('click', (e) => {
        // editBool = true;
        // modifyElement(editBtn, true);
        e.target.parentElement.parentElement.children[0].contentEditable = true;
        e.target.parentElement.parentElement.children[0].classList.add('label-editable');
        e.target.parentElement.parentElement.children[1].children[0].disabled = true;
        e.target.parentElement.parentElement.children[4].classList.remove('hide');
        
    })

    // Edit Done
    let editedBtn = document.createElement('button');
    editedBtn.setAttribute('id','btn-edit-done');
    editedBtn.setAttribute('class','hide');
    editedBtn.innerHTML = `<img src="./images/icons8-done.svg" id="btn-edit-done-svg" />`
    editedBtn.addEventListener('click',(e) => {
        e.target.parentElement.parentElement.children[0].contentEditable = false;
        e.target.parentElement.parentElement.children[0].classList.remove('label-editable')
        e.target.parentElement.parentElement.children[1].children[0].disabled = false;
        e.target.parentElement.classList.add('hide')
    })
    div.appendChild(checkbtn);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    div.appendChild(editedBtn);
    boxcard[0].appendChild(div);
}

//Modify Elements
const modifyElement = (element,edit = false) => {
    let parentDiv = element.parentElement;
    let parentLine = parentDiv.querySelector('#label-checkbox').innerText;
    if (edit) {
        todocardLine.value = parentLine;
    }
    parentDiv.remove();
}
var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
console.log(obj)