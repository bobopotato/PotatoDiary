import React from "react";
import "./TaskListCard.css";
import ProgressBarWithDots from "../../../../components/progressBarWithDots/ProgressBarWithDots";

const TaskListCard = ({ taskList }) => {
  return (
    <div className="task-list-card-wrapper">
      <div className="task-list-card-container">
        <div className="task-list-card">
          <div className="task-list-name">{taskList.name}</div>
          <div className="task-list-description">{taskList.description}</div>
          <div className="task-list-category">
            Category :{" "}
            {taskList.categories.map((category) => category.name).join(", ")}{" "}
          </div>
          {/* <div className="task-list-status-container"> */}
          <div className="task-list-status">
            Status:{" "}
            <div
              className="task-list-status-text"
              style={{
                color: `${
                  taskList.status === -1
                    ? "var(--text-gray)"
                    : taskList.status === 0
                    ? "var(--main-color)"
                    : "green"
                }`,
              }}
            >
              {taskList.statusText}
            </div>
          </div>

          {/* </div> */}
          <ProgressBarWithDots
            currentPercentage={taskList.percentage}
            progresses={taskList.progresses}
          />
          <div className="task-list-date-info">
            <div className="task-list-created-date">
              Created on {taskList.created_date_text}
            </div>
            <div className="task-list-duration">
              Duration used: {taskList.duration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
