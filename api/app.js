const express = require("express");
const app = express();
const passport = require("passport");
const { users, uploads, projects, staff } = require("./controllers");

/**
 * Configure Passport
 */

try {
  require("./config/passport")(passport);
} catch (error) {
  console.log(error);
}

/**
 * Configure Express.js Middleware
 */

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("x-powered-by", "serverless-express");
  next();
});

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Enable JSON use
app.use(express.json({ limit: "1mb" }));

// Since Express doesn't support error handling of promises out of the box,
// this handler enables that
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Routes - Public
 */

app.options(`*`, (req, res) => {
  res.status(200).send();
});

app.post(`/users/register`, asyncHandler(users.register));

app.post(`/users/login`, asyncHandler(users.login));

app.get(`/test/`, (req, res) => {
  res.status(200).send("Request received");
});

app.get("/project/:id", asyncHandler(projects.getById));

app.get("/projects/:type", asyncHandler(projects.getByType));

app.get("/staff", asyncHandler(staff.getAll));

/**
 * Routes - Protected
 */

app.post(
  `/user`,
  passport.authenticate("jwt", { session: false }),
  asyncHandler(users.get)
);

app.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(uploads.uploadImg)
);

app.post(
  "/project/update",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(projects.updateProject)
);

app.post(
  "/project/add-img",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(projects.addImgToProject)
);

app.post(
  "/project/remove-img",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(projects.removeImgFromProject)
);

app.delete(
  "/project/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(projects.deleteProject)
);

app.post(
  "/staff/update",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(staff.update)
);

app.delete(
  "/staff/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(staff.deleteMember)
);

/**
 * Routes - Catch-All
 */

app.get(`/*`, (req, res) => {
  res.status(404).send("Route not found");
});

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  console.error(err);
  res
    .status(500)
    .json({ error: `Internal Serverless Error - "${err.message}"` });
});

module.exports = app;
