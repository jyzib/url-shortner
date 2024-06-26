const { getUser } = require(__dirname + "/../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;

  next();
}

// Admin, Normal etc
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role))
      return res.status(401).end("Unauthorized");

    next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
