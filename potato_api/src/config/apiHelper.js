const apiResponse = (res, err, results) => {
  if (err) {
    return res.status(200).json({
      success: 0,
      message: `Error = ${err}`,
    });
  }
  return res.status(200).json({
    success: 1,
    data: results,
  });
};

module.exports = {
  apiResponse,
};
