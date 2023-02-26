
import React, { useMemo } from 'react'
import useAuth from '../../hooks/useAuth';
import useFetchApi from '../../hooks/useFetchApi'
import usePostApi from '../../hooks/usePostApi';
import StoryRoute from '../routes/StoryRoute'


class StoryController {

  static GetStory = () => {
    const { auth } = useAuth();
    const { loading, error, data, callAPI } = useFetchApi(StoryRoute.GET_STORY, { params: { userID: auth?.id } });
    return { loading, error, data, callAPI }
  }

  static CreateStory = () => {
    const { auth } = useAuth();
    const { loading, error, data, callAPI } = usePostApi(StoryRoute.CREATE_STORY);
    const create = async ({ content, image_url }) => {
      return callAPI({
        body: {
          content,
          image_url,
          // created_by: auth?.id, // need to be removed - don't store id
        }
      });
    }

    return { loading, error, data, callAPI: create }
  }

  static UpdateStory = ({ id }) => {
    const { loading, error, data, callAPI } = usePostApi(StoryRoute.UPDATE_STORY);
    return { loading, error, data, callAPI }
  }

  static DeleteStory = ({ id }) => {
    const { loading, error, data, callAPI } = usePostApi(StoryRoute.DeleteStory);
    return { loading, error, data, callAPI }
  }
}


 



export default StoryController