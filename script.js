
//DOM Variables
const todocardError = document.getElementById('error');
const todocardLine = document.getElementById('add-task');
const todocardSubmit = document.getElementById('add-task-btn');
const todocardCheck = document.getElementById('checkbox');
const todocardLabelCheck = document.getElementById('label-checkbox');


let editBool = false;

todocardLine.value = '';

todocardSubmit.addEventListener('click', (event)=> {
    event.preventDefault();
    editBool = false;
    tempLine = todocardLine.value.trim();
    if (!tempLine) {
        todocardError.classList.remove('hide');
    } else {
        viewList();
        todocardLine.value = '';
    }
})

function viewList() {
    let boxcard = document.getElementsByClassName('todo-list');
    let div = document.createElement('div');
    div.classList.add('todo-list-card');

    // Line
    div.innerHTML += `<input type="checkbox" id="checkbox" onclick="checked()">
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
    editBtn.addEventListener('click', () => {
        editBool = true;
        modifyElement(editBtn, true);
    })
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
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

// Checked
let checked = () => {
    if (todocardCheck.checked == true) {
        todocardLabelCheck.classList.add('label-checkedbox');
    } else {
        todocardLabelCheck.classList.remove('label-checkedbox');
    }
}