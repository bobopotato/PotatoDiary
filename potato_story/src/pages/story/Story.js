
import React, { useState, useRef, memo, useEffect, useMemo } from 'react'
import StoryController from '../../api/controller/StoryController';
import './Story.css'
import useAuth from '../../hooks/useAuth';
import useFetchApi from '../../hooks/useFetchApi';
import StoryRoute from '../../api/routes/StoryRoute';

const Story = () => {
  // const [content, setContent] = useState('');
  const { auth } = useAuth();
  
  const contentRef = useRef();
  const [image_url, setImage_Url] = useState(null);
  const { loading, error, data: stories, callAPI: GetStory} = useFetchApi(StoryRoute.GET_STORY, { params: { userID: auth?.id } });//StoryController.GetStory();
  const { loading: postLoading, error: postError, data: postData, callAPI: postStory } = StoryController.CreateStory();
  const [count, setCount] = useState(0);

  console.log(`rendering story page`)

  useEffect(() => {
    console.log(`wtf?`)
  }, [])

  const onClickPost = async (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    if (content?.length < 1) {
      return console.log(`Content length must atleast 1 character.`)
    }

    try {
      const data = await postStory({
        content: content,
        image_url: image_url,
      });
      contentRef.current.value = "";
      console.log(JSON.stringify(data));
      GetStory();
      return alert("Post successfully!");

    }
    catch (err) {
      console.log(err);
      return alert(err);
    }
  }

  // const onChangeContent = (e) => {
  //   const content = e.target.value;
  //   setContent(content);
  // }


  return (
    <div className='story-wrapper'>
      <div>Story</div>
      <form>
        <input ref={contentRef} />Content:
        <button type='submit' onClick={onClickPost}>Post</button>
      </form>
      <button onClick={()=>{setCount((prev) => prev +1)}}>Count {count}</button>
      <div>
        {loading ? 'Loading stories...'
          : error ? error :
            stories?.length < 1 ? 'No stories found...' :
              stories?.map((story) => {
                return <div key={story.id} style={{padding:'15px'}}>
                  <h6>{story.username} - {story.created_date}</h6>
                  <h3>{story.content}</h3>
                </div>
              })}
      </div>
    </div>
  )
}

export default memo(Story)