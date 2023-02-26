import React from "react";
import "./MyTask.css";
import TaskCategory from "../taskCategory/TaskCategory";
import TaskOverview from "../taskOverview/TaskOverview";
import AddTask from "../addTask/AddTask";
import TaskController from "../../../api/controller/TaskContoller";
import BaseLoading from "../../../components/baseLoading/BaseLoading";

const MyTask = () => {
  const {
    loading,
    error,
    data: taskListData,
    callAPI,
  } = TaskController.GetTaskListsOverview();

  const handleNewTask = () => {
    callAPI();
  };

  if (loading) {
    return <BaseLoading />;
  }

  if (error) {
    return `Error: ${error}`;
  }

  return (
    <div className="task-wrapper">
      <div className="my-task-header">
        <h1 className="task-wrapper-title">My Tasks</h1>
        <AddTask onCreateNewTask={handleNewTask} />
      </div>
      <div className="task-container">
        {taskListData &&
          taskListData.taskStatus &&
          taskListData.taskStatus.map((data, index) => {
            return (
              <TaskCategory
                key={index}
                title={data.statusText}
                aryTasks={data.aryTasks}
              />
            );
          })}
      </div>
      <TaskOverview taskListCountThisYear={taskListData?.taskListCountThisYear} taskListCount={taskListData?.taskListCount} />
    </div>
  );
};

export default MyTask;
