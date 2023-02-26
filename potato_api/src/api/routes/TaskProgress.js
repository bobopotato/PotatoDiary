const router = require('express').Router();
const taskProgressController = require('../controllers/TaskProgressController');

router.post('/insertTaskProgress', taskProgressController.insertTaskProgress);

module.exports = router;
