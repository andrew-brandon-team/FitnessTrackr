// function to require user authorization across API folder
// sourced from juicebox project
function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

module.exports = {
  requireUser
}