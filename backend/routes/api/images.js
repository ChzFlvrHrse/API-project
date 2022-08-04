const express = require('express');
const router = express.Router();

const { Image, Group } = require('../../db/models');


router.delete('/:imageId', async (req, res) => {
  const { imageId } = req.params;
  const { user } = req;
  const currUserId = user.dataValues.id;

  const findImage = await Image.findByPk(imageId);


  if (findImage) {
    const groupId = findImage.groupId
    const byGroupId = await Group.findByPk(groupId)
    if (byGroupId.organizerId === currUserId) {
      await findImage.destroy();
      res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    } else {
      res.status(400)
      res.json({
        "message": "Only the organizer can delete it",
        "statusCode": 400
      })
    }
  } else {
    res.status(404)
    res.json({
      "message": "Image couldn't be found",
      "statusCode": 404
    })
  }
  res.json(byGroupId);
});

module.exports = router;
