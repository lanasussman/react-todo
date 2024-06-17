import styles from "./TodoListItem.module.css"; 
// eslint-disable-next-line react/prop-types
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      {/* eslint-disable-next-line react/prop-types */}
      {todo.title}
      {/* eslint-disable-next-line react/prop-types */}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
