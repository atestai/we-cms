const express = require('express');
const { Op } = require("sequelize");


// const constants = require('../helpers/constants');
// const UserModel = require('../models').User;

const router = express.Router();

const Analysis = {

    async create(req, res) {
        console.log('user-create');

        res.json({
            'user-create' : 'user-create'
        })
    }
}

router.get('/', (req, res ) => {
    
    res.json({
        'user-create' : 'user-create'
    });
});


router.post('/', Analysis.create);
module.exports = router;
