
const StoryService = require('../services/StoryService');
const { apiResponse } = require('../../config/apiHelper');
const { tryCatch } = require('../utils/tryCatch');
const AppResponse = require('../class/AppResponse');
const AppError = require('../class/AppError');


const createStory = tryCatch(
    async (req, res, next) => {
    const data = {};
    const { content, image_url, created_by } = req.body;

    data.content = content;
    data.image_url = image_url;
    data.status = 1;
    // data.created_by = created_by;
    console.log(req.user)
    data.created_by = req.user.user_id;
    data.created_time = new Date();

    const result = await StoryService.createStory(data);
    return next(new AppResponse(result));
})

const getStories = tryCatch(
    async (req, res, next) => {
    const aryStatus = [1];
    const result = await StoryService.getStories(aryStatus);
    // console.log(result[0])
    // console.log(result[0].id)
    // console.log(abc.name)
    // if (true) {
    //     throw AppError.notAcceptable("This user is not able to view those data")
    // }
    return next(new AppResponse(result));

    // old method
    // return new AppResponse(result).res;
    // return apiResponse(res, null, result);
    // try {
    //     const result = await StoryService.getStories(aryStatus);
    //     return apiResponse(res, null, result);
    // }
    // catch (err) {
    //     return apiResponse(res, err);
    // }
})

module.exports = {
    createStory,
    getStories,
}