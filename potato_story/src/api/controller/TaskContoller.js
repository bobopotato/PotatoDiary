import useFetchApi from "../../hooks/useFetchApi";
import usePostApi from "../../hooks/usePostApi";
import TaskRoute from "../routes/TaskRoute";

class TaskController {
  static GetTaskListsOverview = () => {
    const { data, loading, error, callAPI } = useFetchApi(
      TaskRoute.GET_TASK_LISTS_OVERVIEW
    );
    return { loading, error, data, callAPI };
  };

  static GetTaskLists = (params, resultPerPage) => {
    const { data, loading, error, callAPI } = useFetchApi(
      TaskRoute.GET_TASK_LISTS,
      { params: params, resultPerPage: resultPerPage }
    );
    return { loading, error, data, callAPI };
  };

  static CreateTask = () => {
    const { data, loading, error, callAPI } = usePostApi(TaskRoute.CREATE_TASK);

    const createTask = (objTask) => {
      const { name, description, remark, categoriesId } = objTask;
      if (name.trim() === "") {
        throw Error("Task name cant be empty");
      }

      if (!categoriesId || categoriesId.length <= 0) {
        throw Error("Category cant be empty");
      }

      return callAPI({
        body: {
          name,
          description,
          remark,
          categoriesId,
        },
      });
    };

    return createTask;
    // return { loading, error, data, callAPI: updateUserDetails };
  };
}

export default TaskController;
