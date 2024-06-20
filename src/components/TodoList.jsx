import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className="card">
      <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  onAddTodo: PropTypes.func,
};

export default TodoList;
