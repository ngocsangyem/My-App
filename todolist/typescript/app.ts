import { Todo } from './model/todo.model';
import { TodoState } from './interface/todo.interface';
import { TodoService } from './service/todo.service';

class TodoList {
	private todoService: TodoService;

	constructor(todos: Todo[]) {
		this.todoService = new TodoService(todos);
	}

	private clearElement(element: HTMLElement) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	todoCountTask(): string {
		let todoCount = <HTMLElement>(
			document.querySelector('.td__header-count')
		);
		return (todoCount.innerHTML = this.todoService.countTask(todoCount));
	}

	todoAddTask(input: string) {
		this.todoService.render(input);
	}

	todoDeleteTask(index: string) {
		return this.todoService.deleteTask(index);
	}

	todoActiveTask() {
		let todosActiveTask = this.todoService.activeTask();
		console.log(todosActiveTask);

		return this.todoService.renderFilter(todosActiveTask);
	}

	todoCompleteTask() {
		let todosCompleteTask = this.todoService.completeTask();
		console.log(todosCompleteTask);

		return this.todoService.renderFilter(todosCompleteTask);
	}

	todoAllTask() {
		let tasks = this.todoService.allTask();

		return this.todoService.renderFilter(tasks);
	}

	todoClearCompleteTask() {
		let todos = this.todoService.clearCompleteTask();
		return this.todoService.renderFilter(todos);
	}

	todoInit() {
		let todoInput = <HTMLInputElement>document.getElementById('todoInput');
		let todoFooter = <HTMLElement>document.querySelector('.td__footer');
		let todoTaskWrapper = <HTMLElement>document.getElementById('bodyTasks');
		let todoBtnActive = <HTMLElement>(
			document.querySelector('.td__footer-filter--active')
		);
		let todoBtnComplete = <HTMLElement>(
			document.querySelector('.td__footer-filter--complete')
		);
		let todoBtnAll = <HTMLElement>(
			document.querySelector('.td__footer-filter--all')
		);
		let todoBtnClear = <HTMLElement>(
			document.querySelector('.td__footer-filter--clear')
		);

		todoInput.addEventListener('keypress', event => {
			if (event.key === 'Enter') {
				this.todoAddTask(todoInput.value);
				todoInput.value = '';
				todoFooter.style.display = 'flex';
				this.todoCountTask();
			}
		});

		todoTaskWrapper.addEventListener('click', event => {
			let parentId = (<HTMLDivElement>event.target).parentNode.parentNode
				.id;
			let parentTask = (<HTMLElement>event.target).parentNode.parentNode;
			this.todoDeleteTask(parentId);
			if (
				(<HTMLElement>event.target).matches('.td__body-task--destroy *')
			) {
				todoTaskWrapper.removeChild(parentTask);
			}
			this.todoCountTask();
		});

		todoBtnActive.addEventListener('click', () => {
			this.clearElement(todoTaskWrapper);
			this.todoActiveTask();
		});

		todoBtnComplete.addEventListener('click', () => {
			this.clearElement(todoTaskWrapper);
			this.todoCompleteTask();
		});

		todoBtnAll.addEventListener('click', () => {
			this.clearElement(todoTaskWrapper);
			this.todoAllTask();
		});

		todoBtnClear.addEventListener('click', () => {
			this.clearElement(todoTaskWrapper);
			this.todoClearCompleteTask();
			this.todoCountTask();
		});
	}
}

let todoApp = new TodoList([]);

todoApp.todoInit();
