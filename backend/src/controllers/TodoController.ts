import { Request, Response } from 'express';
import { TodoService } from '../services/TodoService';

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    getAllTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getAllTodos();
            res.json(todos);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching todos' });
        }
    };

    createTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ message: 'Error creating todo' });
        }
    };

    updateTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.updateTodo(req.params.id, req.body);
            if (todo) {
                res.json(todo);
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating todo' });
        }
    };

    deleteTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const todo = await this.todoService.deleteTodo(req.params.id);
            if (todo) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting todo' });
        }
    };
}