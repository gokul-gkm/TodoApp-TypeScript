import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { TodoController } from './controllers/TodoController';

const app = express();
const todoController = new TodoController();

app.use(cors());
app.use(express.json());

app.get('/api/todos', todoController.getAllTodos);
app.post('/api/todos', todoController.createTodo);
app.put('/api/todos/:id', todoController.updateTodo);
app.delete('/api/todos/:id', todoController.deleteTodo);


mongoose.connect('mongodb://localhost:27017/todo-app')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3033, () => {
            console.log('Server running on port 3001');
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
