
const crypto = require("crypto");
const {generate} = require('generate-password');


module.exports = {
    sha1 : data => crypto.createHash("sha1").update(data, "binary").digest("hex"),
    generate
}

    