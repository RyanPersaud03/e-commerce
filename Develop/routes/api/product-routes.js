const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get All Products
router.get('/', async(req, res) => {
  // find all products
  try {
    const product = await Product.findAll({
      include: [Category, Tag], 
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
  // be sure to include its associated Category and Tag data
});

// Get Product by ID
router.get('/:id', async(req, res) => {
  // find a single product by its `id`
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id
      },
      include: [Category, Tag],
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // be sure to include its associated Category and Tag data
});

router.post('/', async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'})
  }
});

router.put('/:id', async(req, res) => {
try {
  const product = await Product.update(req.body,{
    where: {
      id: req.params.id
    }
  });
  res.json(product);
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Internal Server Error'});
}
});

router.delete('/:id', async(req, res) => {
  // delete one product by its `id` value
  try {
    const deleteproduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deleteproduct === 1) {
      res.json({ message: 'Product deleted successfully'});
    } else {
      res.status(404).json({ error: 'Product not found'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'})
  }
});

module.exports = router;