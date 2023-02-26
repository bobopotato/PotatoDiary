const db = require("../../config/database");

const insertTaskProgress = (taskProgress) => {
  return db.executeQuery(
    `insert into tbl_task_progress (title, content, percentage, task_id)
        values(?,?,?,?)`,
    [taskProgress.title, taskProgress.content, taskProgress.percentage, taskProgress.task_id]
  );
};

// const getTaskCategoryList = (userId, status) => {
//   return db.executeQuery(
//     `select * from tbl_task_category 
//     where user_id = ?
//     ${status && "and status = ?"}
//         `,
//     [userId, status]
//   );
// };

module.exports = {
    insertTaskProgress
};
