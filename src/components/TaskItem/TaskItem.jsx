import React from 'react';
import Button from "../Button/Button";
import './TaskItem.css';

const TaskItem = ({task, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(task);
    }

    return (
        <div className={'task ' + className}>
            <div className={'title'}>{task.data}</div>
            <div><input type="checkbox" name={task.id} id={task.id} checked={task.isCompleted} /></div>
        </div>
    );
};

export default TaskItem;
