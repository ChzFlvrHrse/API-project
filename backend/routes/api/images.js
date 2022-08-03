const express = require('express');
const router = express.Router();

const { Image } = require('../../db/models');


router.delete('/:imageId', async (req, res) => {
  const { imageId } = req.params;
  const { user } = req;
  const currUserId = user.dataValues.id;

  const findImage = await Image.findByPk(imageId);

  if (findImage) {
    if (findImage.imageableId === currUserId) {
      await findImage.destroy();
      res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      res.json({
        "message": "Only the owner of this phote can delete it",
        "statusCode": 400
      })
    }
  } else {
    res.json({
      "message": "Image couldn't be found",
      "statusCode": 404
    })
  }
})

module.exports = router;
