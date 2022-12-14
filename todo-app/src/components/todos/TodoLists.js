import React from 'react'
import './todolist.css';

const buttons = [
    {
        name: 'All',
    },
    {
        name: 'Actives',

    },
    {
        name: 'Completed',

    },
]


function TodoLists({ todos, filteredArray, handleDeleteTodo, handleComplete, clearCompleted, handleFilterTodos, active }) {

    return (
        <>
            <div className='todo--list'>
                <div className='todo--list--container'>
                    {filteredArray.map((todo, index) => {
                        return (
                            <div className='todos--list--container' key={index}>
                                <div className='todo--card'>
                                    <div className={todo.isDone ? "checkbox--todo completed--todo" : "checkbox--todo"} type='checkbox' onClick={handleComplete} id={index}>
                                        {todo.isDone && <img src='/images/icon-check.svg' alt='check' id={index} className='check--img' />}
                                    </div>
                                    <span className={todo.isDone ? 'todo--text todo--text--completed' : 'todo--text'}>{todo.text}</span>
                                </div>
                                <img className='delete--icon' src='images/icon-cross.svg' alt='delete' id={Number(todo.id)} onClick={handleDeleteTodo} />
                            </div>
                        )
                    })}
                </div>
                <div className='bottom-buttons'>
                    <p className='item--counter'>
                        {todos.length} items left
                    </p>
                    <div className='button-group'>
                        {buttons.map((btn, index) => {
                            return (
                                <button
                                    onClick={(e) => handleFilterTodos(e, btn.name)}
                                    value={btn.name}
                                    className={active === btn.name ? 'filter--button active' : 'filter--button'}
                                    id="all"
                                    key={index}
                                >
                                    {btn.name}
                                </button>
                            )
                        })}
                    </div>
                    <button onClick={clearCompleted} id='clear' className={'filter--button'}>
                        Clear Completed
                    </button>
                </div>
            </div>
            <div className='button-group-show'>
                        {buttons.map((btn, index) => {
                            return (
                                <button
                                    onClick={(e) => handleFilterTodos(e, btn.name)}
                                    value={btn.name}
                                    className={active === btn.name ? 'filter--button active' : 'filter--button'}
                                    id="all"
                                    key={index}
                                >
                                    {btn.name}
                                </button>
                            )
                        })}
            </div>
        </>
    )
}

export default TodoLists