import TodoListItem from "./TodoListItem";

// eslint-disable-next-line react/prop-types
function TodoList({ todoList }) {
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
