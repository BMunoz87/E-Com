const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



router.get('/', (req, res) => {
    Tag.findAll({
        include: {
            model: Product,
            attributes: ['product_name', 'price', 'stock', 'category_id']
        }
    })
    .then(tagData => res.json(tagData))
    .catch(e => {
        res.status(500).json(e)
    })
});

router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['product_name', 'price', 'stock', 'category_id']
        }
    })
    .then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: 'Tag association not found' })
            return 
        }
        res.json(tagData)
    })
    .catch(e => {
        res.status(500).json(e)
    })
});

router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    })
    .then(tagData => res.json(tagData))
    .catch(e => {
        res.status(500).json(e)
    })
});

router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id
        },
    })
    .then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: 'Tag association not found' })
            return 
        }
        res.json(tagData)
    })
    .catch(e => {
        res.status(500).json(e)
    })
});

router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
        id: req.params.id 
        }
    })
    .then(tagData => {
        if(!tagData) {
        res.status(404).json({message: 'Tag association not found'})
        return
        }
    res.json(tagData)
    })
    .catch(e => {
    res.status(500).json(e)
    })
});

module.exports = router;