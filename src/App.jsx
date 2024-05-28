import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: todoList,
          },
        });
      }, 2000);
    });

    promise.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, [todoList]);

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
