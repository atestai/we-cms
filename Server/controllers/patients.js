const express = require('express');

const constants = require('../helpers/constants');
const UserModel = require('../models').User;


const router = express.Router();

const Patients = {

    async getAll(req, res) {

        if (req.user !== null && req.user.role_id === constants.ADMIN){
         
            console.log(req.query);

            const users = await UserModel.findAll({
                include: 'Doctor',

                where : {
                    ...req.query,
                    role_id : 3
                }
            });

            res.json({
                users
            });
        }
        else{
            res.status(401).send();
        }
    }
}

router.get('/', Patients.getAll);



module.exports = router;