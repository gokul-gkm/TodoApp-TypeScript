import { TodoModel } from '../models/TodoSchema';
import { ITodo } from '../types/todo.types';

export class TodoService {
    async getAllTodos(): Promise<ITodo[]> {
        return await TodoModel.find().sort({ createdAt: -1 });
    }

    async createTodo(todoData: Partial<ITodo>): Promise<ITodo> {
        const todo = new TodoModel(todoData);
        return await todo.save();
    }

    async updateTodo(id: string, data: Partial<ITodo>): Promise<ITodo | null> {
        return await TodoModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteTodo(id: string): Promise<ITodo | null> {
        return await TodoModel.findByIdAndDelete(id);
    }
}
