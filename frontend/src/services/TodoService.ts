import { Todo } from '../types/todo.type';

export class TodoService {
    private baseUrl = 'http://localhost:3033/api';

    async getAllTodos(): Promise<Todo[]> {
        const response = await fetch(`${this.baseUrl}/todos`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    }

    async createTodo(title: string, priority: Todo['priority']): Promise<Todo> {
        const response = await fetch(`${this.baseUrl}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, priority }),
        });
        if (!response.ok) {
            throw new Error('Failed to create todo');
        }
        return response.json();
    }

    async updateTodo(id: string, data: Partial<Todo>): Promise<Todo> {
        const response = await fetch(`${this.baseUrl}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        return response.json();
    }

    async deleteTodo(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    }
}