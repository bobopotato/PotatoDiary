import React from "react";
import "./ProgressBarWithDots.css";
import { ProgressBar } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ProgressBarWithDots = ({ currentPercentage, progresses }) => {
  return (
    <div className="progress-bar-with-dots-wrapper">
      <ProgressBar className="task-progress-bar-container">
        <ProgressBar
          className="task-progress-bar-with-dots"
          animated
          now={currentPercentage}
        />
        {progresses &&
          progresses.map((progress, index) => {
            return (
              <OverlayTrigger
                key={index}
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    <div className="tool-tip-progress-title">
                      {progress.title}
                    </div>
                    <div className="tool-tip-progress-content">
                      {progress.content}
                    </div>
                    <div className="tool-tip-progress-percentage">
                      {progress.percentage}%
                    </div>
                    <div className="tool-tip-progress-date">
                      {progress.created_date_text}
                    </div>
                  </Tooltip>
                }
              >
                {({ ref, ...triggerHandler }) => (
                  <div
                    className="progress-dot"
                    style={{ left: `calc(${progress.percentage}% - 10px)` }}
                    {...triggerHandler}
                    ref={ref}
                  />
                )}
              </OverlayTrigger>
            );
          })}
      </ProgressBar>
      <div className="task-progress-percentage">{currentPercentage}%</div>
    </div>
  );
};

export default ProgressBarWithDots;
