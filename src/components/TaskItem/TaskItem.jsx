import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './TaskItem.css';

const TaskItem = ({task, deleteTodo, editTodo, toggleComplete}) => {

    return (
        <div className="Task">
            { task.isCompleted ? (<FontAwesomeIcon icon={faCheck} className='fa completed'/>) : <FontAwesomeIcon icon={faSquare} className='fa'/> }
            <p className={`${task.isCompleted ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.name}</p>
            <div>
            <FontAwesomeIcon icon={faPenToSquare} className='fa' onClick={() => editTodo(task.id)} />
            <FontAwesomeIcon icon={faTrash} className='fa' onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    );
};

export default TaskItem;
