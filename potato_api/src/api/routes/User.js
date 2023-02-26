const router = require('express').Router();
const userController = require('../controllers/UserController');
const { authenticateUser } = require('../middlewares/JwtAuth');

router.get('/', (req, res) => {
  res.send('Welcome to Potato Diary > User\'s API');
});

router.post('/createUser', userController.createUser);
router.get('/getUsers', authenticateUser, userController.getUsers);
router.get('/getUserDetails', authenticateUser, userController.getUserDetails);
router.get('/getUserByUsername/:username', userController.getUserByUsername);
router.post('/updateUserDetails', authenticateUser, userController.updateUserDetails);

// AUTH //
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refreshAccessToken', userController.refreshAccessToken);

// router.post('/nani', (req, res) => {
//   res.send('wtf?');
// });

module.exports = router;
