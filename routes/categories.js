const router = require('express').Router();
const Category =require('../models/Category');



router.post('/', async(req, res) =>{
    const newCategory = await Category(req.body)
    try {
        const savedCategory = await newCategory.save();

        res.status(200).json(savedCategory);

    } catch (error) {
        res.status(500).json({ error: error });
    }
})
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats)
    } catch (error) {   
        res.status(500).json({ error: error });
    }

})

module.exports = router;