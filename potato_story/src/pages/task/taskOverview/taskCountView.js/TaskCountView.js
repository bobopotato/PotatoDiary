import React from "react";
import "./TaskCountView.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const TaskCountView = ({ aryTaskCount }) => {
  const customStyle = {
    backgroundColor: "red",
  };

  const colorToDo = "rgb(255, 199, 100)";
  const colorInProgress = "rgb(255, 99, 0)";
  const colorCompleted = "rgb(75, 200, 192)";

  const dataToDoCount =
    aryTaskCount?.filter((item) => item.status === -1)[0].count || 0;
  const dataInProgressCount =
    aryTaskCount?.filter((item) => item.status === 0)[0].count || 0;
  const dataCompletedCount =
    aryTaskCount?.filter((item) => item.status === 1)[0].count || 0;
  const totalTask = dataToDoCount + dataInProgressCount + dataCompletedCount;
  return (
    <div className="task-total-container">
      <div className="task-total-title">Total Tasks</div>
      <div className="task-total-progress">
        <ProgressBar className="task-total-progress-bar">
          <ProgressBar
            style={{ backgroundColor: `${colorToDo}` }}
            now={(dataToDoCount / totalTask) * 100}
            key={1}
          />
          <ProgressBar
            style={{ backgroundColor: `${colorInProgress}` }}
            now={(dataInProgressCount / totalTask) * 100}
            key={2}
          />
          <ProgressBar
            style={{ backgroundColor: `${colorCompleted}` }}
            now={(dataCompletedCount / totalTask) * 100}
            key={3}
          />
        </ProgressBar>
        <div className="total-task-count-container">
          {aryTaskCount &&
            aryTaskCount.map((taskCount, index) => {
              return (
                <div className="total-task-count" key={index}>
                  <div
                    className="color-dot"
                    style={{
                      backgroundColor: `${
                        taskCount.status === -1
                          ? colorToDo
                          : taskCount.status === 0
                          ? colorInProgress
                          : colorCompleted
                      }  `,
                    }}
                  ></div>
                  <div className="task-status">{taskCount.statusText}</div>
                  <div className="task-total-text">
                    {" "}
                    - {taskCount.count || 0} tasks
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TaskCountView;
