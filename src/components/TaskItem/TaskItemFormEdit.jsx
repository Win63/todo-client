import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'
import './TaskItem.css';

export const EditTaskForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.name);

  const handleSubmit = (e) => {
    // prevent default action
      e.preventDefault();
      // edit todo
      editTodo(value, task.id);
    };

  return (
    <form onSubmit={handleSubmit} className="TaskForm">
      <div className='TaskFormRow'>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="task-input" placeholder='Обновить' />
        <button type="submit" className='task-btn'><FontAwesomeIcon icon={faPenToSquare} /></button>
      </div>
  </form>
  )
}