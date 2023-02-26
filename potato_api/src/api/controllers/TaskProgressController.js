const taskProgressService = require("../services/TaskProgressService");
const taskService = require("../services/TaskService")
const { tryCatch } = require("../utils/tryCatch");
const AppResponse = require("../class/AppResponse");
const AppError = require("../class/AppError");

const insertTaskProgress = tryCatch(async (req, res, next) => {
  const { title, content, percentage, task_id } = req.body;
  const data = {
    title,
    content,
    percentage,
    task_id,
  };
  const result = await taskProgressService.insertTaskProgress(data);

  const taskStatus = percentage === 0 ? -1 : percentage === 100 ? 1 : 0;
  const updateTaskProgress = await taskService.updateTaskProgressPercentage(task_id, percentage, taskStatus);
  console.log(result);
  return next(new AppResponse(result));
});

// const getTaskCategoryList = tryCatch(async (req, res, next) => {
//   const userId =  req.user.user_id;
//   const result = await taskProgressService.getTaskCategoryList(userId, 1);
//   console.log(result);
//   return next(new AppResponse(result));
// });

module.exports = {
    insertTaskProgress
};
