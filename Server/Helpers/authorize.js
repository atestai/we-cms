const {key} = require('../Config/key.json');
const jwt = require('jsonwebtoken');

const db = require('../Helpers/dbConnect');
const UserModel = require('../Models/user');

module.exports = async (req, res, next) => {
    
    const {authorization} = req.headers;

    if ( authorization !== undefined){
        try {
            await new Promise((resolve, reject) =>{

                const token = authorization.substr(7);
               
                const decoded = jwt.verify(token, key);
                req.user = decoded;

                db().then( () =>{

                    UserModel.findOne({
                        username : req.user, 
                    }, (err, user) =>{
        
                        if (user !== null){
                            resolve(true)
                        }
                        else{
                            reject()
                        }
                    } );
                });
            }); 

            next();

        } catch (error) {
            res.status(401).send();
        }
    }  
    else{
        res.status(401).send();
    }  
}