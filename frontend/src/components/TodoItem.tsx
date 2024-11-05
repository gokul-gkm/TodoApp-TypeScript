import React from 'react';
import { Todo } from '../types/todo.type';
import { TrashIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    const getPriorityColor = (priority: Todo['priority']) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50';
            case 'medium': return 'text-orange-500 bg-orange-50';
            case 'low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <div className={`group flex items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${todo.completed ? 'bg-gray-50' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <span className={`flex-1 ml-3 text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
            </span>
            {todo.priority !== 'regular' && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                </span>
            )}
            <button 
                onClick={() => onDelete(todo._id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
    );
};