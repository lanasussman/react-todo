function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = event.target.elements.title.value;
    // eslint-disable-next-line react/prop-types
    props.onAddTodo(todoTitle);
    console.log(todoTitle);
    event.target.reset();
  };
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" name="title" placeholder="Type here"></input>
      <button>Add</button>
    </form>
  );
}

export default AddTodoForm;

function AddTodoForm() {
return (
  <form>
    <label htmlFor="todoTitle">Title</label>
    <input id="todoTitle"></input>
    <button>Add</button>
  </form>
);
}

export default AddTodoForm;