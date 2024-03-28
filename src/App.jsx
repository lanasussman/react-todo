import "./App.css";

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
function App() {
  return (
    <>
      <h1>Todo List</h1>
      <div className="card">
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
