import React, {useState} from 'react';
import axios from 'axios';
import './TodoForm.css';

const TodoForm = ({ onAdd }) => {
    const [task, setTask] = useState('');

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/todos', {task});
            onAdd(response.data);
            console.log('Response to additon', response.data)
            setTask('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <form>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)}></input>
            <button onClick={addTodo}>Add Todo</button>
        </form>
        </>
    )
}

export default TodoForm;