import { useContext, createContext, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  let tasksArrayLocalStorage = JSON.parse(localStorage.getItem("TASKS_ARRAY"));
  if (tasksArrayLocalStorage === null) tasksArrayLocalStorage = [];
  const [tasksArray, setTasksArray] = useState(tasksArrayLocalStorage);
  return (
    <TaskContext.Provider value={{ tasksArray, setTasksArray }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { useTask, TaskProvider };
