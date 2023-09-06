import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './TaskItem.css';

const TaskItem = ({task, deleteTodo, editTodo, toggleComplete}) => {

    return (
        <div className="Task">
            { task.isCompleted ? (<FontAwesomeIcon icon={faCheck} className='completed'/>) : "" }
            <p className={`${task.isCompleted ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.name}</p>
            <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    );
};

export default TaskItem;
