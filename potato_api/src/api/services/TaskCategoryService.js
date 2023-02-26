const db = require("../../config/database");

const createTaskCategory = (taskCategory) => {
  return db.executeQuery(
    `insert into tbl_task_category (name, description, user_id)
        values(?,?,?)`,
    [taskCategory.name, taskCategory.description, taskCategory.user_id]
  );
};

const getTaskCategoryList = (userId, status) => {
  return db.executeQuery(
    `select * from tbl_task_category 
    where user_id = ?
    ${status && "and status = ?"}
        `,
    [userId, status]
  );
};

module.exports = {
  createTaskCategory,
  getTaskCategoryList
};
