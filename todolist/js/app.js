(function() {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = 'function' == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw ((a.code = 'MODULE_NOT_FOUND'), a);
				}
				var p = (n[i] = { exports: {} });
				e[i][0].call(
					p.exports,
					function(r) {
						var n = e[i][1][r];
						return o(n || r);
					},
					p,
					p.exports,
					r,
					e,
					n,
					t
				);
			}
			return n[i].exports;
		}
		for (
			var u = 'function' == typeof require && require, i = 0;
			i < t.length;
			i++
		)
			o(t[i]);
		return o;
	}
	return r;
})()(
	{
		1: [
			function(require, module, exports) {
				'use strict';

				Object.defineProperty(exports, '__esModule', {
					value: true
				});

				var todo_service_1 = require('./service/todo.service');

				var TodoList =
					/** @class */
					(function() {
						function TodoList(todos) {
							this.todoService = new todo_service_1.TodoService(
								todos
							);
						}

						TodoList.prototype.clearElement = function(element) {
							while (element.firstChild) {
								element.removeChild(element.firstChild);
							}
						};

						TodoList.prototype.todoCountTask = function() {
							var todoCount = document.querySelector(
								'.td__header-count'
							);
							return (todoCount.innerHTML = this.todoService.countTask(
								todoCount
							));
						};

						TodoList.prototype.todoAddTask = function(input) {
							this.todoService.render(input);
						};

						TodoList.prototype.todoDeleteTask = function(index) {
							return this.todoService.deleteTask(index);
						};

						TodoList.prototype.todoActiveTask = function() {
							var todosActiveTask = this.todoService.activeTask();
							console.log(todosActiveTask);
							return this.todoService.renderFilter(
								todosActiveTask
							);
						};

						TodoList.prototype.todoCompleteTask = function() {
							var todosCompleteTask = this.todoService.completeTask();
							console.log(todosCompleteTask);
							return this.todoService.renderFilter(
								todosCompleteTask
							);
						};

						TodoList.prototype.todoAllTask = function() {
							var tasks = this.todoService.allTask();
							return this.todoService.renderFilter(tasks);
						};

						TodoList.prototype.todoClearCompleteTask = function() {
							var todos = this.todoService.clearCompleteTask();
							return this.todoService.renderFilter(todos);
						};

						TodoList.prototype.todoInit = function() {
							var _this = this;

							var todoInput = document.getElementById(
								'todoInput'
							);
							var todoFooter = document.querySelector(
								'.td__footer'
							);
							var todoTaskWrapper = document.getElementById(
								'bodyTasks'
							);
							var todoBtnActive = document.querySelector(
								'.td__footer-filter--active'
							);
							var todoBtnComplete = document.querySelector(
								'.td__footer-filter--complete'
							);
							var todoBtnAll = document.querySelector(
								'.td__footer-filter--all'
							);
							var todoBtnClear = document.querySelector(
								'.td__footer-filter--clear'
							);
							todoInput.addEventListener('keypress', function(
								event
							) {
								if (event.key === 'Enter') {
									_this.todoAddTask(todoInput.value);

									todoInput.value = '';
									todoFooter.style.display = 'flex';

									_this.todoCountTask();
								}
							});
							todoTaskWrapper.addEventListener('click', function(
								event
							) {
								var parentId =
									event.target.parentNode.parentNode.id;
								var parentTask =
									event.target.parentNode.parentNode;

								_this.todoDeleteTask(parentId);

								if (
									event.target.matches(
										'.td__body-task--destroy *'
									)
								) {
									todoTaskWrapper.removeChild(parentTask);
								}

								_this.todoCountTask();
							});
							todoBtnActive.addEventListener('click', function() {
								_this.clearElement(todoTaskWrapper);

								_this.todoActiveTask();
							});
							todoBtnComplete.addEventListener(
								'click',
								function() {
									_this.clearElement(todoTaskWrapper);

									_this.todoCompleteTask();
								}
							);
							todoBtnAll.addEventListener('click', function() {
								_this.clearElement(todoTaskWrapper);

								_this.todoAllTask();
							});
							todoBtnClear.addEventListener('click', function() {
								_this.clearElement(todoTaskWrapper);

								_this.todoClearCompleteTask();

								_this.todoCountTask();
							});
						};

						return TodoList;
					})();

				var todoApp = new TodoList([]);
				todoApp.todoInit();
			},
			{ './service/todo.service': 2 }
		],
		2: [
			function(require, module, exports) {
				'use strict';

				Object.defineProperty(exports, '__esModule', {
					value: true
				});
				var state = false;

				var TodoService =
					/** @class */
					(function() {
						function TodoService(todos) {
							// state: boolean = false;
							this.id = 0;
							this.todos = [];
						}

						TodoService.prototype.generateId = function(length) {
							var chars =
								'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
							var ID = '';

							for (var i = 0; i < length; i += 1) {
								ID += chars.charAt(
									Math.floor(Math.random() * chars.length)
								);
							}

							return 'task-' + ID;
						};

						TodoService.prototype.addTask = function(task) {
							var todo = {
								id: this.generateId(4),
								name: task,
								state: false
							};
							this.todos.push(todo); // console.log(this.todos);

							return todo;
						};

						TodoService.prototype.renderTask = function(task) {
							var _this = this;

							var container = document.getElementById(
								'bodyTasks'
							);
							var html, newHtml, htmlDom;
							html =
								'<li class="td__body-task' +
								(task.state === true
									? ' td__body-task--complete'
									: '') +
								'" id="' +
								task.id +
								'" data-id="' +
								task.id +
								'">\n\t\t\t\t\t<input class="td__body-task--toggle" type="checkbox">\n\t\t\t\t\t<span>' +
								task.name +
								'</span>\n\t\t\t\t\t<button class="td__body-task--destroy" data-button-id="' +
								task.id +
								'"><i class="mdi mdi-window-close"></i></button>\n\t\t\t\t</li>';
							container.insertAdjacentHTML('beforeend', html);
							var taskID = document.querySelector(
								'[data-id="' + task.id + '"]'
							);

							if (taskID) {
								taskID.addEventListener('click', function(
									event
								) {
									_this.toggleState(task);

									taskID.classList.toggle(
										'td__body-task--complete'
									);
								});
							}
						};

						TodoService.prototype.findId = function() {
							return this.todos.map(function(todo) {
								return todo.id;
							});
						};

						TodoService.prototype.filterTaskType = function(type) {
							return this.todos.slice().filter(function(todo) {
								return todo.state === type;
							});
						};

						TodoService.prototype.render = function(input) {
							var newItem;
							newItem = this.addTask(input);
							this.renderTask(newItem);
						};

						TodoService.prototype.renderFilter = function(tasks) {
							for (var index = 0; index < tasks.length; index++) {
								var element = tasks[index];
								this.renderTask(element);
							}
						};

						TodoService.prototype.deleteTask = function(index) {
							var item, ids;
							ids = this.findId();
							item = ids.indexOf(index);

							if (item !== -1) {
								this.todos.splice(item, 1);
							}

							return this.todos;
						};

						TodoService.prototype.clearCompleteTask = function() {
							for (
								var index = this.todos.length - 1;
								index >= 0;
								index--
							) {
								if (this.todos[index].state === true) {
									this.todos.splice(index, 1);
								}
							}

							return this.todos;
						};

						TodoService.prototype.allTask = function() {
							return this.todos.slice();
						};

						TodoService.prototype.activeTask = function() {
							return this.filterTaskType(false);
						};

						TodoService.prototype.completeTask = function() {
							return this.filterTaskType(true);
						};

						TodoService.prototype.countTask = function(
							countElement
						) {
							if (this.todos.length > 0) {
								countElement.style.display = 'block';
							} else {
								countElement.style.display = 'none';
							}

							return String(this.todos.length);
						};

						TodoService.prototype.toggleState = function(todo) {
							todo.state = !todo.state;
							return todo.state;
						};

						return TodoService;
					})();

				exports.TodoService = TodoService;
			},
			{}
		]
	},
	{},
	[1]
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL3R5cGVzY3JpcHQvYXBwLnRzIiwic3JjL2FwcC90eXBlc2NyaXB0L3NlcnZpY2UvdG9kby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDRUEsSUFBQSxjQUFBLEdBQUEsT0FBQSxDQUFBLHdCQUFBLENBQUE7O0FBRUEsSUFBQSxRQUFBO0FBQUE7QUFBQSxZQUFBO0FBS0MsV0FBQSxRQUFBLENBQVksS0FBWixFQUF5QjtBQUN4QixTQUFLLFdBQUwsR0FBbUIsSUFBSSxjQUFBLENBQUEsV0FBSixDQUFnQixLQUFoQixDQUFuQjtBQUNBOztBQUVPLEVBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxZQUFBLEdBQVIsVUFBc0IsT0FBdEIsRUFBMEM7QUFDekMsV0FBTyxPQUFPLENBQUMsVUFBZixFQUEyQjtBQUMxQixNQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQU8sQ0FBQyxVQUE1QjtBQUNBO0FBQ0QsR0FKTzs7QUFNUixFQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEsYUFBQSxHQUFBLFlBQUE7QUFDQyxRQUFJLFNBQVMsR0FBZ0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLENBQTdCO0FBQ0EsV0FBTyxTQUFTLENBQUMsU0FBVixHQUFzQixLQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsU0FBM0IsQ0FBN0I7QUFDQSxHQUhEOztBQUtBLEVBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxXQUFBLEdBQUEsVUFBWSxLQUFaLEVBQXlCO0FBQ3hCLFNBQUssV0FBTCxDQUFpQixNQUFqQixDQUF3QixLQUF4QjtBQUNBLEdBRkQ7O0FBSUEsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsR0FBQSxVQUFlLEtBQWYsRUFBNEI7QUFDM0IsV0FBTyxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsS0FBNUIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsR0FBQSxZQUFBO0FBQ0MsUUFBSSxlQUFlLEdBQUcsS0FBSyxXQUFMLENBQWlCLFVBQWpCLEVBQXRCO0FBQ0EsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVo7QUFFQSxXQUFPLEtBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixlQUE5QixDQUFQO0FBQ0EsR0FMRDs7QUFPQSxFQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEsZ0JBQUEsR0FBQSxZQUFBO0FBQ0MsUUFBSSxpQkFBaUIsR0FBRyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsRUFBeEI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7QUFFQSxXQUFPLEtBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixpQkFBOUIsQ0FBUDtBQUNBLEdBTEQ7O0FBT0EsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLFdBQUEsR0FBQSxZQUFBO0FBQ0MsUUFBSSxLQUFLLEdBQUcsS0FBSyxXQUFMLENBQWlCLE9BQWpCLEVBQVo7QUFFQSxXQUFPLEtBQUssV0FBTCxDQUFpQixZQUFqQixDQUE4QixLQUE5QixDQUFQO0FBQ0EsR0FKRDs7QUFNQSxFQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEscUJBQUEsR0FBQSxZQUFBO0FBQ0MsUUFBSSxLQUFLLEdBQUcsS0FBSyxXQUFMLENBQWlCLGlCQUFqQixFQUFaO0FBQ0EsV0FBTyxLQUFLLFdBQUwsQ0FBaUIsWUFBakIsQ0FBOEIsS0FBOUIsQ0FBUDtBQUNBLEdBSEQ7O0FBS0EsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsR0FBQSxZQUFBO0FBQUEsUUFBQSxLQUFBLEdBQUEsSUFBQTs7QUFDQyxRQUFJLFNBQVMsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbEM7QUFDQSxRQUFJLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBOUI7QUFDQSxRQUFJLGVBQWUsR0FBZ0IsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbkM7QUFDQSxRQUFJLGFBQWEsR0FBZ0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsNEJBQXZCLENBQWpDO0FBQ0EsUUFBSSxlQUFlLEdBQWdCLFFBQVEsQ0FBQyxhQUFULENBQXVCLDhCQUF2QixDQUFuQztBQUNBLFFBQUksVUFBVSxHQUFnQixRQUFRLENBQUMsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBOUI7QUFDQSxRQUFJLFlBQVksR0FBZ0IsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsMkJBQXZCLENBQWhDO0FBRUEsSUFBQSxTQUFTLENBQUMsZ0JBQVYsQ0FBMkIsVUFBM0IsRUFBdUMsVUFBQyxLQUFELEVBQU07QUFDNUMsVUFBSSxLQUFLLENBQUMsR0FBTixLQUFjLE9BQWxCLEVBQTJCO0FBQzFCLFFBQUEsS0FBSSxDQUFDLFdBQUwsQ0FBaUIsU0FBUyxDQUFDLEtBQTNCOztBQUNBLFFBQUEsU0FBUyxDQUFDLEtBQVYsR0FBa0IsRUFBbEI7QUFDQSxRQUFBLFVBQVUsQ0FBQyxLQUFYLENBQWlCLE9BQWpCLEdBQTJCLE1BQTNCOztBQUNBLFFBQUEsS0FBSSxDQUFDLGFBQUw7QUFDQTtBQUNELEtBUEQ7QUFTQSxJQUFBLGVBQWUsQ0FBQyxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsVUFBQyxLQUFELEVBQU07QUFDL0MsVUFBSSxRQUFRLEdBQWlCLEtBQUssQ0FBQyxNQUFOLENBQWMsVUFBZCxDQUF5QixVQUF6QixDQUFvQyxFQUFqRTtBQUNBLFVBQUksVUFBVSxHQUFpQixLQUFLLENBQUMsTUFBTixDQUFjLFVBQWQsQ0FBeUIsVUFBeEQ7O0FBQ0EsTUFBQSxLQUFJLENBQUMsY0FBTCxDQUFvQixRQUFwQjs7QUFDQSxVQUFrQixLQUFLLENBQUMsTUFBTixDQUFjLE9BQWQsQ0FBc0IsMkJBQXRCLENBQWxCLEVBQXNFO0FBQ3JFLFFBQUEsZUFBZSxDQUFDLFdBQWhCLENBQTRCLFVBQTVCO0FBQ0E7O0FBQ0QsTUFBQSxLQUFJLENBQUMsYUFBTDtBQUNBLEtBUkQ7QUFVQSxJQUFBLGFBQWEsQ0FBQyxnQkFBZCxDQUErQixPQUEvQixFQUF3QyxZQUFBO0FBQ3ZDLE1BQUEsS0FBSSxDQUFDLFlBQUwsQ0FBa0IsZUFBbEI7O0FBQ0EsTUFBQSxLQUFJLENBQUMsY0FBTDtBQUNBLEtBSEQ7QUFLQSxJQUFBLGVBQWUsQ0FBQyxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBQTtBQUN6QyxNQUFBLEtBQUksQ0FBQyxZQUFMLENBQWtCLGVBQWxCOztBQUNBLE1BQUEsS0FBSSxDQUFDLGdCQUFMO0FBQ0EsS0FIRDtBQUtBLElBQUEsVUFBVSxDQUFDLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFlBQUE7QUFDcEMsTUFBQSxLQUFJLENBQUMsWUFBTCxDQUFrQixlQUFsQjs7QUFDQSxNQUFBLEtBQUksQ0FBQyxXQUFMO0FBQ0EsS0FIRDtBQUtBLElBQUEsWUFBWSxDQUFDLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQUE7QUFDdEMsTUFBQSxLQUFJLENBQUMsWUFBTCxDQUFrQixlQUFsQjs7QUFDQSxNQUFBLEtBQUksQ0FBQyxxQkFBTDs7QUFDQSxNQUFBLEtBQUksQ0FBQyxhQUFMO0FBQ0EsS0FKRDtBQUtBLEdBaEREOztBQWlERCxTQUFBLFFBQUE7QUFBQyxDQXRHRCxFQUFBOztBQXdHQSxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQUosQ0FBYSxFQUFiLENBQWQ7QUFFQSxPQUFPLENBQUMsUUFBUjs7Ozs7Ozs7QUN6R0EsSUFBSSxLQUFLLEdBQUcsS0FBWjs7QUFDQSxJQUFBLFdBQUE7QUFBQTtBQUFBLFlBQUE7QUFLQyxXQUFBLFdBQUEsQ0FBWSxLQUFaLEVBQXlCO0FBSnpCO0FBQ1EsU0FBQSxFQUFBLEdBQWEsQ0FBYjtBQUNBLFNBQUEsS0FBQSxHQUFnQixFQUFoQjtBQUdQOztBQUVPLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEdBQVIsVUFBbUIsTUFBbkIsRUFBaUM7QUFDaEMsUUFBTSxLQUFLLEdBQUcsZ0VBQWQ7QUFDQSxRQUFJLEVBQUUsR0FBRyxFQUFUOztBQUNBLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsTUFBcEIsRUFBNEIsQ0FBQyxJQUFJLENBQWpDLEVBQW9DO0FBQ25DLE1BQUEsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxLQUFnQixLQUFLLENBQUMsTUFBakMsQ0FBYixDQUFOO0FBQ0E7O0FBQ0QsV0FBTyxVQUFVLEVBQWpCO0FBQ0EsR0FQTzs7QUFRQSxFQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxHQUFSLFVBQWdCLElBQWhCLEVBQTRCO0FBQzNCLFFBQUksSUFBSSxHQUFTO0FBQ2hCLE1BQUEsRUFBRSxFQUFFLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQURZO0FBRWhCLE1BQUEsSUFBSSxFQUFFLElBRlU7QUFHaEIsTUFBQSxLQUFLLEVBQUU7QUFIUyxLQUFqQjtBQUtBLFNBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFOMkIsQ0FPM0I7O0FBRUEsV0FBTyxJQUFQO0FBQ0EsR0FWTzs7QUFZQSxFQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsVUFBQSxHQUFSLFVBQW1CLElBQW5CLEVBQTZCO0FBQTdCLFFBQUEsS0FBQSxHQUFBLElBQUE7O0FBQ0MsUUFBSSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLENBQTdCO0FBQ0EsUUFBSSxJQUFKLEVBQWtCLE9BQWxCLEVBQW1DLE9BQW5DO0FBQ0EsSUFBQSxJQUFJLEdBQUksK0JBQTJCLElBQUksQ0FBQyxLQUFMLEtBQWUsSUFBZixHQUFzQiwwQkFBdEIsR0FBbUQsRUFBOUUsSUFBZ0YsVUFBaEYsR0FBMEYsSUFBSSxDQUFDLEVBQS9GLEdBQWlHLGVBQWpHLEdBQStHLElBQUksQ0FBQyxFQUFwSCxHQUFzSCw0RkFBdEgsR0FFRyxJQUFJLENBQUMsSUFGUixHQUVZLCtFQUZaLEdBR29ELElBQUksQ0FBQyxFQUh6RCxHQUcyRCxtRUFIbkU7QUFNQSxJQUFBLFNBQVMsQ0FBQyxrQkFBVixDQUE2QixXQUE3QixFQUEwQyxJQUExQztBQUVBLFFBQUksTUFBTSxHQUFnQixRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBYSxJQUFJLENBQUMsRUFBbEIsR0FBb0IsS0FBM0MsQ0FBMUI7O0FBRUEsUUFBSSxNQUFKLEVBQVk7QUFDWCxNQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFBLEtBQUEsRUFBSztBQUNyQyxRQUFBLEtBQUksQ0FBQyxXQUFMLENBQWlCLElBQWpCOztBQUNBLFFBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IseUJBQXhCO0FBQ0EsT0FIRDtBQUlBO0FBQ0QsR0FuQk87O0FBcUJBLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQVIsWUFBQTtBQUNDLFdBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFVBQUEsSUFBQSxFQUFJO0FBQUksYUFBQSxJQUFJLENBQUosRUFBQTtBQUFPLEtBQTlCLENBQVA7QUFDQSxHQUZPOztBQUlBLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLEdBQVIsVUFBdUIsSUFBdkIsRUFBb0M7QUFDbkMsV0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLE1BQW5CLENBQ1AsVUFBQSxJQUFBLEVBQUk7QUFBSSxhQUFBLElBQUksQ0FBQyxLQUFMLEtBQUEsSUFBQTtBQUFtQixLQURwQixDQUFSO0FBR0EsR0FKTzs7QUFNUixFQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxHQUFBLFVBQU8sS0FBUCxFQUFvQjtBQUNuQixRQUFJLE9BQUo7QUFDQSxJQUFBLE9BQU8sR0FBRyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQVY7QUFFQSxTQUFLLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDQSxHQUxEOztBQU9BLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxZQUFBLEdBQUEsVUFBYyxLQUFkLEVBQTJCO0FBQzFCLFNBQUssSUFBSSxLQUFLLEdBQUcsQ0FBakIsRUFBb0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFsQyxFQUEwQyxLQUFLLEVBQS9DLEVBQW1EO0FBQ2xELFVBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFELENBQW5CO0FBQ0EsV0FBSyxVQUFMLENBQWdCLE9BQWhCO0FBQ0E7QUFDRCxHQUxEOztBQU9BLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEdBQUEsVUFBWSxLQUFaLEVBQXlCO0FBQ3hCLFFBQUksSUFBSixFQUFVLEdBQVY7QUFFQSxJQUFBLEdBQUcsR0FBRyxLQUFLLE1BQUwsRUFBTjtBQUNBLElBQUEsSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksS0FBWixDQUFQOztBQUVBLFFBQUksSUFBSSxLQUFLLENBQUMsQ0FBZCxFQUFpQjtBQUNoQixXQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLElBQWxCLEVBQXdCLENBQXhCO0FBQ0E7O0FBRUQsV0FBTyxLQUFLLEtBQVo7QUFDQSxHQVhEOztBQWFBLEVBQUEsV0FBQSxDQUFBLFNBQUEsQ0FBQSxpQkFBQSxHQUFBLFlBQUE7QUFDQyxTQUFJLElBQUksS0FBSyxHQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsQ0FBcEMsRUFBdUMsS0FBSyxJQUFJLENBQWhELEVBQW1ELEtBQUssRUFBeEQsRUFBNEQ7QUFDM0QsVUFBRyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLEtBQWxCLEtBQTRCLElBQS9CLEVBQXFDO0FBQ3BDLGFBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsRUFBeUIsQ0FBekI7QUFDQTtBQUNEOztBQUNELFdBQU8sS0FBSyxLQUFaO0FBQ0EsR0FQRDs7QUFTQSxFQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxHQUFBLFlBQUE7QUFDQyxXQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBUDtBQUNBLEdBRkQ7O0FBSUEsRUFBQSxXQUFBLENBQUEsU0FBQSxDQUFBLFVBQUEsR0FBQSxZQUFBO0FBQ0MsV0FBTyxLQUFLLGNBQUwsQ0FBb0IsS0FBcEIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsRUFBQSxXQUFBLENBQUEsU0FBQSxDQUFBLFlBQUEsR0FBQSxZQUFBO0FBQ0MsV0FBTyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBUDtBQUNBLEdBRkQ7O0FBSUEsRUFBQSxXQUFBLENBQUEsU0FBQSxDQUFBLFNBQUEsR0FBQSxVQUFVLFlBQVYsRUFBbUM7QUFDbEMsUUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQzFCLE1BQUEsWUFBWSxDQUFDLEtBQWIsQ0FBbUIsT0FBbkIsR0FBNkIsT0FBN0I7QUFDQSxLQUZELE1BRU87QUFDTixNQUFBLFlBQVksQ0FBQyxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCO0FBQ0E7O0FBQ0QsV0FBTyxNQUFNLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBWixDQUFiO0FBQ0EsR0FQRDs7QUFTQSxFQUFBLFdBQUEsQ0FBQSxTQUFBLENBQUEsV0FBQSxHQUFBLFVBQVksSUFBWixFQUFzQjtBQUNyQixJQUFBLElBQUksQ0FBQyxLQUFMLEdBQWEsQ0FBQyxJQUFJLENBQUMsS0FBbkI7QUFDQSxXQUFPLElBQUksQ0FBQyxLQUFaO0FBQ0EsR0FIRDs7QUFJRCxTQUFBLFdBQUE7QUFBQyxDQXhIRCxFQUFBOztBQUFhLE9BQUEsQ0FBQSxXQUFBLEdBQUEsV0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IFRvZG8gfSBmcm9tICcuL21vZGVsL3RvZG8ubW9kZWwnO1xuaW1wb3J0IHsgVG9kb1N0YXRlIH0gZnJvbSAnLi9pbnRlcmZhY2UvdG9kby5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVG9kb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvdG9kby5zZXJ2aWNlJztcblxuY2xhc3MgVG9kb0xpc3Qge1xuXHRcblx0cHJpdmF0ZSB0b2RvU2VydmljZTogVG9kb1NlcnZpY2U7XG5cblx0XG5cdGNvbnN0cnVjdG9yKHRvZG9zOiBUb2RvW10pIHtcblx0XHR0aGlzLnRvZG9TZXJ2aWNlID0gbmV3IFRvZG9TZXJ2aWNlKHRvZG9zKTtcblx0fVxuXG5cdHByaXZhdGUgY2xlYXJFbGVtZW50IChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRcdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH1cblxuXHR0b2RvQ291bnRUYXNrKCk6IHN0cmluZ3tcblx0XHRsZXQgdG9kb0NvdW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZF9faGVhZGVyLWNvdW50Jyk7XG5cdFx0cmV0dXJuIHRvZG9Db3VudC5pbm5lckhUTUwgPSB0aGlzLnRvZG9TZXJ2aWNlLmNvdW50VGFzayh0b2RvQ291bnQpO1xuXHR9XG5cblx0dG9kb0FkZFRhc2soaW5wdXQ6IHN0cmluZyl7XG5cdFx0dGhpcy50b2RvU2VydmljZS5yZW5kZXIoaW5wdXQpO1xuXHR9XG5cblx0dG9kb0RlbGV0ZVRhc2soaW5kZXg6IHN0cmluZykge1xuXHRcdHJldHVybiB0aGlzLnRvZG9TZXJ2aWNlLmRlbGV0ZVRhc2soaW5kZXgpO1xuXHR9XG5cblx0dG9kb0FjdGl2ZVRhc2sgKCl7XG5cdFx0bGV0IHRvZG9zQWN0aXZlVGFzayA9IHRoaXMudG9kb1NlcnZpY2UuYWN0aXZlVGFzaygpXG5cdFx0Y29uc29sZS5sb2codG9kb3NBY3RpdmVUYXNrKTtcblx0XHRcblx0XHRyZXR1cm4gdGhpcy50b2RvU2VydmljZS5yZW5kZXJGaWx0ZXIodG9kb3NBY3RpdmVUYXNrKTtcblx0fVxuXHRcblx0dG9kb0NvbXBsZXRlVGFzayAoKXtcblx0XHRsZXQgdG9kb3NDb21wbGV0ZVRhc2sgPSB0aGlzLnRvZG9TZXJ2aWNlLmNvbXBsZXRlVGFzaygpXG5cdFx0Y29uc29sZS5sb2codG9kb3NDb21wbGV0ZVRhc2spO1xuXHRcdFxuXHRcdHJldHVybiB0aGlzLnRvZG9TZXJ2aWNlLnJlbmRlckZpbHRlcih0b2Rvc0NvbXBsZXRlVGFzayk7XG5cdH1cblxuXHR0b2RvQWxsVGFzayAoKSB7XG5cdFx0bGV0IHRhc2tzID0gdGhpcy50b2RvU2VydmljZS5hbGxUYXNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcy50b2RvU2VydmljZS5yZW5kZXJGaWx0ZXIodGFza3MpO1xuXHR9XG5cblx0dG9kb0NsZWFyQ29tcGxldGVUYXNrKCkge1xuXHRcdGxldCB0b2RvcyA9IHRoaXMudG9kb1NlcnZpY2UuY2xlYXJDb21wbGV0ZVRhc2soKTtcblx0XHRyZXR1cm4gdGhpcy50b2RvU2VydmljZS5yZW5kZXJGaWx0ZXIodG9kb3MpO1xuXHR9XG5cblx0dG9kb0luaXQoKXtcblx0XHRsZXQgdG9kb0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9JbnB1dCcpO1xuXHRcdGxldCB0b2RvRm9vdGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZF9fZm9vdGVyJyk7XG5cdFx0bGV0IHRvZG9UYXNrV3JhcHBlciA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keVRhc2tzJyk7XG5cdFx0bGV0IHRvZG9CdG5BY3RpdmUgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRkX19mb290ZXItZmlsdGVyLS1hY3RpdmUnKTtcblx0XHRsZXQgdG9kb0J0bkNvbXBsZXRlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZF9fZm9vdGVyLWZpbHRlci0tY29tcGxldGUnKTtcblx0XHRsZXQgdG9kb0J0bkFsbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGRfX2Zvb3Rlci1maWx0ZXItLWFsbCcpO1xuXHRcdGxldCB0b2RvQnRuQ2xlYXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRkX19mb290ZXItZmlsdGVyLS1jbGVhcicpO1xuXG5cdFx0dG9kb0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG5cdFx0XHRcdHRoaXMudG9kb0FkZFRhc2sodG9kb0lucHV0LnZhbHVlKTtcblx0XHRcdFx0dG9kb0lucHV0LnZhbHVlID0gJydcblx0XHRcdFx0dG9kb0Zvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRcdFx0XHR0aGlzLnRvZG9Db3VudFRhc2soKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRvZG9UYXNrV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuXHRcdFx0bGV0IHBhcmVudElkID0gKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZDtcblx0XHRcdGxldCBwYXJlbnRUYXNrID0gKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcblx0XHRcdHRoaXMudG9kb0RlbGV0ZVRhc2socGFyZW50SWQpO1xuXHRcdFx0aWYgKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5tYXRjaGVzKCcudGRfX2JvZHktdGFzay0tZGVzdHJveSAqJykpIHtcblx0XHRcdFx0dG9kb1Rhc2tXcmFwcGVyLnJlbW92ZUNoaWxkKHBhcmVudFRhc2spO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy50b2RvQ291bnRUYXNrKCk7XG5cdFx0fSk7XG5cblx0XHR0b2RvQnRuQWN0aXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhckVsZW1lbnQodG9kb1Rhc2tXcmFwcGVyKTtcblx0XHRcdHRoaXMudG9kb0FjdGl2ZVRhc2soKTtcblx0XHR9KTtcblxuXHRcdHRvZG9CdG5Db21wbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuY2xlYXJFbGVtZW50KHRvZG9UYXNrV3JhcHBlcik7XG5cdFx0XHR0aGlzLnRvZG9Db21wbGV0ZVRhc2soKTtcblx0XHR9KTtcblxuXHRcdHRvZG9CdG5BbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmNsZWFyRWxlbWVudCh0b2RvVGFza1dyYXBwZXIpO1xuXHRcdFx0dGhpcy50b2RvQWxsVGFzaygpO1xuXHRcdH0pO1xuXG5cdFx0dG9kb0J0bkNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5jbGVhckVsZW1lbnQodG9kb1Rhc2tXcmFwcGVyKTtcblx0XHRcdHRoaXMudG9kb0NsZWFyQ29tcGxldGVUYXNrKCk7XG5cdFx0XHR0aGlzLnRvZG9Db3VudFRhc2soKTtcblx0XHR9KVxuXHR9XG59XG5cbmxldCB0b2RvQXBwID0gbmV3IFRvZG9MaXN0KFtdKVxuXG50b2RvQXBwLnRvZG9Jbml0KCk7XG5cbiIsImltcG9ydCB7IFRvZG8gfSBmcm9tICcuLi9tb2RlbC90b2RvLm1vZGVsJztcbmltcG9ydCB7IFRvZG9TdGF0ZSB9IGZyb20gJy4uL2ludGVyZmFjZS90b2RvLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUb2RvU2VydmljZUludGVyZmFjZSB9IGZyb20gJy4uL2ludGVyZmFjZS90b2Rvc2VydmljZS5pbnRlcmZhY2UnO1xuXG5cbmxldCBzdGF0ZSA9IGZhbHNlO1xuZXhwb3J0IGNsYXNzIFRvZG9TZXJ2aWNlIHtcblx0Ly8gc3RhdGU6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBpZDogbnVtYmVyID0gMDtcblx0cHJpdmF0ZSB0b2RvczogVG9kb1tdID0gW107XG5cblx0Y29uc3RydWN0b3IodG9kb3M6IFRvZG9bXSkge1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUlkKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSFVKS0xNTk9QUVJTVFVWV1hZWic7XG5cdFx0bGV0IElEID0gJyc7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0SUQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xuXHRcdH1cblx0XHRyZXR1cm4gJ3Rhc2stJyArIElEO1xuXHR9XG5cdHByaXZhdGUgYWRkVGFzayh0YXNrOiBzdHJpbmcpOiBUb2RvIHtcblx0XHRsZXQgdG9kbzogVG9kbyA9IHtcblx0XHRcdGlkOiB0aGlzLmdlbmVyYXRlSWQoNCksXG5cdFx0XHRuYW1lOiB0YXNrLFxuXHRcdFx0c3RhdGU6IGZhbHNlLFxuXHRcdH07XG5cdFx0dGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMudG9kb3MpO1xuXHRcdFxuXHRcdHJldHVybiB0b2RvO1xuXHR9XG5cblx0cHJpdmF0ZSByZW5kZXJUYXNrKHRhc2s6IFRvZG8pOiB2b2lke1xuXHRcdGxldCBjb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHlUYXNrcycpO1xuXHRcdGxldCBodG1sOiBzdHJpbmcsIG5ld0h0bWw6IHN0cmluZywgaHRtbERvbTtcblx0XHRodG1sID0gIGA8bGkgY2xhc3M9XCJ0ZF9fYm9keS10YXNrJHt0YXNrLnN0YXRlID09PSB0cnVlID8gJyB0ZF9fYm9keS10YXNrLS1jb21wbGV0ZScgOiAnJyB9XCIgaWQ9XCIke3Rhc2suaWR9XCIgZGF0YS1pZD1cIiR7dGFzay5pZH1cIj5cblx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJ0ZF9fYm9keS10YXNrLS10b2dnbGVcIiB0eXBlPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHQ8c3Bhbj4ke3Rhc2submFtZX08L3NwYW4+XG5cdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInRkX19ib2R5LXRhc2stLWRlc3Ryb3lcIiBkYXRhLWJ1dHRvbi1pZD1cIiR7dGFzay5pZH1cIj48aSBjbGFzcz1cIm1kaSBtZGktd2luZG93LWNsb3NlXCI+PC9pPjwvYnV0dG9uPlxuXHRcdFx0XHQ8L2xpPmBcblx0XHRcblx0XHRjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xuXG5cdFx0bGV0IHRhc2tJRCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl1gKVxuXG5cdFx0aWYgKHRhc2tJRCkge1xuXHRcdFx0dGFza0lELmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XHR0aGlzLnRvZ2dsZVN0YXRlKHRhc2spO1xuXHRcdFx0XHR0YXNrSUQuY2xhc3NMaXN0LnRvZ2dsZSgndGRfX2JvZHktdGFzay0tY29tcGxldGUnKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cdFxuXHRwcml2YXRlIGZpbmRJZCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b2Rvcy5tYXAodG9kbyA9PiB0b2RvLmlkKTtcblx0fVxuXG5cdHByaXZhdGUgZmlsdGVyVGFza1R5cGUodHlwZTogYm9vbGVhbik6IFRvZG9bXSB7XG5cdFx0cmV0dXJuICh0aGlzLnRvZG9zLnNsaWNlKCkuZmlsdGVyKFxuXHRcdFx0dG9kbyA9PiB0b2RvLnN0YXRlID09PSB0eXBlXG5cdFx0KSk7XG5cdH1cblxuXHRyZW5kZXIoaW5wdXQ6IHN0cmluZyk6IHZvaWR7XG5cdFx0bGV0IG5ld0l0ZW07XG5cdFx0bmV3SXRlbSA9IHRoaXMuYWRkVGFzayhpbnB1dCk7XG5cblx0XHR0aGlzLnJlbmRlclRhc2sobmV3SXRlbSk7XG5cdH1cblxuXHRyZW5kZXJGaWx0ZXIgKHRhc2tzOiBUb2RvW10pOiB2b2lkIHtcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFza3MubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRsZXQgZWxlbWVudCA9IHRhc2tzW2luZGV4XTtcblx0XHRcdHRoaXMucmVuZGVyVGFzayhlbGVtZW50KTtcblx0XHR9XG5cdH1cblxuXHRkZWxldGVUYXNrIChpbmRleDogc3RyaW5nKTogVG9kb1tde1xuXHRcdGxldCBpdGVtLCBpZHM7XG5cblx0XHRpZHMgPSB0aGlzLmZpbmRJZCgpO1xuXHRcdGl0ZW0gPSBpZHMuaW5kZXhPZihpbmRleClcblxuXHRcdGlmIChpdGVtICE9PSAtMSkge1xuXHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaXRlbSwgMSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudG9kb3M7XG5cdH1cblxuXHRjbGVhckNvbXBsZXRlVGFzaygpOiBUb2RvW10ge1xuXHRcdGZvcihsZXQgaW5kZXggPSB0aGlzLnRvZG9zLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcblx0XHRcdGlmKHRoaXMudG9kb3NbaW5kZXhdLnN0YXRlID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMudG9kb3M7XG5cdH1cblxuXHRhbGxUYXNrKCkge1xuXHRcdHJldHVybiB0aGlzLnRvZG9zLnNsaWNlKCk7XG5cdH1cblxuXHRhY3RpdmVUYXNrKCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlclRhc2tUeXBlKGZhbHNlKTtcblx0fVxuXG5cdGNvbXBsZXRlVGFzaygpIHtcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXJUYXNrVHlwZSh0cnVlKTtcblx0fVxuXG5cdGNvdW50VGFzayhjb3VudEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcblx0XHRpZiAodGhpcy50b2Rvcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb3VudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvdW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdH1cblx0XHRyZXR1cm4gU3RyaW5nKHRoaXMudG9kb3MubGVuZ3RoKTtcblx0fVxuXG5cdHRvZ2dsZVN0YXRlKHRvZG86IFRvZG8pOiBib29sZWFue1xuXHRcdHRvZG8uc3RhdGUgPSAhdG9kby5zdGF0ZVxuXHRcdHJldHVybiB0b2RvLnN0YXRlO1xuXHR9XG59XG4iXX0=
