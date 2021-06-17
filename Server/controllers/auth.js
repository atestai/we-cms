const {key} = require('../config/key.json');

const express = require('express');
const jwt = require('jsonwebtoken');


const authorize = require('../helpers/authorize')
const sha1 = require('../helpers/sha1');

const UserModel = require('../models/index').User;



const router = express.Router();


const User = {

    async getToken(req, res){

        const exp =  Math.floor(Date.now() / 1000) + (60 * 60);

        //console.log(sha1(req.body.password));

        const user = await UserModel.findOne({ 
            where: { 
                username : req.body.username, 
                password : sha1(req.body.password)
            } 
        });


        if (user !== null){
            const token = jwt.sign({
                exp,
                user
            }, key);
        
            res.json({
                token,
                exp
            });
        }
        else{
            res.status(401).send();
        }
    },


    refreshToken(req, res){
        //console.log(req.user); 
        const user = req.user;
        const exp =  Math.floor(Date.now() / 1000) + (60 * 60);

        if (user !== null){
            const token = jwt.sign({
                exp,
                user
            }, key);
        
            res.json({
                token,
                exp
            });
        }
        else{
            res.status(401).send();
        }
    },

    userByToken(req, res){
        const user = req.user;
        res.json(user);
    }
}


router.post('/access_token', User.getToken );
router.post('/access_token/refresh', authorize,  User.refreshToken );
router.get('/user_by_token', authorize,  User.userByToken );

module.exports = router;