const db = require('../../config/database');

const createStory = (story) => {
    return db.executeQuery(
        `insert into tbl_story(content, image_url, status, created_by, created_date)
          values(?,?,?,?,?)`,
        [
            story.content,
            story.image_url,
            story.status,
            story.created_by,
            story.created_time,
        ],
    );
};

const getStories = (aryStatus) => {
    return db.executeQuery(
        `select story.*, username from tbl_story story
        join tbl_user user on user.user_id = story.created_by
        where story.status IN (${aryStatus}) 
        order by modified_date DESC`,
    );
};

module.exports = {
    createStory,
    getStories,
};
