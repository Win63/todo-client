import React, {useState} from 'react'

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
  <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="task-input" placeholder='Обновить' />
  <button type="submit" className='task-btn'>Обновить</button>
</form>
)
}