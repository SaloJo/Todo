import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
import { FixedSizeList as List } from "react-window";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const todoContext = useContext(TodoContext);
  const [searchResults, setSearchResults] = useState([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState("");

  const todos = todoContext.state.todos;

  useEffect(() => {
    todoContext.fetchTodo();
  }, []);

  useEffect(() => {
    setSearchResults(todos);
  }, [todos, todos.length]);

  const searchTodos = () => {
    const searchResult = todos.filter(
      (item) =>
        item.todo.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
    setSearchResults(searchResult);
  };

  const deleteTodo = (id) => {
    todoContext.dispatch({ type: "remove-todo", payload: id });
  };

  const Row = ({ index, style }) => (
    <div style={style} className="row">
      <div style={{ width: "50%" }}>{searchResults[index].todo}</div>
      <div style={{ width: "20%" }}>{searchResults[index].userId}</div>
      <div style={{ width: "20%" }}>
        {searchResults[index].completed ? "Completed" : "Pending"}
      </div>
      <div style={{ width: "10%" }}>
        <button onClick={() => deleteTodo(searchResults[index].id)}>
          delete
        </button>
      </div>
    </div>
  );

  const handleSubmit = () => {
    if (!desc || !userId) {
      return;
    }

    const id = todos[todos.length - 1] + 1;

    const newTodo = {
      id,
      todo: desc,
      userId,
      completed: false,
    };

    todoContext.dispatch({ type: "add-todo", payload: newTodo });
    setShowAddTodo(false);
  };

  if (showAddTodo) {
    return (
      <div style={{ textAlign: "center" }}>
        <span onClick={() => setShowAddTodo(false)}>Go back</span>
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>
            description
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
            ></input>
          </div>
          <div>
            user id
            <input
              type="text"
              onChange={(e) => setUserId(e.target.value)}
            ></input>
          </div>

          <button
            style={{ width: "100px", height: "50px", alignSelf: 'center' }}
            type="submit"
          >Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="title">
        <span>Todo List</span>
      </div>

      <button
        style={{ marginTop: "10px" }}
        onClick={() => setShowAddTodo(true)}
      >
        Add Todo
      </button>

      <div className="search-wrapper">
        <div>
          <input
            type="text"
            value={searchQuery}
            placeholder="serach todos"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button onClick={searchTodos}>Search</button>
      </div>

      <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
        <span style={{ width: "50%" }}>description</span>
        <span style={{ width: "20%" }}>User Id</span>
        <span style={{ width: "30%" }}>Status</span>
      </div>

      <List
        height={300} // Height of the list container
        itemCount={searchResults.length} // Total number of items
        itemSize={35} // Height of each row
        width={"100%"} // Width of the list container
      >
        {Row}
      </List>
    </div>
  );
}

export default App;
