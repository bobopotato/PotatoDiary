import React from "react";
import "./TaskCard.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const TaskCard = ({ taskName, taskDescription, progress }) => {
  return (
    <div className="task-card-wrapper">
      <div className="task-card-container">
        <div className="task-name">{taskName}</div>
        <div className="task-description">{taskDescription}</div>
        <div className="task-progress-container">
          <ProgressBar className="task-progress-bar">
            <ProgressBar
              animated
              style={{ backgroundColor: "var(--main-color)" }}
              now={progress}
            />
          </ProgressBar>
          <div className="task-progress-percentage">{progress}%</div>

        </div>
      </div>
    </div>
  );
};

export default TaskCard;
