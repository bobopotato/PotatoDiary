

const TASK_API_URL = "/api/task"; 

class UserRoute {
    static CREATE_TASK = `${TASK_API_URL}/createTask`;
    static GET_TASK_LISTS = `${TASK_API_URL}/getTaskLists`;
    static GET_TASK_LISTS_OVERVIEW = `${TASK_API_URL}/getTaskListsOverView`;
}

export default UserRoute;