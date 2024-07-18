import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState({
    createdDate: "asc",
    title: "asc",
  });
  const [sortField, setSortField] = useState("createdDate");

  const fetchData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdDate: record.createdTime,
      }));

      todos.sort((a, b) => {
        if (sortField === "title") {
          return sortOrder[sortField] === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else {
          return sortOrder[sortField] === "asc"
            ? new Date(a.createdDate) - new Date(b.createdDate)
            : new Date(b.createdDate) - new Date(a.createdDate);
        }
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleSortOrder = (field) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [field]: prevSortOrder[field] === "asc" ? "desc" : "asc",
    }));
  };

  const deleteTodoFromAirtable = async (id) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      });

      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const removeTodo = async (id) => {
    const isDeleted = await deleteTodoFromAirtable(id);
    if (isDeleted) {
      setTodoList((todoList) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        localStorage.setItem("savedTodoList", JSON.stringify(updatedTodoList));
        return updatedTodoList;
      });
    } else {
      console.log("Failed to delete todo from Airtable");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo,
        },
      };
      console.log("Sending data to Airtable:", airtableData); // Debug log

      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      console.log("Response from Airtable:", dataResponse); // Debug log
      return dataResponse;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const addTodo = async (newTodo) => {
    const addedTodo = await postTodo(newTodo.title);
    if (addedTodo) {
      const todo = {
        id: addedTodo.id,
        title: addedTodo.fields.title,
        createdDate: addedTodo.createdTime,
      };
      setTodoList((prevTodoList) => {
        const updatedList = [...prevTodoList, todo].sort((a, b) => {
          if (sortField === "title") {
            return sortOrder.title === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          } else {
            return sortOrder.createdDate === "asc"
              ? new Date(a.createdDate) - new Date(b.createdDate)
              : new Date(b.createdDate) - new Date(a.createdDate);
          }
        });
        localStorage.setItem("savedTodoList", JSON.stringify(updatedList));
        return updatedList;
      });
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <button
                onClick={() => {
                  toggleSortOrder("createdDate");
                  setSortField("createdDate");
                }}
              >
                Sort by Created Date (
                {sortOrder.createdDate === "asc" ? "↑" : "↓"})
              </button>
              <button
                onClick={() => {
                  toggleSortOrder("title");
                  setSortField("title");
                }}
              >
                Sort by Title ({sortOrder.title === "asc" ? "↑" : "↓"})
              </button>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <AddTodoForm onAddTodo={addTodo} />
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
