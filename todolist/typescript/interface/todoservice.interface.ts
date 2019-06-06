import { Todo } from '../model/todo.model';
import { TodoState } from './todo.interface';

export interface TodoServiceInterface {
	render(task: string): void;
	clearCompleteTask(): void;
	deleteTask(index: string): Todo[];
	allTask(): Todo[];
	activeTask(): Todo[];
	completeTask(): Todo[];
	countTask(count: HTMLElement): string;
	toggleState(todo: Todo): boolean;
}
