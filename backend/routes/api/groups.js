const express = require('express');
const router = express.Router();

const { User, Group, Image, Venue } = require('../../db/models');

router.get('/', async (req, res) => {
  const groups = await Group.findAll();
  if (groups) {
    res.json(groups)
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.get('/current', async (req, res) => {
  const organizerId = req.user.dataValues.id;

  const organizedGroups = await Group.findAll({
    include: User,
    where: { organizerId }
  });
  res.json({ Groups: organizedGroups});
});

router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;

  const groupById = await Group.findByPk(groupId);

  res.json(groupById)
});

router.post('/', async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const userId = req.user.dataValues.id

  const newGroup = await Group.create({organizerId: userId, name, about, type, private, city, state});

  res.json(newGroup)
});

router.post('/:groupId/images', async (req, res) => {
  const { groupId } = req.params;
  const { url } = req.body;

  const groupById = await Group.findByPk(groupId);

  const newImage = await Image.create({ imageableId: Number(groupId), url });

  res.json(newImage)
});

router.put('/:groupId', async (req, res) => {
  console.log(req.params)
  const { groupId } = req.params;
  const { name, about, type, private, city, state } = req.body;

  const updateById = await Group.findByPk(groupId);

  if (updateById) {
    updateById.set({
      name,
      about,
      type,
      private,
      city,
      state
    });
    await updateById.save();
    res.json(updateById)
  }
});

router.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params

  const deleteGroup = await Group.findByPk(groupId);

  if (deleteGroup) {
    await deleteGroup.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  }
});

router.get('/:groupId/venues', async (req, res) => {
  const { groupId } = req.params;

  const byGroupId = await Venue.findAll({
    where: { groupId }
  });

  if (byGroupId) {
    res.json({ Venues: byGroupId });
  } else {
      res.status(404);
      res.json({
        message: "Group couldn't be found",
        statusCode: 404
      })
  }
});

router.post('/:groupId/venues', async (req, res) => {
  const { groupId } = req.params
  const { address, city, state, lat, lng } = req.body;

  const byGroupId = await Group.findByPk(groupId);
  // console.log(byGroupId)

  if (byGroupId) {
    const newVenue = await Venue.create({ groupId: Number(groupId), address, city, state, lat, lng });
    res.json(newVenue);
  } else {
    res.status(400),
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid"
      }
    })
  }
});


module.exports = router
