require("dotenv").config();
const Bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const userService = require("../services/UserService");
const { apiResponse } = require("../../config/apiHelper");
const { tryCatch } = require("../utils/tryCatch");
const AppResponse = require("../class/AppResponse");
const AppError = require("../class/AppError");
const ResponseStatusCode = require("../class/ResponseStatusCode");

const createUser = tryCatch(async (req, res, next) => {
  const { body } = req;
  const data = body;
  const salt = Bcrypt.genSaltSync(10);
  data.password = Bcrypt.hashSync(data.password, salt);
  data.status = 1;
  data.created_time = new Date();

  const getUsername = await userService.getUserByUsername(body.username);
  const getUserEmail = await userService.getUserByEmail(body.email_address);

  if (getUsername && getUsername.length > 0) {
    throw AppError.notAcceptable(
      "This username had been registered. Please try another username"
    );
  }

  if (getUserEmail && getUserEmail.length > 0) {
    throw AppError.notAcceptable(
      "This email address had been registered. Please try another email address"
    );
  }

  const results = await userService.createUser(data);
  return next(new AppResponse(results));
});

const getUsers = tryCatch(async (req, res, next) => {
  const results = await userService.getUsers();
  return next(new AppResponse(results));
});

const getUserDetails = tryCatch(async (req, res, next) => {
  const userId = req.user?.user_id;
  if (!userId) throw AppError.unauthorized("Unauthorized user");
  const results = await userService.getUserDetails(userId);
  console.log(results);
  return next(new AppResponse(results[0]));
});

const getUserByUsername = tryCatch(async (req, res, next) => {
  const { username } = req.params;

  const results = await userService.getUserByUsername(username);

  if (results && results.length === 0) {
    throw AppError.dataNotFound("Username not found");
  }
  return next(new AppResponse(results[0]));
});

const getUserByEmail = tryCatch(async (req, res, next) => {
  const { email } = req.params;

  const results = await userService.getUserByEmail(email);

  if (results && results.length === 0) {
    throw AppError.dataNotFound("Email Address not found!");
  }
  return next(new AppResponse(results[0]));
});

const searchUserByUsername = tryCatch(async (req, res, next) => {
  const { username } = req.params;

  const results = await userService.searchUserByUsernameLike(username);
  return next(new AppResponse(results));
});

const updateUserDetails = tryCatch(async (req, res, next) => {
  const userId = req.user?.user_id;
  const { username, fullname, email_address } = req.body;

  const results = await userService.updateUserDetails(
    username,
    fullname,
    email_address,
    userId
  );
  console.log(results);
  return next(new AppResponse(results[0]));
});

const login = tryCatch(async (req, res, next) => {
  const { username, email, password } = req.body;
  let getUser;

  if (username) {
    getUser = await userService.getUserByUsername(username);
  } else if (email) {
    getUser = await userService.getUserByEmail(email);
  }

  if (!getUser) {
    throw AppError.badRequest("Invalid login credential");
  }

  if (getUser.length < 1) {
    throw AppError.badRequest("Invalid login credential");
  }

  const passwordSync = Bcrypt.compareSync(password, getUser[0].password);

  if (!passwordSync) {
    throw AppError.badRequest("Invalid login credential");
  }

  delete getUser[0].password;
  const accessToken = generateAccessToken(getUser[0]);
  console.log(`Bearer ${accessToken}`)
  const refreshToken = generateRefreshToken(getUser[0]);
  await userService.insertRefreshToken(refreshToken);

  await res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });
  // remove user id before send to frontend to be stored in local storage
  delete getUser[0].user_id;
  return next(
    new AppResponse({
      userInfo: getUser[0],
      accessToken,
      refreshToken,
    })
  );
});

const refreshAccessToken = tryCatch(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken == null || refreshToken == "")
    throw AppError.unauthorized("You are not authenticated!");

  // Check DB for valid refresh token
  const existingToken = await userService.getRefreshToken(refreshToken);
  if (existingToken == null || existingToken?.length < 1)
    throw AppError.unauthorized("Invalid Refresh Token");

  JsonWebToken.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        throw AppError.unauthorized(`Invalid Refresh Token ${err}`);
      }

      const accessToken = generateAccessToken(user.result);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return next(new AppResponse({ accessToken }));
    }
  );
});

const logout = tryCatch(async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken == null || refreshToken == "")
    throw AppError.unauthorized("You are not authenticated!");

  await userService.invalidateRefreshToken(refreshToken);
  return next(new AppResponse({ message: "Log out successfully." }));
});

const generateAccessToken = (user) => {
  return JsonWebToken.sign({ result: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  });
};

const generateRefreshToken = (user) => {
  return JsonWebToken.sign({ result: user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserByUsername,
  getUserByEmail,
  searchUserByUsername,
  getUserDetails,
  updateUserDetails,
  //AUTH
  refreshAccessToken,
  login,
  logout,
};
