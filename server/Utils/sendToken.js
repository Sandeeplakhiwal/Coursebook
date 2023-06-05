export const sendToken = async (res, user, message, statusCode = 200) => {
  const token = await user.generateToken();
  const options = {
    httponly: true,
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
