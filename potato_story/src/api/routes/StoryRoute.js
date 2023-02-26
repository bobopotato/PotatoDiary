
const STORY_API_URL = "/api/story"; 

class StoryRoute {
    static GET_STORY = `${STORY_API_URL}/getStories`;
    static CREATE_STORY = `${STORY_API_URL}/createStory`;
    static UPDATE_STORY = `${STORY_API_URL}/updateStory`;
    static DELETE_STORY = `${STORY_API_URL}/deleteStory`;
}

export default StoryRoute;