import TodoListItem from "./TodoListItem";

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

function TodoList() {
  return (
    <div className="card">
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
