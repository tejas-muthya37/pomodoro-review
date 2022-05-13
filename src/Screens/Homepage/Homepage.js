import "./homepage.css";
import Tasks from "./../../Components/Tasks/Tasks";
import { useTask } from "./../../Context/task-context";

const Homepage = () => {
  const { tasksArray } = useTask();

  return (
    <div className="Homepage">
      <div className="homepage-header">
        <h1>Welcome back!</h1>
        <p>{`You have ${
          tasksArray.length === 0 ? "no" : tasksArray.length
        } tasks for today.`}</p>
      </div>
      <Tasks />
    </div>
  );
};

export default Homepage;
