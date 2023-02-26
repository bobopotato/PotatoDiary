import React from "react";
import "./TaskOverView.css";
import TaskChart from "../taskChart/TaskChart";
import TaskCountView from "./taskCountView.js/TaskCountView";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const TaskOverview = ({taskListCountThisYear, taskListCount}) => {
  const aryTaskCount = [
    {
      status: 1,
      statusText: "Done",
      total: 20,
    },
    {
      status: 0,
      statusText: "In Progress",
      total: 10,
    },
    {
      status: -1,
      statusText: "To Do",
      total: 5,
    },
  ];
  return (
    <div className="task-bottom-container">
      <TaskChart taskListCountThisYear={taskListCountThisYear} />
      <div className="task-bottom-right-container">
        <TaskCountView aryTaskCount={taskListCount} />
        <Link to={"/MyTasks/MyTaskLists"} className="view-all-task-title">
          <div className="task-view-all-task-container">
            <div >View All Tasks</div>
            <BsFillArrowRightCircleFill />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TaskOverview;
