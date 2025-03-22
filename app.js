// define UI Variables
const form = document.querySelector('#task-form'),
    taskList = document.querySelector('.collection'),
    clearBtn = document.querySelector('.clear-tasks'),
    filter = document.querySelector('#filter'),
    taskInput = document.querySelector('#task');


//  load all event listeners

loadEventListeners()

function loadEventListeners() {

    // add task event
    form.addEventListener('submit', addTask)

    // remove task event
    taskList.addEventListener('click', removeTask)

    // clear tasks event
    clearBtn.addEventListener('click', clearTasks)

    // filter through tasks
    filter.addEventListener('keyup', FilterTasks)

    // DOM Load event to call stored tasks
    document.addEventListener('DOMContentLoaded', getTasks)

}


// get tasks function
function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // now lets looop through the tasks
    tasks.forEach(function (task) {
        // create Li element
        const li = document.createElement('li')
        // add class to it
        li.className = 'collection-item'
        // create the TextNode and Append it to the li
        li.appendChild(document.createTextNode(task))

        // create a new link element
        const link = document.createElement('a')
        // add class to it
        link.className = 'delete-item secondary-content'
        // add icon html
        link.innerHTML = '<i class="fa fa-remove" ></i>'
        // create the textNode and append it to the li
        li.appendChild(link)

        // append li and a to ul
        taskList.appendChild(li)


    })
}


// add task function

function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task')

    }


    // create Li element
    const li = document.createElement('li')
    // add class to it
    li.className = 'collection-item'
    // create the TextNode and Append it to the li
    li.appendChild(document.createTextNode(taskInput.value))

    // create a new link element
    const link = document.createElement('a')
    // add class to it
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class="fa fa-remove" ></i>'
    // create the textNode and append it to the li
    li.appendChild(link)

    // append li and a to ul
    taskList.appendChild(li)

    // store in local storage
    storeTaskInLocalStorage(taskInput.value)

    // clear input after appending

    taskInput.value = ''

    e.preventDefault()
}

// store Task Function
function storeTaskInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

// Remove task event listener

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove()

            // remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// clear tasks event listener

function clearTasks() {
    while (taskList.firstChild) {
        // if (confirm('are you sure!?')) {

        // }
        taskList.removeChild(taskList.firstChild)
    }

    // clear from local storage
    clearTasksFromLocalStorage()
}

// clear Tasks from Local storage
function clearTasksFromLocalStorage() {
    localStorage.clear()
}



// filter tasks event listener

function FilterTasks(e) {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }
        }
    )
}




















