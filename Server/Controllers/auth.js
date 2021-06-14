const {key} = require('../Config/key.json');
const db = require('../Helpers/dbConnect');
const authorize = require('../Helpers/authorize')

const express = require('express');
const jwt = require('jsonwebtoken');


const md5 = require('md5');

const UserModel = require('../Models/user');
const router = express.Router();

const User = {

    getToken(req, res){

        const exp =  Math.floor(Date.now() / 1000) + (60 * 60);

        db().then( () =>{

            UserModel.findOne({
                username : req.body.username, 
                password : md5(req.body.password)
            }, (err, user) =>{

                console.log(user);

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
            } );
        });
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

    }
}


router.post('/access_token', User.getToken );
router.post('/access_token/refresh', authorize,  User.refreshToken );


module.exports = router;