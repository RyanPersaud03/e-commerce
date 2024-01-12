const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.json(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [Product], 
    });
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // be sure to include its associated Product data
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create(req.body);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deletetags = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deletetags === 1) {
      res.json({ message: 'Tag deleted successfully'});
    } else {
      res.status(404).json({ error: 'Tag not found' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
