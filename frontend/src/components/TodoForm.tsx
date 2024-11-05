import React, { useState } from 'react';
import { Todo } from '../types/todo.type';
import { PlusIcon } from '@heroicons/react/24/solid';

interface TodoFormProps {
    onSubmit: (title: string, priority: Todo['priority']) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Todo['priority']>('regular');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit(title.trim(), priority);
            setTitle('');
            setPriority('regular');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                    <option value="regular">Regular</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add
                </button>
            </div>
        </form>
    );
};