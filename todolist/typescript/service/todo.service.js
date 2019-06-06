"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state = false;
var TodoService = /** @class */ (function () {
    function TodoService(todos) {
        // state: boolean = false;
        this.id = 0;
        this.todos = [];
    }
    TodoService.prototype.generateId = function (length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
        var ID = '';
        for (var i = 0; i < length; i += 1) {
            ID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return 'task-' + ID;
    };
    TodoService.prototype.addTask = function (task) {
        var todo = {
            id: this.generateId(4),
            name: task,
            state: false,
        };
        this.todos.push(todo);
        // console.log(this.todos);
        return todo;
    };
    TodoService.prototype.renderTask = function (task) {
        var _this = this;
        var container = document.getElementById('bodyTasks');
        var html, newHtml, htmlDom;
        html = "<li class=\"td__body-task" + (task.state === true ? ' td__body-task--complete' : '') + "\" id=\"" + task.id + "\" data-id=\"" + task.id + "\">\n\t\t\t\t\t<input class=\"td__body-task--toggle\" type=\"checkbox\">\n\t\t\t\t\t<span>" + task.name + "</span>\n\t\t\t\t\t<button class=\"td__body-task--destroy\" data-button-id=\"" + task.id + "\"><i class=\"mdi mdi-window-close\"></i></button>\n\t\t\t\t</li>";
        container.insertAdjacentHTML("beforeend", html);
        var taskID = document.querySelector("[data-id=\"" + task.id + "\"]");
        if (taskID) {
            taskID.addEventListener('click', function (event) {
                _this.toggleState(task);
                taskID.classList.toggle('td__body-task--complete');
            });
        }
    };
    TodoService.prototype.findId = function () {
        return this.todos.map(function (todo) { return todo.id; });
    };
    TodoService.prototype.filterTaskType = function (type) {
        return (this.todos.slice().filter(function (todo) { return todo.state === type; }));
    };
    TodoService.prototype.render = function (input) {
        var newItem;
        newItem = this.addTask(input);
        this.renderTask(newItem);
    };
    TodoService.prototype.renderFilter = function (tasks) {
        for (var index = 0; index < tasks.length; index++) {
            var element = tasks[index];
            this.renderTask(element);
        }
    };
    TodoService.prototype.deleteTask = function (index) {
        var item, ids;
        ids = this.findId();
        item = ids.indexOf(index);
        if (item !== -1) {
            this.todos.splice(item, 1);
        }
        return this.todos;
    };
    TodoService.prototype.clearCompleteTask = function () {
        for (var index = this.todos.length - 1; index >= 0; index--) {
            if (this.todos[index].state === true) {
                this.todos.splice(index, 1);
            }
        }
        return this.todos;
    };
    TodoService.prototype.allTask = function () {
        return this.todos.slice();
    };
    TodoService.prototype.activeTask = function () {
        return this.filterTaskType(false);
    };
    TodoService.prototype.completeTask = function () {
        return this.filterTaskType(true);
    };
    TodoService.prototype.countTask = function (countElement) {
        if (this.todos.length > 0) {
            countElement.style.display = 'block';
        }
        else {
            countElement.style.display = 'none';
        }
        return String(this.todos.length);
    };
    TodoService.prototype.toggleState = function (todo) {
        todo.state = !todo.state;
        return todo.state;
    };
    return TodoService;
}());
exports.TodoService = TodoService;
