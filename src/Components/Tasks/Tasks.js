import "./tasks.css";
import Task from "./../Task/Task";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useTask } from "./../../Context/task-context";
import uuid from "react-uuid";

const Tasks = () => {
  useEffect(() => {
    fetch("https://627d3749e5ac2c452aff4e15.mockapi.io/api/pomodoro/tasks", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const { tasksArray, setTasksArray } = useTask();

  const date = new Date();
  const dateFormatted = {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
  switch (dateFormatted.month) {
    case 1:
      dateFormatted.month = "January";
      break;
    case 2:
      dateFormatted.month = "February";
      break;
    case 3:
      dateFormatted.month = "March";
      break;
    case 4:
      dateFormatted.month = "April";
      break;
    case 5:
      dateFormatted.month = "May";
      break;
    case 6:
      dateFormatted.month = "June";
      break;
    case 7:
      dateFormatted.month = "July";
      break;
    case 8:
      dateFormatted.month = "August";
      break;
    case 9:
      dateFormatted.month = "September";
      break;
    case 10:
      dateFormatted.month = "October";
      break;
    case 11:
      dateFormatted.month = "November";
      break;
    case 12:
      dateFormatted.month = "December";
      break;
    default:
      dateFormatted.month = "January";
  }

  useEffect(() => {
    localStorage.setItem("TASKS_ARRAY", JSON.stringify(tasksArray));
  }, [tasksArray]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 3,
    bgcolor: "whitesmoke",
    borderRadius: "0.25rem",
    outline: "none",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    taskDescription: "",
  });

  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);

  const addTask = () => {
    if (editingTaskIndex !== -1) {
      setTasksArray([
        ...tasksArray.slice(0, editingTaskIndex),
        {
          _id: uuid(),
          ...taskDetails,
        },
        ...tasksArray.slice(editingTaskIndex + 1),
      ]);
      fetch(
        `https://627d3749e5ac2c452aff4e15.mockapi.io/api/pomodoro/tasks/${
          editingTaskIndex + 1
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskDetails),
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      setTasksArray([
        ...tasksArray,
        {
          _id: uuid(),
          dateCreated: `${dateFormatted.month} ${dateFormatted.date}, ${dateFormatted.year}`,
          ...taskDetails,
        },
      ]);
    }
    handleClose();
    setTaskDetails({
      taskName: "",
      taskDescription: "",
    });
    setEditingTaskIndex(-1);
    fetch("https://627d3749e5ac2c452aff4e15.mockapi.io/api/pomodoro/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskDetails),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const editTask = (id, index) => {
    var taskFound = tasksArray.find((task) => task._id === id);
    setTaskDetails({
      taskName: taskFound.taskName,
      taskDescription: taskFound.taskDescription,
    });
    handleOpen();
    setEditingTaskIndex(index);
  };

  const deleteTask = (id, index) => {
    setTasksArray(tasksArray.filter((task) => task._id !== id));
    fetch(
      `https://627d3749e5ac2c452aff4e15.mockapi.io/api/pomodoro/tasks/${
        index + 1
      }`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Tasks">
      <header className="tasks-header">
        <h3>To - Do List</h3>
        <span onClick={handleOpen}> + </span>
      </header>
      <div className="tasks-body">
        {tasksArray.map((task, index) => {
          return (
            <Task
              key={task._id}
              taskId={task._id}
              taskName={task.taskName}
              editTask={() => editTask(task._id, index)}
              deleteTask={() => deleteTask(task._id, index)}
            />
          );
        })}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <input
              onChange={(event) =>
                setTaskDetails({
                  ...taskDetails,
                  taskName: event.target.value,
                })
              }
              value={taskDetails.taskName}
              type="text"
              placeholder="Name"
            />
            <textarea
              onChange={(event) =>
                setTaskDetails({
                  ...taskDetails,
                  taskDescription: event.target.value,
                })
              }
              value={taskDetails.taskDescription}
              placeholder="Description"
            />
            <div className="btn-group">
              <button
                onClick={() => {
                  handleClose();
                  setTaskDetails({
                    taskName: "",
                    taskDescription: "",
                  });
                  setEditingTaskIndex(-1);
                }}
              >
                Cancel
              </button>
              <button onClick={addTask}>Save</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
