// import "./App.css";

import { TodoContextProvider } from "./Index";
import { useState, useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const idGenerator = () => {
    const randomWords =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newId = "";
    for (let i = 0; i <= 5; i++) {
      const randomNumber = Math.floor(Math.random() * randomWords.length + 1);
      newId = newId + randomWords[randomNumber];
    }
    const nowDate = Date.now();
    return newId + nowDate;
  };
  const [todos, SetTodos] = useState([]);

  const addTodo = (todo) => {
    SetTodos((prev) => [{ id: idGenerator(), ...todo }, ...prev]);
  };

  const updateTodo = (todo, id) => {
    SetTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? (prevTodo.todo = todo) : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    SetTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    SetTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) SetTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
