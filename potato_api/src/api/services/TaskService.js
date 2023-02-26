const db = require("../../config/database");

const createTask = (task) => {
  return db.executeQuery(
    `insert into tbl_task (name, description, remark, user_id)
        values(?,?,?,?)`,
    [task.name, task.description, task.remark, task.user_id]
  );
};

const insertTaskCategories = (taskId, taskCategoryId) => {
  return db.executeQuery(
    `insert into tbl_task_categories (task_id, task_category_id)
        values(?,?)`,
    [taskId, taskCategoryId]
  );
};

const getTaskLists = async (
  userId,
  status,
  resultPerPage,
  currentPage,
  req
) => {
  const conditionalWhere = status ? " and status = ?" : "";

  // PAGINATION
  let startingLimit;

  if (resultPerPage && currentPage && currentPage > 0) {
    const getTaskListsLength = () => {
      return db.executeQuery(
        `select count(*) as count from tbl_task 
            where user_id = ?
            ${conditionalWhere}
            order by id desc
            `,
        [userId, status]
      );
    };

    let numberOfResults = await getTaskListsLength();
    const count = numberOfResults[0].count;
    const page = currentPage ? Number(currentPage) : 1;
    const numberOfPage = Math.ceil(count / resultPerPage);

    startingLimit = (page - 1) * resultPerPage;
   
    // no more data
    // const newDataCount = page * resultPerPage;
    req.noMoreData = page >= numberOfPage;
  }

  const conditionalLimit = Number(startingLimit) >= 0
    ? ` LIMIT ${startingLimit}, ${resultPerPage}`
    : "";

  // PAGINATION

  return db.executeQuery(
    `select * from tbl_task 
        where user_id = ?
        ${conditionalWhere}
        order by id desc
        ${conditionalLimit}
        `,
    [userId, status]
  );
};

const getRecentTaskLists = (userId, limit) => {
  return db.executeQuery(
    `(select * from tbl_task 
    where user_id = ?
    and status = -1
    order by id desc
    LIMIT ?)
    UNION ALL
    (select * from tbl_task 
    where user_id = ?
    and status = 0
    order by id desc
    LIMIT ?)
    UNION ALL
   ( select * from tbl_task 
    where user_id = ?
    and status = 1
    order by id desc
    LIMIT ?)
        `,
    [userId, limit, userId, limit, userId, limit]
  );
};

const getAllTaskListCount = (userId, year) => {
  if (year) {
    return db.executeQuery(
      `select ts.id as status, ts.name as statusText, count, month from tbl_task_status ts
      left join (select count(*) as count, status, 
      YEAR(created_date) as year,
      MONTH(created_date) as month
            from tbl_task 
            group by status, year, user_id, month
            having user_id = ? and year = ?
            ) as tbl on tbl.status = ts.id
            order by count desc
          `,
      [userId, year]
    );
  } else {
    return db.executeQuery(
      `select ts.id as status, ts.name as statusText, count from tbl_task_status ts
      left join (select count(*) as count, status
            from tbl_task 
            group by status, user_id
            having user_id = ?
            ) as tbl on tbl.status = ts.id
            order by count desc
          `,
      [userId]
    );
  }
};

const getTaskListCategories = (taskId) => {
  return db.executeQuery(
    `select tc.* from tbl_task t 
      join tbl_task_categories tcs on tcs.task_id = t.id
      join tbl_task_category tc on tc.id = tcs.task_category_id
      where t.id = ?
      `,
    [taskId]
  );
};

const getTaskListProgresses = (taskId) => {
  return db.executeQuery(
    `select * from tbl_task_progress 
      where task_id = ? and status = 1
      `,
    [taskId]
  );
};

const updateTaskProgressPercentage = (taskId, percentage, status) => {
  return db.executeQuery(
    `update tbl_task
      set percentage = ?, status = ?
      where id = ?
      `,
    [percentage, status, taskId]
  );
};

module.exports = {
  createTask,
  insertTaskCategories,
  getTaskLists,
  getRecentTaskLists,
  getTaskListCategories,
  getTaskListProgresses,
  getAllTaskListCount,
  updateTaskProgressPercentage
};
