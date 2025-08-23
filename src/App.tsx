import { IoMdAdd } from "react-icons/io";
import Button from "./components/Button";
import React, { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import {
  addTask,
  getAllTask,
  deleteTask,
  updateTask,
} from "./services/taskApi";

interface Task {
  _id?: string | undefined;
  todo: string;
  completed: boolean;
}

function App() {
  const [allTask, setAllTasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true);
        setError("");
        let data = await getAllTask();
        setAllTasks(data);
      } catch (error) {
        console.error("❌ Error getting all tasks:", error);
        setError("❌ Failed Loading all tasks, try again later!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  async function handleToggleCompleted(id: string | undefined) {
    let task: Task | undefined = allTask.find((task) => task._id === id);

    if (!task) {
      return;
    }

    let updated = await updateTask(task?._id, { completed: !task?.completed });
    setAllTasks((prev) =>
      prev.map((task) => (task._id === id ? updated.updatedTask : task))
    );
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

    const newTask: any = await addTask(task);
    setAllTasks((prev) => [...prev, newTask.data]);
    alert(newTask.message);
    setTodo("");
  }

  async function handleDeleteTask(id: string | undefined) {
    if (!id) return;

    try {
      const res = await deleteTask(id);
      alert(res.message);

      setAllTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete task", err);
    }
  }

  return (
    <div className="app">
      <h1 className="text-3xl text-center mb-5 font-semibold">Todo App</h1>
      <div className="bg-zinc-100 px-6 pt-3 pb-4 rounded">
        <form className="flex gap-2 mt-3 my-7" onSubmit={handleAddTask}>
          <input
            type="text"
            className="flex-1 border border-zinc-300 outline-none px-2 py-2 text-[18px] rounded"
            value={todo}
            onChange={handleChange}
          />
          <Button variant="primary">
            <IoMdAdd />
          </Button>
        </form>
        {isLoading && <div>Loading...</div>}
        {!isLoading && error && <div>{error}</div>}
        {!isLoading && !error && (
          <ul className="space-y-2 divide-y divide-zinc-300">
            {allTask.map((task, i) => (
              <TaskItem
                key={i}
                task={task}
                deleteTask={handleDeleteTask}
                handleToggleCompleted={handleToggleCompleted}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
