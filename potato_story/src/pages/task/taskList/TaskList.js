import React, { useEffect, useState } from "react";
import "./TaskList.css";
import BaseDropDown from "../../../components/baseDropDown/BaseDropDown";
// import TaskListTable from "./taskListTable/TaskListTable";
import TaskListCard from "./taskListCard/TaskListCard";
import TaskController from "../../../api/controller/TaskContoller";
import BaseButton, { BaseButtonType } from "../../../components/BaseButton";
import NotDataFound from "../../../components/noDataFound/NotDataFound";
import BaseLoading from "../../../components/baseLoading/BaseLoading";

const TaskList = ({ status }) => {
  const [taskStatus, setTaskStatus] = useState({ status });
  const {
    data: taskListData,
    loading,
    error,
    callAPI: fetchApi,
  } = TaskController.GetTaskLists(taskStatus, 9);

  const statusOptions = [
    {
      status: null,
      statusText: "All",
    },
    {
      status: -1,
      statusText: "To Do",
    },
    {
      status: 0,
      statusText: "In Progress",
    },
    {
      status: 1,
      statusText: "Done",
    },
  ];

  const handleOnChangeStatus = (apiKey, values) => {
    setTaskStatus({ status: values[0] });
  };

  const handleLoadMoreData = async () => {
    try {
      await fetchApi("taskLists");
    } catch (err) {
      alert(err);
    }
  };

  // useEffect(() => {
  //   console.log(taskListData);
  // }, [taskListData]);

  const buildBody = () => {
    if (loading) return <BaseLoading/>
    if (error) return `Error ${error}`
    return (
      <div className="task-list-body">
        {!taskListData ||
        !taskListData.taskLists ||
        taskListData.taskLists.length <= 0 ? (
          <NotDataFound />
        ) : (
          taskListData &&
          taskListData.taskLists &&
          taskListData.taskLists.map((taskList, index) => {
            return <TaskListCard key={index} taskList={taskList} />;
          })
        )}
        {taskListData && !taskListData.noMoreData && (
          <div className="task-list-view-more-button">
            <BaseButton
              title="View More"
              type={BaseButtonType.primaryOutline}
              onClick={handleLoadMoreData}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="task-list-wrapper">
      <div className="task-list-container">
        <div className="task-list-header">
          <h1 className="task-list-title">
            My Task Lists {status ? status : " - All"}
          </h1>
          <div className="task-list-filter-container">
            {/* <BaseDropDown
              title="Category"
              options={statusOptions.map((option) => {
                return { value: option.status, title: option.statusText };
              })}
            /> */}
            <BaseDropDown
              title="Status"
              apiKey="status"
              defaultValue={[
                {
                  value: statusOptions[0].status,
                  title: statusOptions[0].statusText,
                },
              ]}
              options={statusOptions.map((option) => {
                return { value: option.status, title: option.statusText };
              })}
              onChange={handleOnChangeStatus}
            />
          </div>
        </div>
        {buildBody(taskListData)}
      </div>
    </div>
  );
};

export default TaskList;
