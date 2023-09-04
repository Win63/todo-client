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
          var userid = user?.id
          const {data} = await Client.get(getUrl('?doDate=02.09.2023'));
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

