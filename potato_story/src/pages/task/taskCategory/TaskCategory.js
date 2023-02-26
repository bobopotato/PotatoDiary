import React from "react";
import "./TaskCategory.css";
import TaskCard from "../taskCard/TaskCard";
import { Button } from "react-bootstrap";
import BaseButton, { BaseButtonType } from "../../../components/BaseButton";
import NotDataFound from "../../../components/noDataFound/NotDataFound";
import NoMoreData from "../../../components/noMoreData/NoMoreData";

const TaskCategory = ({ title, aryTasks }) => {
  const buildBody = (aryTasks) => {
    console.log(aryTasks);

    if (aryTasks && aryTasks.length <= 0) {
      return <NotDataFound />;
    }

    if (aryTasks && aryTasks.length < 5) {
      return (
        <>
          {aryTasks.map((task, index) => {
            return (
              <TaskCard
                key={index}
                taskName={task.name}
                taskDescription={task.description}
                progress={task.percentage}
              />
            );
          })}
          <NoMoreData />
        </>
      );
    }

    return (
      <>
        {aryTasks.map((task, index) => {
          return (
            <TaskCard
              key={index}
              taskName={task.name}
              taskDescription={task.description}
              progress={task.percentage}
            />
          );
        })}
        <div className="view-more-button">
          <BaseButton title="View More" type={BaseButtonType.primaryOutline} />
        </div>
      </>
    );
  };
  return (
    <div className="task-category-wrapper">
      <div className="task-category-inner-wrapper">
        <h3 className="task-category-title">{title}</h3>
        <div className="task-category-container">{buildBody(aryTasks)}</div>
      </div>
    </div>
  );
};

export default TaskCategory;
