import './App.css';
import { useContext, useEffect, useState } from "react";
import { themeContext } from './providers/theme.provider';
import TodoInput from './components/todoInput/TodoInput';
import TodoLists from './components/todos/TodoLists';


function App() {
  const [todos, setTodos] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [active, setActive] = useState(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { changeTheme, theme } = useContext(themeContext)
  const unique = () => parseInt(Date.now() * Math.random())

  const handleAddTodo = (text) => {
    const newTodoList = [...todos, { id: unique(), text, isDone: false }]
    setTodos(newTodoList)
  }
  const handleDeleteTodo = (e) => {
    const newTodos = todos.filter((todo) => { return (Number(todo.id) !== Number(e.target.id)) });
    setTodos(newTodos);
  }
  const handleComplete = (e) => {
    const newTodos = [...todos];
    console.log(e.target.id)
    newTodos[e.target.id].isDone = !todos[e.target.id].isDone;
    setTodos(newTodos);
  }
  const clearCompleted = (e) => {
    const newTodos = todos.filter((todo) => { return (todo.isDone !== true) })
    setTodos(newTodos);
  }
  const handleFilterTodos = (e, filter) => {
    if (filter === 'All') {
      setActive(filter)
      return setFilteredArray(todos);
    } else if (filter === 'Completed') {
      setActive(filter)
      return setFilteredArray(todos.filter((todo) => { return (todo.isDone !== false) }));
    } else if (filter === 'Actives') {
      setActive(filter)
      return setFilteredArray(todos.filter((todo) => { return (todo.isDone !== true) }))
    }
    return todos;
  }

  useEffect(() => {
    setFilteredArray(todos);
    setActive(null);
  }, [todos])

  


  return (
    <div className='main--container'>
      {windowWidth > 700 ? (
        <img src={theme === "dark" ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg'} className='background--image' alt='background' id='bg-img' />

      ) : (
        <img src={theme === "dark" ? '/images/bg-mobile-dark.jpg' : '/images/bg-mobile-light.jpg'} className='background--image' alt='background' id='bg-img' />
      )}
      <div className='todo--container'>
        <div className='todo--header'>
          <h1 className='todo--title'>T O D O</h1>
          <button className="theme--change-btn" onClick={changeTheme}>
            <img src={theme === "dark" ? '/images/icon-sun.svg' : '/images/icon-moon.svg'} className="theme-img" alt='theme button' id='theme-img' />
          </button>
        </div>
        <div className='todos--container'>
          <TodoInput handleAddTodo={handleAddTodo} />
          {todos.length > 0 && (

            <TodoLists
              todos={todos}
              active={active}
              filteredArray={filteredArray}
              handleDeleteTodo={handleDeleteTodo}
              handleComplete={handleComplete}
              clearCompleted={clearCompleted}
              handleFilterTodos={handleFilterTodos}
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default App;
