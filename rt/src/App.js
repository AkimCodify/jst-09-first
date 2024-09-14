import { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, task: "Todo 1", completed: false},
    {id: 2, task: "Todo 2", completed: false}, 
    {id: 3, task: "Todo 3", completed: false},
    {id: 4, task: "Todo 4", completed: false}, ]);

    const addTodo = async (newTodo) => {
      const {data} = await axios.post("http://localhost:8000/todos", newTodo)
      setTodos([...todos, data])
    }

    const getTodos = async () => {
      const {data} = await axios.get("http://localhost:8000/todos")
      
      setTodos(data)
    }

    useEffect(() => {
      getTodos()
    }, [])

    const  removeTodo = async (id) => {
      axios.delete(`http://localhost:8000/todos/:${id}`)
      setTodos(() => {
        return todos.filter(el => el.id !== id)
      })
    }

    const editTodo = (todo, id) => {
      setTodos(() => {
        return todos.map(el => el.id === id ?  todo : el)
      })
    }

  return (
    <div className="App">
      <AddTodo addTodo={addTodo}/>
      <br/> <br/>
      <h2>Todo List</h2>
      <TodoList>
        {todos.map((el) => {
          return <TodoItem eachTodo={el} key={el.id} removeTodo={removeTodo} editTodo={editTodo}/>
        })}
      </TodoList>
    </div>
  );
}

export default App;