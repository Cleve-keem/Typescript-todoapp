interface Task {
  id?: string | number;
  todo: string;
  completed: boolean;
}

const API_BASE_URL = "http://localhost:5000";

export async function fetchAllTask() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tasks`);

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await res.json();

    return data as Task[];
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

export async function addTask(task: Task) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tasks`, {
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
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}
