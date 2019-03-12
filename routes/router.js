const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Branch = require('../models/branches');
const User = require('../models/user');
const Customer = require('../models/customers');

const router = express.Router();

router.use(bodyParser.json());

router.route('/signup')
    .get((req, res) => res.render('signup'))

    .post((req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                const user = new User({
                    branchId: req.body.branchId,
                    userId: req.body.userId,
                    username: req.body.username,
                    password: hash,
                    userrole: req.body.userrole,
                    supervisorId: req.body.supervisorId
                });
                user.save()
                    .then((data) => {
                        res.statusCode = 200;
                        res.json('User Created!!!');
                    })
            }).catch((err) => res.json(err));
    })

router.route('/login')
    .get((req, res) => res.render('login'))

    .post((req, res, next) => {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({ message: 'username doesnt exist' });
                }
                grabbedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({ message: 'password doesnt match' });
                }
                console.log("user logged in");
                if(grabbedUser.userrole === 'manager')
                {
                    User.find({supervisorId : 10})
                    .then((data)=>{
                    res.render('manager', {data : data[0].username, data1: data[1].username});
                    }).catch((err)=> next(err));
                   
                }
                else if(grabbedUser.userrole === 'lead')
                {
                    res.render('lead', {data : grabbedUser.userrole})
                }
                else if(grabbedUser.userrole === 'staff')
                {
                    res.render('staff', {data : grabbedUser.userrole});
                }
            })
            .catch((err) => { 
                return res.status(401).json(err);
            });
    });


router.route('/staff/:staffId')
.get((req,res,next)=>{
    User.find({supervisorId : req.params.staffId})
    .then((data)=>{
        res.status(200).json(data);
    }).catch((err)=> next(err));
})

router.route('/customer/:customerId')
.get((req,res,next)=>{
    Customer.find({supervisorId : req.params.customerId})
    .then(data => {
        res.status(200).json(data);
    }).catch((err)=> next(err));
})

module.exports = router;
