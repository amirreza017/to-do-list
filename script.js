
//DOM Variables
const todocardError = document.getElementById('error');
const todocardLine = document.getElementById('add-task');
const todocardSubmit = document.getElementById('add-task-btn');

// Display Cards From Local Storage
const createDivForEachLocalStorage = () => {
    cards.Lines.forEach((line,index) => {
        let boxcard = document.getElementsByClassName('todo-list');
        let div = document.createElement('div');
        div.classList.add('todo-list-card');

        // Line
        div.innerHTML += `
        <label for="checkbox" id="label-checkbox">${cards.Lines[index]}</label>`;

        // Checkbox
        let checkbtn = document.createElement('div');
        checkbtn.innerHTML = `<input type="checkbox" id="checkbox">`
        checkbtn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.children[0].classList.toggle('label-checkedbox');
        })

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
    })
}

// Show The Card After Adding It
function viewList() {
    let boxcard = document.getElementsByClassName('todo-list');
    let div = document.createElement('div');
    div.classList.add('todo-list-card');

    // Line
    div.innerHTML += `
    <label for="checkbox" id="label-checkbox">${todocardLine.value}</label>`;
    
    // Checkbox
    let checkbtn = document.createElement('div');
    checkbtn.innerHTML = `<input type="checkbox" id="checkbox">`
    checkbtn.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.children[0].classList.toggle('label-checkedbox');
    })
    

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

if (Array.isArray(cards.Lines)) {
    let html = '';
    createDivForEachLocalStorage()
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