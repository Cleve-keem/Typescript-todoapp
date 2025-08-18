interface Task {
  id: number;
  todo: string;
  completed: boolean;
}

const API_BASE_URL = "http://localhost:5000";

export async function addTask(task: Task) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/create-new-task`, {
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
