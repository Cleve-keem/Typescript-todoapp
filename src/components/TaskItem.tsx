import { MdDelete } from "react-icons/md";
import Button from "./Button";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

interface TaskProps {
  task: Task;
  deleteTask: (id: number) => void;
}

export default function TaskItem({ task, deleteTask }: TaskProps) {
  return (
    <li className="flex justify-between items-center py-1">
      <div className="flex items-center gap-2">
        <input type="checkbox" name="checked" id="checked" className="" />
        <span>{task.todo}</span>
      </div>
      <Button variant="danger" onClick={() => deleteTask(task.id)}>
        <MdDelete />
      </Button>
    </li>
  );
}
