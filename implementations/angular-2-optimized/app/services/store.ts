import ItemUpdatedEvent from '.././itemUpdatedEvent';

export class Todo {
	completed: Boolean;

	private _title: String;
	get title() {
		return this._title;
	}
	set title(value: String) {
		this._title = value.trim();
	}

	constructor(title: String, completed: Boolean) {
		this.completed = completed;
		this.title = title.trim();
	}
}

export class TodoStore {
	todos: Array<Todo>;

	constructor() {
		this.todos = [];
	}

	private getWithCompleted(completed: Boolean) {
		return this.todos.filter((todo: Todo) => todo.completed === completed);
	}

	allCompleted() {
		return this.todos.length === this.getCompleted().length;
	}

	setAllTo(completed: Boolean) {
		this.todos.forEach((t: Todo) => t.completed = completed);
	}

	removeCompleted() {
		this.todos = this.getWithCompleted(false);
	}

	getRemaining() {
		return this.getWithCompleted(false);
	}

	getCompleted() {
		return this.getWithCompleted(true);
	}

	toggleCompletion(todo: Todo) {
		todo.completed = !todo.completed;
	}

	remove(todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);
	}

	add(title: String) {
		this.todos.push(new Todo(title, false));
	}

	updateItem(event: ItemUpdatedEvent) {
		this.todos = this.todos.map(todo => {
			if (todo !== event.item) {
				return todo;
			}

			return event.newItem;
		});
	}
}
