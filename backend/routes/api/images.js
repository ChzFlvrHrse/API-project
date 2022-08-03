const express = require('express');
const router = express.Router();

const { Image } = require('../../db/models');

router.delete('/:imageId', async (req, res) => {
  const { imageId } = req.params;
  const { user } = req;
  const currUserId = user.dataValues.id;

  const findImage = await Image.findOne()
})

module.exports = router;
