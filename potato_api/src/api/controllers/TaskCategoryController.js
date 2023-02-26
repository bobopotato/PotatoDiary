const taskCategoryService = require("../services/TaskCategoryService");
const { tryCatch } = require("../utils/tryCatch");
const AppResponse = require("../class/AppResponse");
const AppError = require("../class/AppError");


const createTaskCategory = tryCatch(async (req, res, next) => {
  const { name, description } = req.body;
  const data = {
    name,
    description,
    user_id: req.user.user_id,
  };
  const result = await taskCategoryService.createTaskCategory(data);
  console.log(result);
  return next(new AppResponse(result));
});

const getTaskCategoryList = tryCatch(async (req, res, next) => {
  const userId =  req.user.user_id;
  const result = await taskCategoryService.getTaskCategoryList(userId, 1);
  console.log(result);
  return next(new AppResponse(result));
});



module.exports = {
  createTaskCategory,
  getTaskCategoryList,
};
