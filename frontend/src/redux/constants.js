export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://todolist-app-d0wu.onrender.com"
    : "";

export const USERS_URL = `${BASE_URL}/api/users`;
export const TASKS_URL = `${BASE_URL}/api/tasks`;
export const PROJECTS_URL = `${BASE_URL}/api/projects`;
export const LABELS_URL = `${BASE_URL}/api/labels`;
