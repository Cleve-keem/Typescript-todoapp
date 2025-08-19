const ENDPOINT_URL = import.meta.env.VITE_BACKEND_ENPOINT_URL;

interface Task {
  id?: string | number;
  todo: string;
  completed: boolean;
}

export async function getAllTask() {
  try {
    const res = await fetch(`${ENDPOINT_URL}/api/tasks`);

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await res.json();

    return data as Task[];
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
}

export async function addTask(task: Task) {
  try {
    const res = await fetch(`${ENDPOINT_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add task");
    }

    return data as Task;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}
