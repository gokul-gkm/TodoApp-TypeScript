import mongoose from 'mongoose';
import { ITodo } from '../types/todo.types';

const todoSchema = new mongoose.Schema<ITodo>({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
        type: String,
        enum: ['regular', 'low', 'medium', 'high'],
        default: 'regular'
    },
    createdAt: { type: Date, default: Date.now }
});

export const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);