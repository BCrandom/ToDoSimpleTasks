import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from "./firebase.js";

const taskForm = document.querySelector('#task-form')
const taskContainer = document.querySelector('#task-list')

let editStatus = false;
let id = ''

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks((querySnapshot) => {
        let html = ''

        querySnapshot.forEach((doc) => {
            const tarea = doc.data()
            html += `
                <div id="task">
                    <h3>${tarea.title}</h3>
                    <p>${tarea.description}</p>
                    <button class='btn-delete' data-id="${doc.id}">Delete</button>
                    <button class='btn-edit' data-id="${doc.id}">Edit</button>
                    <button class='btn-pin' data-id="${doc.id}">${tarea.pinned ? 'Unpin' : 'Pin'}</button>
                </div>
            `
        });

        taskContainer.innerHTML = html;

        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                deleteTask(dataset.id)
            })
        });

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await getTask(dataset.id)
                const task = doc.data();

                taskForm["task-title"].value = task.title
                taskForm["task-description"].value = task.description

                editStatus = true;
                id = dataset.id;

                taskForm['btn-task-save'].innerText = 'Update'
            })
        });

        const btnsPin = taskContainer.querySelectorAll('.btn-pin')
        btnsPin.forEach((btn) => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await getTask(dataset.id)
                const task = doc.data();

                updateTask(dataset.id, {
                    pinned: !task.pinned
                })
            })
        });
    })
})

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editStatus) {
        saveTask(title.value, description.value, false) // Añadir el campo pinned
    } else {
        updateTask(id, {
            title: title.value, 
            description: description.value})
            taskForm['btn-task-save'].innerText = 'Save'

        editStatus = false;
    }

    taskForm.reset()
})