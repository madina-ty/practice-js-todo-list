const dom = {
    new: document.getElementById('new'),
    ad: document.getElementById('ad'),
    delete: document.getElementById('delete'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count'),
}
const tasks = [];
dom.ad.onclick = () => {
    const newTask = dom.new.value
    if(newTask && isNotHaveTask(newTask, tasks)) {
        adTask(newTask, tasks)
        dom.new.value = '';
        tasksRender(tasks)
    }
}

function adTask(text, list) {
    const time = Date.now();
    const task = {
        id: time,
        text,
        isComplete: false,
    }
    list.push(task)
    console.log(tasks)
}

function isNotHaveTask(text, list) {
    let isNotHave = true;

    list.forEach((task) => {
        if(task.text === text) {
            alert('The task already exists!')
            isNotHave = false;
        }
    });
    return isNotHave;
}

function tasksRender(list) {
    let htmlList = ''
    list.forEach((task) => {
        const cls = task.isComplete 
        ? 'todo__task todo__task_completed' 
        : 'todo__task';

        const checked = task.isComplete 
        ? 'checked'
        : '';


        const taskHtml = `
        <div class="${cls}" id="${task.id}">
                    <label class="todo__checkbox">
                            <input type="checkbox" ${checked}><div class="todo__checkbox-div"></div>
                    </label>
                    <div class="todo__task-title">
                        ${task.text}
                    </div>
                     <button id="delete"  class="todo__delete">-</button>
                </div>
            </div>
        `
        htmlList = htmlList + taskHtml;
    })

    dom.tasks.innerHTML = htmlList;
    renderTasksCount(list)
}

dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckBoxEl = target.classList.contains('todo__checkbox-div');

    if(isCheckBoxEl){
      const task = target.parentElement.parentElement;
      const taskId = task.getAttribute('id')
      changeTaskStatus(taskId, tasks)
      tasksRender(tasks)
    }
    
}
dom.tasks.onclick = (event) => {
    const isDeleteEl = event.target.classList.contains('todo__delete');

    if(isDeleteEl){
        const task = event.target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask(taskId, tasks);
        tasksRender(tasks);
    }
}
   

function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if(task.id == id){
            task.isComplete = !task.isComplete;
        }
    })
}

function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if(task.id == id) {
            list.splice(idx,1);
        }
    })
}

function renderTasksCount(list) {
    dom.count.innerHTML = list.length;
}