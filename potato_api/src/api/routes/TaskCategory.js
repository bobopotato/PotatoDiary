const router = require('express').Router();
const taskCategoryController = require('../controllers/TaskCategoryController');

router.post('/createTaskCategory', taskCategoryController.createTaskCategory);
router.get('/getTaskCategoryList', taskCategoryController.getTaskCategoryList);

module.exports = router;
