const router = require('express').Router();
const taskController = require('../controllers/TaskController');

router.post('/createTask', taskController.createTask);
router.get('/getTaskLists', taskController.getTaskLists);
router.get('/getTaskListsOverView', taskController.getTaskListsOverView);
// router.get('/getRecentTaskLists', storyController.getStories);

module.exports = router;
