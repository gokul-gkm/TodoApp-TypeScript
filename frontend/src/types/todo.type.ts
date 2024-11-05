export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    priority: 'regular' | 'low' | 'medium' | 'high';
    createdAt: Date;
}