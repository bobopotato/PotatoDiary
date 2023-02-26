const TaskService = require("../services/TaskService");
const { tryCatch } = require("../utils/tryCatch");
const AppResponse = require("../class/AppResponse");
const AppError = require("../class/AppError");
const TaskStatus = require("../class/TaskStatus");
const moment = require("moment");

const createTask = tryCatch(async (req, res, next) => {
  const { name, description, remark, categoriesId } = req.body;
  const taskData = {
    name,
    description,
    remark,
    user_id: req.user.user_id,
  };
  const result = await TaskService.createTask(taskData);
  const taskId = result.insertId;

  if (!taskId) {
    throw AppError.internal("Task failed to insert");
  }

  let aryInsertTaskCategories = categoriesId.map((categoryId) => {
    return TaskService.insertTaskCategories(taskId, categoryId);
  });

  await Promise.all(aryInsertTaskCategories);

  console.log(`task categories inserted successfully`);

  return next(new AppResponse(result));
});

const getTaskLists = tryCatch(async (req, res, next) => {
  const { status, resultPerPage, currentPage } = req.query;
  const userId = req.user.user_id;
  const data = await TaskService.getTaskLists(userId, status ,resultPerPage, currentPage, req);
  for (let item of data) {
    item.statusText = new TaskStatus(item.status).statusText;
    item.created_date_text = moment(item.created_date).format("DD/MM/YYYY");

    if (item.created_date != null) {
      let moment1 = moment(item.created_date) ;
      let moment2 = item.end_date ? moment(item.end_date) : moment();
      let duration = moment2.diff(moment1);
      duration = moment.duration(duration).humanize()
      item.duration = duration
    }

    const [resultCategories, resultProgresses] = await Promise.all([
      TaskService.getTaskListCategories(item.id),
      TaskService.getTaskListProgresses(item.id),
    ]);
    item.categories = resultCategories;
    item.progresses = resultProgresses.map((item) => {
      return {...item, created_date_text: moment(item.create_date).format('DD/MM/YYYY')}
    });
    // console.log(resultProgresses);
  }

  const result = {
    taskLists: data,
    noMoreData: req.noMoreData,
  }

  return next(new AppResponse(result));
});

const getTaskListsOverView = tryCatch(async (req, res, next) => {
  const userId = req.user.user_id;
  const data = await TaskService.getRecentTaskLists(userId, 5);

  const statusToDo = new TaskStatus(TaskStatus.TO_DO);
  const statusInProgress = new TaskStatus(TaskStatus.IN_PROGRESS);
  const statusDone = new TaskStatus(TaskStatus.DONE);

  const resultToDo = {
    status: statusToDo.status,
    statusText: statusToDo.statusText,
    aryTasks: [],
  };
  const resultInProgress = {
    status: statusInProgress.status,
    statusText: statusInProgress.statusText,
    aryTasks: [],
  };
  const resultDone = {
    status: statusDone.status,
    statusText: statusDone.statusText,
    aryTasks: [],
  };
  const result = { taskStatus: [resultToDo, resultInProgress, resultDone] };

  for (let item1 of data) {
    for (let item2 of result.taskStatus) {
      if (item2.status === item1.status) {
        item2.aryTasks.push(item1);
        continue;
      }
    }
  }

  const resultTaskListCount = await TaskService.getAllTaskListCount(userId);
  console.log(resultTaskListCount);
  result.taskListCount = resultTaskListCount;

  const resultTaskListCountThisYear = await TaskService.getAllTaskListCount(
    userId,
    2023
  );
  result.taskListCountThisYear = resultTaskListCountThisYear//.filter((item) => item.status !== -1);

  return next(new AppResponse(result));
});

module.exports = {
  createTask,
  getTaskLists,
  getTaskListsOverView,
};
