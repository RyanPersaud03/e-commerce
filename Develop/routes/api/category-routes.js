const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [Product], 
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product], 
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deletecategories = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deletecategories === 1) {
      res.json({ message: 'Category deleted successfully'});
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
