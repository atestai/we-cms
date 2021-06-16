
const crypto = require("crypto");

module.exports = data => crypto.createHash("sha1").update(data, "binary").digest("hex");