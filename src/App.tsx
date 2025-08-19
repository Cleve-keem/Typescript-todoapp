import { IoMdAdd } from "react-icons/io";
import Button from "./components/Button";
import React, { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import { addTask, getAllTask } from "./services/taskApi";

interface Task {
  id?: number | string;
  todo: string;
  completed: boolean;
}

function App() {
  const [allTask, setAllTasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        let data = await getAllTask();
        setAllTasks(data);
      } catch (error) {
        console.error("Error getting all tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todo.trim() === "") {
      return;
    }

    const task = {
      todo: todo,
      completed: false,
    };

    const newTask = await addTask(task);
    setAllTasks((prev) => [...prev, newTask]);
    setTodo("");
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
          {allTask.map((task, i) => (
            <TaskItem key={i} task={task}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
