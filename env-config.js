const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.API": prod
    ? process.env.NOW_URL + "/api"
    : "http://localhost:3000/api"
};
