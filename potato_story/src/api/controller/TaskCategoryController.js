import useFetchApi from "../../hooks/useFetchApi";
import usePostApi from "../../hooks/usePostApi";
import TaskCategoryRoute from "../routes/TaskCategory";

class TaskCategoryController {
    static GetTaskCategoryList = () => {
      const { data, loading, error, callAPI } = useFetchApi(TaskCategoryRoute.GET_TASK_CATEGORY_LIST);
      return { loading, error, data, callAPI }
    }

  static CreateTaskCategory = () => {
    const { data, loading, error, callAPI } = usePostApi(TaskCategoryRoute.CREATE_TASK_CATEGORY);

    const updateTaskCategory = ({ name, description }) => {
      if (name.trim() === "") {
        throw Error("Category name cant be empty");
      }

      return callAPI({
        body: {
          name,
          description,
        },
      });
    };
    return updateTaskCategory;
    // return { loading, error, data, callAPI: updateTaskCategory };
  };
}

export default TaskCategoryController;
