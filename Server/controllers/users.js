const express = require('express');
const { Op } = require("sequelize");

const sha1 = require('../helpers/sha1');
const constants = require('../helpers/constants');

const UserModel = require('../models').User;



const router = express.Router();

const User = {

    async getAll(req, res) {

        if (req.user !== null && req.user.role_id === constants.ADMIN){
         
            console.log(req.query);

            const users = await UserModel.findAll({
                where : {
                    ...req.query
                }
            });

            res.json({
                users
            });
        }
        else{
            res.status(401).send();
        }
    },

    async get(req, res) {

        console.log('user-get');

        //console.log(req.user);
        //console.log(req.params.id);

        if (req.user !== null){

            if ( req.user.role_id === constants.ADMIN ){

                const user = await UserModel.findOne({
                    where: { 
                        id:req.params.id
                    } 
                });

                res.json(user); 
            }
            else {
                
                if (req.params.id === req.user.id.toString()){

                    const user = await UserModel.findOne({
                        where: { 
                            id:req.params.id
                        } 
                    });
    
                    res.json(user); 
                }
                else{
                    res.status(401).send();
                }
            }
        }else{
            res.status(401).send();
        }
    },


    async getPatients(req, res) {

        console.log('user-getPatients');

        if (req.user !== null){

            if ( req.user.role !== constants.PATIENT ){

                const users = await UserModel.findAll({
                    where: { 
                        doctor_id : req.params.id
                    } 
                });

                res.json({
                    users
                }); 
            }
            else {
                res.status(401).send();
            }
        }else{
            res.status(401).send();
        }
    },


    async update(req, res) {

        console.log('user-update');


        if (req.user !== null){

            //console.log(req.body);

            if ( req.user.role_id === constants.PATIENT && req.params.id !== req.user.id.toString()){
                res.status(401).send();  
                return;
            }

            if ( req.user.role_id === constants.DOCTOR && req.params.id !== req.user.id.toString()){
                
                const count = await UserModel.count({
                    where: { 
                        id:req.params.id,
                        doctor_id : req.user.id
                    } 
                });

                if (count === 0){
                    res.status(401).send();  
                    return;
                }
            }


            const count = req.body.username !== undefined ? await UserModel.count({
                where: {
                    username : req.body.username,
                    id : {
                        [Op.ne]: req.params.id
                    },                
                }
            }) : 0;


            if(count === 0){
                try {
                    
                    const filter = {
                        where: {
                            id : req.params.id
                        }
                    }
                    const save = { ...req.body, password : sha1(req.body.password || 'pass' ) }
                    
                    await UserModel.update(save, filter);
                    res.status(204).send(); 
                 

                } catch (error) {
                    res.status(422).json(error.errors) 
                }
            }

            else{
                res.status(409).json({error : 'username already used'});  
            }  
        }
        else{
            res.status(401).send();  
        }
    },



    async create(req, res) {

        console.log('user-create');

        if (req.user !== null && [constants.ADMIN, constants.DOCTOR].includes(req.user.role_id)){

            //console.log(req.body);

            const count = await UserModel.count({
                where: {
                    username : req.body.username,
                }
            });

            if(count === 0){
                try {
                    
                    const save = { ...req.body, password : sha1(req.body.password || 'pass' ) }
                    const user = await UserModel.create(save);

                    res.json(user);

                } catch (error) {
                    res.status(422).json(error.errors) 
                }
            }

            else{
                res.status(409).json({error : 'username already used'});  
            }  
        }
        else{
            res.status(401).send();  
        }
    },


    async delete(req, res) {

        console.log('user-delete');

        if (req.user !== null){

            //console.log(req.body);

            if ( req.user.role_id === constants.PATIENT && req.params.id !== req.user.id.toString()){
                res.status(401).send();  
                return;
            }

            if ( req.user.role_id === constants.DOCTOR && req.params.id !== req.user.id.toString()){
                
                const count = await UserModel.count({
                    where: { 
                        id:req.params.id,
                        doctor_id : req.user.id
                    } 
                });

                if (count === 0){
                    res.status(401).send();  
                    return;
                }
            }


            try {
              
                await UserModel.destroy({
                    where: {
                        id : req.params.id
                    }
                });
                res.status(204).send(); 
             

            } catch (error) {
                res.status(422).json(error.errors) 
            }
        }
        else{
            res.status(401).send();  
        }
    },
}



router.get('/', User.getAll);
router.get('/:id', User.get);
router.get('/:id/patients', User.getPatients);
router.patch('/:id', User.update);
router.post('/', User.create);

router.delete('/:id', User.delete);


module.exports = router;