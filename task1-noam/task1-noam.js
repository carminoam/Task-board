const getLS = (key) => JSON.parse(localStorage.getItem(key))
const setLS = (key, value) => localStorage.setItem(key,JSON.stringify(value))

const form = document.querySelector('form')
const notesDiv = document.querySelector(".notes")

let tasks = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskDescription = form.elements.taskDescription.value
    const taskDate = form.elements.taskDate.value
    const taskTime = form.elements.taskTime.value    
    const task = {
        taskDescription: taskDescription,
        taskDate: taskDate,
        taskTime: taskTime
    }
    createNote(task)
    tasks.push(task)
    setLS('tasks',tasks)
    console.log(tasks)
    form.reset()
})

function createNote(noteToAdd) {
    const newNote = document.createElement('div')
    newNote.classList.add('note')

    const deleteButtun = document.createElement('button')
    deleteButtun.innerHTML = "X"
    deleteButtun.classList.add('btnX')
    deleteButtun.addEventListener('click',deleteNote)
    newNote.appendChild(deleteButtun)

    const taskDescription = document.createElement('div')
    taskDescription.innerHTML = noteToAdd.taskDescription

    const taskDate = document.createElement('div')
    taskDate.innerHTML = noteToAdd.taskDate
    newNote.appendChild(taskDate)
    taskDate.classList.add('time1')

    const taskTime = document.createElement('div')
    taskTime.innerHTML = noteToAdd.taskTime
    newNote.appendChild(taskTime)
    taskTime.classList.add('time2')
    
    newNote.appendChild(taskDescription)
    newNote.appendChild(taskTime)
    newNote.appendChild(taskDate)

    notesDiv.appendChild(newNote)
}

function cleanBoard() {
    tasks = []
    notesDiv.innerHTML = ''
    setLS('tasks', tasks)
    console.log(tasks)
}

function filter(fn) {
    fn(item, index)
}

function deleteNote(event) {
    const btnTarget = event.target
    const containerRef = btnTarget.parentElement
    const index = +containerRef.getAttribute('index')
    const arrayOfNotes = getLS('tasks')
    const arrayFiltered = arrayOfNotes.filter(
        function(note, i) {
            return index !== i
        }
    )
    tasks = arrayFiltered
    setLS('tasks', arrayFiltered)
    containerRef.remove()
    console.log(tasks)
}

function cleanForm() {
    form.reset()
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault
    if (getLS('tasks')) {
        tasks = getLS('tasks')
        for(let obj in tasks){
            createNote(tasks[obj])
        }
    }
})
