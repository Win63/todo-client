import React, {useState} from 'react';
import './TaskList.css';
import TaskItem from "../TaskItem/TaskItem";
import { TaskForm } from "../TaskItem/TaskItemForm";
import { EditTaskForm } from "../TaskItem/TaskItemFormEdit";
import Client from '../../client';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskList = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [isCheckUser, setCheck] = useState(false);
    const {tg, user, queryId} = useTelegram();

    useEffect(() => {
        let ignore = false
        checkUser()
        loadData()
        return () => {
          ignore = true
        }
      }, []);
  
     const addTodo = async (todo) => {
      try {
        await Client.post(getUrl(), {
            "name": todo,
            "doDate": "2023-09-02",
            "orderValue":0
        });
        await loadData()
      } catch (error) {
        setError(error);
        //setTodos([]);
      }
    }
  
    const deleteTodo = (id) => {
      try {
        Client.delete(getUrl('/'+id));
        setTodos(todos.filter((todo) => todo.id !== id));
      } catch (error) {
        setError(error);
        //setTodos([]);
      }
    }
  
    const toggleComplete = (id) => {
      try {
        Client.patch(getUrl('/done/'+id));
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
        );
      } catch (error) {
        setError(error);
        //setTodos([]);
      }
    }
  
    const editTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  
    const editTask = (name, id) => {
      try {
        Client.patch(getUrl('/'+id), {"name": name});
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, name, isEditing: !todo.isEditing } : todo
          )
        );
      } catch (error) {
        setError(error);
        //setTodos([]);
      }
    };

    const getUrl = (add = '') => {
      var userId = user?.id ?? '15151616'
      return 'user/'+ userId + '/tasks'+ add;
    }

    const loadData = async () => {
      try {
          const {data} = await Client.get(getUrl('?doDate=2023.09.02'));
          setTodos(data);
      } catch (error) {
          setError(error);
          setTodos([]);
      }
    }
    const checkUser = async () => {
      try {
          if(!isCheckUser && user)
          {
            var userid = user?.id
            var dbUser = await Client.get('users/'+userid);

            if(dbUser.data == '')
            {
              await Client.post('users', 
                {
                  "name": user.last_name,
                  "tgId": user.id,
                  "tglogin": user.username
                }
              );
            }
            setCheck(true)
          }
      } catch (error) {
          setError(error);
      }
    }

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

