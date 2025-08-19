import { MdDelete } from "react-icons/md";
import Button from "./Button";

interface Task {
  id?: number | string;
  todo: string;
  completed: boolean;
}

interface TaskProps {
  task: Task;
  deleteTask?: (id: string | number | undefined) => void;
}

export default function TaskItem({ task }: TaskProps) {
  return (
    <li className="flex justify-between items-center py-1">
      <div className="flex items-center gap-2">
        <input type="checkbox" name="checked" id="checked" className="" />
        <span>{task.todo}</span>
      </div>
      <Button variant="danger">
        <MdDelete />
      </Button>
    </li>
  );
}
