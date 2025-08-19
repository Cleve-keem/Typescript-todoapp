import { IoMdAdd } from "react-icons/io";
import Button from "./components/Button";
import React, { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import { addTask } from "./api/taskApi";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

function App() {
  const [allTask, setAllTasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setAllTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, [allTask]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todo.trim() === "") {
      return;
    }

    const task = {
      todo: todo,
      completed: false,
    };

    // setAllTasks((prev) => [...prev, task]);
    addTask(task);
    setTodo(""); // clear input
  }

  function handleDeleteTask(id: number) {
    setAllTasks(allTask.filter((task) => task.id !== id));
  }

  return (
    <div className="app">
      <h1 className="text-2xl text-center mb-5 font-semibold">Todo App</h1>
      <div className="bg-zinc-100 px-5 pt-2 pb-4 rounded">
        <form className="flex gap-2 mt-3 my-7" onSubmit={handleAddTask}>
          <input
            type="text"
            className="flex-1 border outline-none px-1.5 py-1"
            value={todo}
            onChange={handleChange}
          />
          <Button variant="primary">
            <IoMdAdd />
          </Button>
        </form>

        <ul className="space-y-2 divide-y">
          {allTask.map((task) => (
            <TaskItem key={task.id} task={task} deleteTask={handleDeleteTask} />
          ))}
        </ul>
        {/* <p>{todo}</p> */}
      </div>
    </div>
  );
}

export default App;
