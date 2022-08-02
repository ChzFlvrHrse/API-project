const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../utils/auth');

const { User, Group, Image } = require('../../db/models');
const group = require('../../db/models/group');

router.get('/', async (req, res) => {
  const groups = await Group.findAll();
  res.json(groups)
});

router.get('/current', restoreUser, async (req, res) => {
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
  const currentUserId = req.user.dataValues.id

  const newGroup = await Group.create({organizerId: currentUserId, name, about, type, private, city, state});

  res.json(newGroup)
});

router.post('/:groupId/images', async (req, res) => {
  const { groupId } = req.params;
  const { url } = req.body;

  const groupById = await Group.findByPk(groupId);

  const newImage = await Image.create({ imageableId: Number(groupId), url })

  res.json(newImage)
});

router.put('/:groupId', async (res, req) => {
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


module.exports = router
