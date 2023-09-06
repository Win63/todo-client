import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'
import './TaskItem.css';

export const TaskForm = ({addTodo}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    // prevent default action
      e.preventDefault();
      if (value) {
        // add todo
        addTodo(value);
        // clear form after submission
        setValue('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="TaskForm">
        <div className='TaskFormRow'>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="task-input" placeholder='Новая задача' />
          <button type="submit" className='task-btn'><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </form>
    )
}