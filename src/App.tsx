import { IoMdAdd } from "react-icons/io";
import Button from "./components/Button";
import { MdDelete } from "react-icons/md";

function App() {
  return (
    <div className="app">
      <h1 className="text-2xl text-center mb-5 font-semibold">Todo App</h1>
      <div className="bg-zinc-100 px-5 pt-2 pb-4 rounded">
        <form className="flex gap-2 mt-3 my-7">
          <input
            type="text"
            className="flex-1 border outline-none px-1.5 py-1"
          />
          <Button variant="primary">
            <IoMdAdd />
          </Button>
        </form>

        <ul className="space-y-2 divide-y">
          <li className="flex justify-between items-center py-1">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="checked" id="checked" className="" />
              <span>Go to school</span>
            </div>
            <Button variant="danger">
              <MdDelete />
            </Button>
          </li>
          <li className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="checked" id="checked" />
              <span>Go to school</span>
            </div>
            <Button variant="danger">
              <MdDelete />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
