const { key, base_url, nodemailer_config } = require('../config/key.json');


const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const authorize = require('../helpers/authorize')
const { sha1, generate } = require('../helpers/sha1');
const recaptcha = require('../helpers/recaptcha');

const {emailResetPassword, replaceArray} = require('../helpers/templates');

const UserModel = require('../models/index').User;

const router = express.Router();



const User = {

    async getToken(req, res) {

        const exp = Math.floor(Date.now() / 1000) + (60 * 60);

        //console.log(sha1(req.body.password));

        const user = await UserModel.findOne({
            where: {
                username: req.body.username,
                password: sha1(req.body.password)
            }
        });


        if (user !== null) {
            const token = jwt.sign({
                exp,
                user
            }, key);

            res.json({
                token,
                exp
            });
        }
        else {
            res.status(401).send();
        }
    },


    refreshToken(req, res) {

        //console.log(req.user); 
        const user = req.user;
        const exp = Math.floor(Date.now() / 1000) + (60 * 60);

        if (user !== null) {
            const token = jwt.sign({
                exp,
                user
            }, key);

            res.json({
                token,
                exp
            });
        }
        else {
            res.status(401).send();
        }
    },

    userByToken(req, res) {
        const user = req.user;
        res.json(user);
    },


    async resetPassword(req, res) {

        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
           
            const newPassword = generate({
                length: 8,
                numbers: true
            })

            const password = sha1(newPassword);

            await UserModel.update({ password }, {
                where: {
                    id: user.id
                }
            });

            const info = await nodemailer.createTransport(nodemailer_config).sendMail({
                from: nodemailer_config.auth.user,
                to: user.email,
                subject: '[PKU] Cambio password',
                html: replaceArray(emailResetPassword, [
                    '$(name)', 
                    '$(username)', 
                    '$(password)', 
                    '$(url)' ], [user.name, user.username, newPassword, base_url ]), 
            });

            res.status(202).send(info.messageId);

        }
        else {
            res.status(404).send('Not Found');
        }


    }
}


router.post('/login', recaptcha.middleware.verify, (req, res) => {
    if (!req.recaptcha.error) {
        User.getToken(req, res);
    } else {
        res.status(401).send(req.recaptcha.error);
    }
});

router.post('/access_token', User.getToken);
router.post('/access_token/refresh', authorize, User.refreshToken);
router.get('/user_by_token', authorize, User.userByToken);

router.put('/password_reset', recaptcha.middleware.verify,(req, res) => {

    if ( !req.recaptcha.error) {
        User.resetPassword(req, res); 
    } else {
        res.status(401).send(req.recaptcha.error);
    }
});

module.exports = router;