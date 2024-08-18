import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [newTask, setNewTask] = useState(null)


  const addTodo = async (newTodo) => {
    setTodos([...todos, newTodo])
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        //fetch data from the server
        const response = await axios.get('http://localhost:5000/todos')
        setTodos(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchTodos();
  }, [])

  useEffect(() => {
    console.log('Updated todos:', todos)
  }, [todos])

  async function deleteTodo(id) {

    const response = await axios.delete(`http://localhost:5000/todos/${id}`)
    try {
      //fetch data from the server
      const response = await axios.get('http://localhost:5000/todos')
      setTodos(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function editTodo(id){
    console.log('Todo to update', id)
    console.log('Task', newTask)
    

    if (newTask != null){
      try {
        const response = await axios.put(`http://localhost:5000/todos/${id}`, {task: newTask})
        console.log('Todo updated from database', response.data)
      } catch (error) {
        console.error(error.message)
      }
    }

    setEdit(null)

    try {
      //fetch data from the server
      const response = await axios.get('http://localhost:5000/todos')
      setTodos(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  function displayItem(id, task){
    if (edit == id) {
      return (
        <>
          <li><input type='text' name={id} placeholder={task} onChange={(e) => setNewTask(e.target.value)}></input></li>
          <button onClick={() => editTodo(id)}>Update</button>
        </>
      )
    }
    else {
      return <li key={id}>{task}</li> 
    }
  }

  return (
    <div className='app'>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <div className='todo-item'>           
            {displayItem(todo._id, todo.task)}
            <div className='edit-delete-buttons'>
              <button onClick={() => setEdit(todo._id)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>X</button>
            </div>
          </div>
        ))}
      </ul>
    </div>  
  );
}

export default App;
