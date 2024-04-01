import TodoListItem from "./TodoListItem";

function TodoList(props) {
  // eslint-disable-next-line react/prop-types
  const { todoList } = props;
  return (
    <div className="card">
      <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
