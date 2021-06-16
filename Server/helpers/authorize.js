const {key} = require('../config/key.json');

const jwt = require('jsonwebtoken');

const UserModel = require('../models/index').User;


module.exports = async (req, res, next) => {
    
    const {authorization} = req.headers;

    if ( authorization !== undefined){

        try {

            const token = authorization.substr(7);
            const decoded = jwt.verify(token, key);

            const user = await UserModel.findOne({ 
                where: { 
                    username : decoded.user.username
                } 
            });

            if (user !== null){
                req.user = decoded.user;
                next();
            }
            else{
                res.status(401).send();
            }
        } catch (error) {
            res.status(401).json(error);
        }
    }  
    else{
        res.status(401).send();
    }  
}