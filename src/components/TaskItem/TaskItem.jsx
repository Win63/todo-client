import React from 'react';
import Button from "../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './TaskItem.css';

const TaskItem = ({task, deleteTodo, editTodo, toggleComplete}) => {

    return (
        <div className="Task">
            <p className={`${task.isCompleted ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.data}</p>
            <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
            </div>
        </div>
    );
};

export default TaskItem;
