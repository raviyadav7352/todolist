(function () {  
    "use strict";
//my todoList web
    const tasklist = document.querySelector("#tasklist");
    const taskDoneList = document.querySelector("#taskDone");
    const removeBtn = document.querySelector("#removebtn");
    const taskInput = document.querySelector("#taskinput").children;
    const taskInputData = taskInput[0];
    const taskAddBtn = taskInput[1];
    let todoLists = [];

    let edittask;
    let istaskedit = true;

    // dummy data
    const todoData = [
        { id: 1, task: "buy a small diary", status: "pending" },
        { id: 2, task: "go to dmart for shoping", status: "pending" },
        { id: 3, task: "learn all array method", status: "pending" },
        { id: 4, task: "this is comleted", status: "completed" },
    ];

    // this function for localstorage setup

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

    function updateData(){
        syncTodoData(todoLists);
        showTask(todoLists);
    }

    document.addEventListener("keydown", function (event) {
        if (event?.key === 'Enter' && taskInputData.value.length) {
            if (istaskedit && taskInputData.value.length) {
                let valuedata = { id: Math.random(), status: "pending", task: taskInputData.value.trim()};
                taskInputData.value = '';
                todoLists.unshift(valuedata);
                updateData()
            } else {
                todoLists[edittask].task = taskInputData.value;
                updateData()
                taskInputData.value = '';
                istaskedit = true;
            }
        }
    })

    document.addEventListener("click", function (event) {
        let element = event.target;
        let purpose = element.getAttribute("purpose");
        if (element == removeBtn) {
            todoLists.splice(0, todoLists.length);
            updateData()
            istaskedit = true
        }
        if (element == taskAddBtn) {
            if (istaskedit && taskInputData.value.length) {
                let valuedata = { id: Math.random(), status: "pending", task: taskInputData.value.trim() };
                taskInputData.value = ''
                todoLists.unshift(valuedata)
                updateData()
            } else {
                todoLists[edittask].task = taskInputData.value
                updateData()
                taskInputData.value = ''
                istaskedit = true
            }
        }
        if (purpose == "edit") {
            let taskid = element.getAttribute("id")
            let taskids = todoLists.findIndex(todo => todo.id == taskid)
            taskInputData.value = todoLists[taskids].task
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

    // function for task-status check
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

    // function for display todolist
    function showTask(tasks) {
        setTimeout(() => {
        let html = '';
        let htmlchecked = '';
            tasks.forEach((todo, index) => {
                let iscompleted = (todoLists[index].status == "completed" ? "checked" : "")
                let statusIs = (todoLists[index].status == "completed" ? false : true)
                if (statusIs) {
                    html += ` 
                        <li class="todo">
                            <label for=${todo.id}>
                                <input type="checkbox" purpose="checking" class="check" id=${todo.id} ${iscompleted}>
                                <p class="task">${todo.task}</p>
                            </label>
                            <div class="fixtodo" id="fixtodo">
                                <span class="deletetask" id=${todo.id}  purpose="delete"></span>
                                <div class="edittask" id=${todo.id} purpose="edit"></div>
                            </div>
                        </li>`
                } else {
                    htmlchecked += `
                        <li class="todo">
                            <label for=${todo.id}>
                                <input type="checkbox" purpose="checking" class="check" id=${todo.id}  ${iscompleted}>
                                <p class="task">${todo.task}</p>
                            </label>
                            <div class="fixtodo" id="fixtodo">
                                <span class="deletetask" id=${todo.id}  purpose="delete"></span>
                                <div class="edittask" id=${todo.id} purpose="edit"></div>
                            </div>
                        </li>`
                }
            })
            if (html !== '') {
                tasklist.innerHTML = html
            } else {
                let textmessage = `<p class="message">Task not available, please add new</p>`
                tasklist.innerHTML = textmessage
            }
            if (htmlchecked !== '') {
                taskDoneList.innerHTML = htmlchecked
            } else {
                let textmessage = `<p class="message">No any task completed</p>`
                taskDoneList.innerHTML = textmessage
            }
    }, 100);
    }
})()
