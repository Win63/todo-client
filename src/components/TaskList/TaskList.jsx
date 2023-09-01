import React, {useState} from 'react';
import './TaskList.css';
import TaskItem from "../TaskItem/TaskItem";
import { EditTaskForm } from "./EditTaskForm";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";

const tasks = [
    {id: '1', data: 'Найти клиентов', isCompleted: false},
    {id: '2', data: 'Сделать бота', isCompleted: true},
]

export const TaskList = () => {
    const [todos, setTodos] = useState([]);
    const {tg, queryId} = useTelegram();
  
    const addTodo = (todo) => {
      setTodos([
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ]);
    }
  
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  
    const toggleComplete = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  
    const editTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  
    const editTask = (task, id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    };
  
    return (
      <div className="TaskWrapper">
        <h1>Список задач!</h1>
        <TaskForm addTodo={addTodo} />
        {/* display todos */}
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTaskForm editTodo={editTask} task={todo} />
          ) : (
            <TaskItem
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    );
  };

export default TaskList;
/*
const TaskList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            tasks: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (task) => {
        const alreadyAdded = addedItems.find(item => item.id === task.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== task.id);
        } else {
            newItems = [...addedItems, task];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {tasks.map(item => (
                <TaskItem
                    task={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};
*/

