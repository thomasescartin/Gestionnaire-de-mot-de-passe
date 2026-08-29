const ratelimit = require("express-rate-limit");

exports.ratelimiterMiddleware = ratelimit({
  windowMs: 2 * 60 * 1000,
  max: 3,
  message: "Trop de tentative, réessayez dans deux minutes.",
});
