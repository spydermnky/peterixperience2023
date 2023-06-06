class Task {
    constructor(taskName) {
        this.taskName = taskName;
        this.completed = false;
    }

    static fromJSON(json) {
        const task = new Task(json.taskName);
        task.completed = json.completed;
        return task;
    }
}

class UI {
    constructor() {
        this.form = document.getElementById('form');
        
        this.taskName = document.getElementById('task-input');

        this.tableBody = document.getElementById('table-body');

        this.form.addEventListener('submit', (e) => this.onFormSubmit(e));

        this.tasks = [];
        this.loadTasksFromLocalStorage();
        this.renderTaskTable();

    }

    onFormSubmit(e){
        e.preventDefault();

        if (this.taskName.value === '') {
            return;
        }

        const task = new Task(this.taskName.value);

        this.tasks.push(task);

        this.saveTasksToLocalStorage();
        this.renderTaskTable();

        this.taskName.value = '';
    }

    renderTaskTable() {
        this.tableBody.innerHTML = '';

        for (let i = 0; i < this.tasks.length; i++){
            const task = this.tasks[i];
            
            const tr = this.createTaskTableRow(task);
            this.tableBody.appendChild(tr);
        }
    }

    createTaskTableRow(task){
        const tr = document.createElement('tr');

        const tdTaskName = document.createElement('td');
        const tdComplete = document.createElement('td');
        const tdActions = document.createElement('td');

        tdTaskName.innerHTML = task.taskName;
        tdTaskName.style.textAlign = 'center';

        const completionButtons = this.createCompletionButton(task);
        tdComplete.appendChild(completionButtons[0]);

        const actionButtons = this.createActionButtons(task);
        tdActions.appendChild(actionButtons[0]);

        tr.appendChild(tdTaskName);
        tr.appendChild(tdComplete);
        tr.appendChild(tdActions);

        return tr;
    }

    createCompletionButton(task){
        const completeButton = document.createElement('input');

        completeButton.setAttribute('type', 'checkbox');

        completeButton.checked = task.completed;

        completeButton.style.display = 'block';
        completeButton.style.margin = 'auto';
        completeButton.style.top = '100%';

        completeButton.addEventListener('change', () => {
            task.completed = completeButton.checked;
            this.saveTasksToLocalStorage();
        });

        return [completeButton];
    }

    createActionButtons(task){
        const deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'img/trash.png'); 
        //deleteButton.setAttribute('alt', 'Delete');
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.width = '16px'; 

        deleteButton.style.display = 'block';
        deleteButton.style.margin = 'auto';
        deleteButton.style.top = '100%';

        deleteButton.addEventListener('click', () => this.onRemoveTaskClicked(task));

        return [deleteButton];
    }

    onRemoveTaskClicked(task){
        this.tasks = this.tasks.filter((x) => {
            return task.taskName !== x.taskName;
        });

        this.saveTasksToLocalStorage();
        this.renderTaskTable();
    }

    saveTasksToLocalStorage() {
        const json = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', json);
    }

    loadTasksFromLocalStorage() {
        const json = localStorage.getItem('tasks');
        if (json) {
            const taskArr = JSON.parse(json);
            this.tasks = taskArr.map((x) => Task.fromJSON(x));
        }
    }
}

const ui = new UI();

