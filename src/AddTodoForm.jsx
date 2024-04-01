import { useState } from "react";

// eslint-disable-next-line react/prop-types
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    onAddTodo({ title: todoTitle, id: Date.now() });
    console.log(todoTitle);
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        name="title"
        placeholder="Type here"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;
