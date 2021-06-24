const {recaptcha_key, recaptcha_secret} = require('../config/key.json');

const Recaptcha = require('express-recaptcha').RecaptchaV3;


module.exports = new Recaptcha(recaptcha_key, recaptcha_secret);
