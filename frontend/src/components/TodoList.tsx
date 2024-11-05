import React, { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { TodoService } from '../services/TodoService';
import { Todo } from '../types/todo.type';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string>('');
    const todoService = new TodoService();

    const loadTodos = async () => {
        try {
            const fetchedTodos = await todoService.getAllTodos();
            setTodos(fetchedTodos);
            setError('');
        } catch (err) {
            setError('Failed to load todos');
        }
    };

    const handleAddTodo = async (title: string, priority: Todo['priority']) => {
        try {
            const newTodo = await todoService.createTodo(title, priority);
            setTodos(prevTodos => [newTodo, ...prevTodos]);
            setError('');
        } catch (err) {
            setError('Failed to add todo');
        }
    };

    const handleToggle = async (id: string) => {
        try {
            const todo = todos.find(t => t._id === id);
            if (todo) {
                const updatedTodo = await todoService.updateTodo(id, { 
                    completed: !todo.completed 
                });
                setTodos(todos.map(t => t._id === id ? updatedTodo : t));
                setError('');
            }
        } catch (err) {
            setError('Failed to update todo');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await todoService.deleteTodo(id);
            setTodos(todos.filter(t => t._id !== id));
            setError('');
        } catch (err) {
            setError('Failed to delete todo');
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
                    <div className="flex items-center justify-center mb-8">
                        <ClipboardDocumentListIcon className="h-10 w-10 text-primary-500 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Todo List
                        </h1>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <TodoForm onSubmit={handleAddTodo} />
                    
                    <div className="space-y-3">
                        {todos.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No todos yet. Add one above!
                            </div>
                        ) : (
                            todos.map(todo => (
                                <TodoItem
                                    key={todo._id}
                                    todo={todo}
                                    onToggle={handleToggle}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};