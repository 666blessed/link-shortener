const {Router} = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const router = Router();

dotenv.config();

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Invalid email.').isEmail(),
        check('password', 'Password should be 6 symbols at least.').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Invalid registration data.'})
        }

        const {email, password} = req.body;
        
        const candidate = await User.findOne({email});
        if (candidate) {
           return res.status(400).json({message: 'This email is already registered.'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        
        await user.save();
        res.status(201).json({message: 'User has been saved.'});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'})
    }
});

// api/auth/login
router.post('/login', 
[
    check('email', 'Enter valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
],
async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: 'Invalid login data.'})
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Wrong password.'});
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.jwtSecret,
            {expiresIn: '2h'}
        );

        res.json({token, userId: user.id});
       
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'})
    }

});


module.exports = router;