"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { PORT, CORS_ORIGIN, MONGODB_URI } = process.env;

assert(PORT, "PORT is required");
assert(CORS_ORIGIN, "CORS_ORIGIN is required");
assert(MONGODB_URI, "MONGODB_URI is required");

module.exports = {
  port: PORT,
  url: CORS_ORIGIN,
  mongodbUri: MONGODB_URI,
};
