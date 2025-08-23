import { MdDelete } from "react-icons/md";
import Button from "./Button";

interface Task {
  _id?: string | undefined;
  todo: string;
  completed: boolean;
}

interface TaskProps {
  task: Task;
  deleteTask?: (id: string | undefined) => Promise<void>;
  handleToggleCompleted: (id: string | undefined) => void;
}

export default function TaskItem({
  task,
  deleteTask,
  handleToggleCompleted,
}: TaskProps) {
  return (
    <li className="flex justify-between items-center py-1 text-[18px]">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          className="size-4"
          onChange={() => handleToggleCompleted(task._id)}
        />

        <span className={`${task.completed ? "line-through" : ""}`}>
          {task.todo}
        </span>
      </div>
      <Button variant="danger" onClick={() => deleteTask?.(task._id)}>
        <MdDelete />
      </Button>
    </li>
  );
}
