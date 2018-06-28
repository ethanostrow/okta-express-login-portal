const auth = require("./auth");


// Tack a user object onto each request if possible
function addUser(req, res, next) => {
  if (!req.userinfo) {
    return next();
  }

  auth.oktaClient.getUser(req.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
};
