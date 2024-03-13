function TodoListItem(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <li>{props.todo.title}</li>
  );
}

export default TodoListItem;
