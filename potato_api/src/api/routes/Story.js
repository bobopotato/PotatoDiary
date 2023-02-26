const router = require('express').Router();
const storyController = require('../controllers/StoryController');

router.post('/createStory', storyController.createStory);
router.get('/getStories', storyController.getStories);

module.exports = router;
