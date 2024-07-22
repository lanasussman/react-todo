import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      <div>
        {todo.title}
        <br />
        {new Date(todo.createdDate).toLocaleString()}
      </div>
      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        title="remove"
        className={styles.RemoveButton}
      >
        <FontAwesomeIcon icon={faTrashAlt} className={styles.OrangeTrashIcon} />
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
