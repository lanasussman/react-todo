import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useState } from "react";

const todoList = [
  {
    id: 1,
    title: "Review test cases for the new feature",
  },
  {
    id: 2,
    title: "Conduct regression testing on the latest build",
  },
  {
    id: 3,
    title: "Retest fixed bugs",
  },
];

function App() {

  const [newTodo, setNewTodo] = useState('');

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
      <TodoList />
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <div className="card">
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
