import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

// eslint-disable-next-line react/prop-types
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    console.log(todoTitle);
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
