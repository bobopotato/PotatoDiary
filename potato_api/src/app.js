require('dotenv').config();

const express = require('express');
const cors = require('cors');
var cookies = require("cookie-parser");

const { authenticateUser } = require('./api/middlewares/JwtAuth');
const credential = require('./api/middlewares/Credentials');
const userRouter = require('./api/routes/User');
const storyRouter = require('./api/routes/Story');
const taskRouter = require('./api/routes/Task');
const taskCategoryRouter = require('./api/routes/TaskCategory');
const taskProgressRouter = require('./api/routes/TaskProgress');
const responseHandler = require('./api/middlewares/ResponseHandler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(credential);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookies());


// API ROUTE
app.use('/api/user', userRouter);
app.use('/api/story', authenticateUser, storyRouter);
app.use('/api/task', authenticateUser, taskRouter);
app.use('/api/taskCategory', authenticateUser, taskCategoryRouter);
app.use('/api/taskProgress', authenticateUser, taskProgressRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Potato Diary\'s API');
});


// RESPONSE HANDLER 
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
  if (process.pid) {
    console.log(`Process ID => ${process.pid}`);
  }
});
