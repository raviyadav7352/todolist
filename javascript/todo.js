//my todoList web

const tasklist = document.querySelector("#tasklist");
const taskDoneList = document.querySelector("#taskDone");

const removeBtn = document.querySelector("#removebtn");
const taskInput = document.querySelector("#taskinput").children;
const taskInputData = taskInput[0];
const taskAddBtn = taskInput[1];
let todoLists = [];

let edittask;
let istaskedit = true

const todoData = [
    { id: 1, task: "buy a small diary", status: "pending" },
    { id: 2, task: "go to dmart for shoping", status: "pending" },
    { id: 3, task: "learn all array method", status: "pending" }
];
function handleData(){
    todoLists= JSON.parse(localStorage.getItem("taskData"))
    if(todoLists == null){
        localStorage.setItem('taskData', JSON.stringify(todoData))
        todoLists =JSON.parse(localStorage.getItem("taskData"))
    }
}
function syncTodoData(todoData){
    localStorage.setItem('taskData', JSON.stringify(todoData))
}
handleData()

//rendering todolist
showTask(todoLists)

document.addEventListener("keydown", function (event) {
    if (event?.key === 'Enter' && taskInputData.value.length) {
        if (istaskedit && taskInputData.value.length) {
            let valuedata = { id: Math.random(), status: "pending", task: taskInputData.value.trim() };
            taskInputData.value = ''
            todoLists.unshift(valuedata)
            syncTodoData(todoLists)
            showTask(todoLists)



        } else {
            todoLists[edittask].task = taskInputData.value
            syncTodoData(todoLists)
            showTask(todoLists)
            taskInputData.value = ''
            istaskedit = true

        }

    }
})

document.addEventListener("click", function (event) {

    let element = event.target;
    let purpose = element.getAttribute("purpose");
    //console.log(purpose)
    console.log(element)
    if (element == removeBtn) {
        todoLists.splice(0, todoLists.length);
        // taskInputData.value = ''
        syncTodoData(todoLists)
        showTask(todoLists)
        istaskedit = true

    }
    if (element == taskAddBtn) {
        if (istaskedit && taskInputData.value.length) {
            let valuedata = { id: Math.random(), status: "pending", task: taskInputData.value.trim() };
            taskInputData.value = ''
            todoLists.unshift(valuedata)
            syncTodoData(todoLists)
            showTask(todoLists)



        } else {
            todoLists[edittask].task = taskInputData.value
            syncTodoData(todoLists)
            showTask(todoLists)
            taskInputData.value = ''
            istaskedit = true

        }
    }

    if (purpose == "edit") {
        let taskid = element.getAttribute("id")
        let taskids = todoLists.findIndex(todo => todo.id == taskid)
        taskInputData.value = todoLists[taskids].task
        // if(purpose =="add" && taskids){
        //     todoLists[taskids].status ="pending"
        //     showTask(todoLists)}
        edittask = taskids
        istaskedit = false
        syncTodoData(todoLists)

    } else if (purpose == "delete") {
        let taskid = element.getAttribute("id")
        let task = todoLists.findIndex(todo => todo.id == taskid)
        todoLists.splice(task, 1)
        syncTodoData(todoLists)
        showTask(todoLists)
        taskInputData.value = ''
    }
    if (purpose == "checking") {
        let taskcheck = Array.from(document.getElementsByClassName("check"));
        checkedtask(taskcheck)
        syncTodoData(todoLists)
        showTask(todoLists)
    }

})


let todoCompleted = [];
let setTodo = ([todoCompleted])

function checkedtask(taask) {
    taask.forEach((input, index) => {
        if (input.checked) {
            todoCompleted.push(todoLists[index])
            todoLists[index].status = "completed"
        } else {
            todoLists[index].status = "pending"
        }
    })
}


function showTask(arr) {

    let html = '';
    let htmlchecked = '';
    if (true) {
        arr.forEach((todo, index) => {
            let iscompleted = (todoLists[index].status == "completed" ? "checked" : "")
            let statusIs = (todoLists[index].status == "completed" ? false : true)
            if (statusIs) {
                html += ` 
                <li class="todo">
                    <label for=${todo.id}>
                        <input type="checkbox" purpose="checking" class="check" id=${todo.id}  ${iscompleted}>
                        <p class="text">${todo.task}</p>
                    </label>
                        <div class="fixtodo" id="fixtodo">
                            <span class="logo" id=${todo.id}  purpose="delete"></span>
                            <div class="tasklogic" id=${todo.id} purpose="edit"></div>
                        </div>
                    </div>
                </li>`
            } else {
                htmlchecked += `
            <li class="todo">
                    <label for=${todo.id}>
                        <input type="checkbox" purpose="checking" class="check" id=${todo.id}  ${iscompleted}>
                        <p class="text">${todo.task}</p>
                    </label>
                        <div class="fixtodo" id="fixtodo">
                            <span class="logo" id=${todo.id}  purpose="delete"></span>
                            <div class="tasklogic" id=${todo.id} purpose="edit"></div>
                        </div>
                    </div>
                </li>`
            }
        })
        if (html !== '') {
            tasklist.innerHTML = html
        } else {
            let textmessage = `<p class="message">no task available,please add new</p>`
            tasklist.innerHTML = textmessage
        }
        if (htmlchecked !== '') {
            taskDoneList.innerHTML = htmlchecked
        } else {
            let textmessage = `<p class="message">no task completed</p>`
            taskDoneList.innerHTML = textmessage
        }

    }

}

