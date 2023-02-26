const db = require('../../config/database');

const createUser = (user) => {
  return db.executeQuery(
    `insert into tbl_user(username, fullname, email_address, password, status, created_date)
          values(?,?,?,?,?,?)`,
    [
      user.username,
      user.fullname,
      user.email_address,
      user.password,
      user.status,
      user.created_time,
    ],
  );
};

const getUserDetails = (userId, callBack) => {
  return db.executeQuery(
    'SELECT * from tbl_user where user_id = ?',
    [
      userId
    ],
    callBack,
  );
};

const getUsers = (callBack) => {
  return db.executeQuery(
    'SELECT * from tbl_user',
    [],
    callBack,
  );
};

const getUserByUsername = (username, callBack) => {
  return db.executeQuery(
    'SELECT * from tbl_user where username = ?',
    [
      username,
    ],
    callBack,
  );
};

const getUserByEmail = (email, callBack) => {
  return db.executeQuery(
    'SELECT * from tbl_user where email_address = ?',
    [
      email,
    ],
    callBack,
  );
};

const searchUserByUsernameLike = (username, callBack) => {
  return db.executeQuery(
    'SELECT * from tbl_user where username LIKE ?',
    [
      `%${username}%`,
    ],
    callBack,
  );
};

const updateUserDetails = (username, fullname, email_address, userId, callBack) => {
  return db.executeQuery(
    `UPDATE tbl_user 
    SET username = ?, fullname = ?, email_address = ?
    WHERE user_id = ?`,
    [
      username,
      fullname,
      email_address,
      userId,
    ],
    callBack,
  );
}

const insertRefreshToken = (refreshToken) => {
  return db.executeQuery(
    `insert into tbl_refresh_token(token, status, created_date)
          values(?,?,?)`,
    [
      refreshToken,
      1,
      new Date(),
    ],
  );
}

const getRefreshToken = (refreshToken) => {
  return db.executeQuery(
    `SELECT * FROM tbl_refresh_token where token = ? AND status = '1'`,
    [
      refreshToken,
    ],
  );
}

const invalidateRefreshToken = (refreshToken) => {
  return db.executeQuery(
    `UPDATE tbl_refresh_token set status = 0 where token = ?`,
    [
      refreshToken,
    ],
  );
} 

module.exports = {
  createUser,
  getUserDetails,
  getUsers,
  getUserByUsername,
  getUserByEmail,
  searchUserByUsernameLike,
  updateUserDetails,
  insertRefreshToken,
  getRefreshToken,
  invalidateRefreshToken,
};
