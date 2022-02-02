const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();
const auth = require('../middleware/auth.middleware');
const dotenv = require('dotenv');
const {customAlphabet} = require('nanoid');

dotenv.config();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = process.env.baseUrl;
        const {from} = req.body;
        const nanoid = customAlphabet('1234567890abcdef', 5);
        const code = nanoid();

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing});
        }

        const to = baseUrl + '/t/' + code;
        const link = new Link({
            code, to, from, owner: req.user.userId
        });

        await link.save();
        res.status(201).json({link});
      
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'})
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);  
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'})
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);  
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'})
    }
});



module.exports = router;