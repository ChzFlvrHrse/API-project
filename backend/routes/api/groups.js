const express = require('express');
const router = express.Router();

const { User, Group, Image, Venue, Event, Membership } = require('../../db/models');

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
  res.json({ Groups: organizedGroups });
});

router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;

  const groupById = await Group.findByPk(groupId);

  if (groupById) {
    res.json(groupById)
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.post('/', async (req, res) => {
  const { name, about, type, private, city, state } = req.body;
  const userId = req.user.dataValues.id


  const newGroup = await Group.create({ organizerId: userId, name, about, type, private, city, state });


  if (newGroup) {
    res.json(newGroup)
  } else {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        name: "Name must be 60 characters or less",
        about: "About must be 50 characters or more",
        type: "Type must be 'Online' or 'In person'",
        city: "City is required",
        state: "State is required"
      }
    })
  }
});

router.post('/:groupId/images', async (req, res) => {
  const { groupId } = req.params;
  const { url } = req.body;

  const groupById = await Group.findByPk(groupId);

  const newImage = await Image.create({ imageableId: Number(groupId), url });

  if (groupById) {
    res.json(newImage)
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.put('/:groupId', async (req, res) => {
  console.log(req.params)
  const { groupId } = req.params;
  const { name, about, type, private, city, state } = req.body;

  const updateById = await Group.findByPk(groupId);

  const groupUpdate = updateById.set({
    name,
    about,
    type,
    private,
    city,
    state
  });

  if (!updateById) {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  } else if (groupUpdate) {
    await groupUpdate.save();
    res.json(groupUpdate)
  } else {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        name: "Name must be 60 characters or less",
        about: "About must be 50 characters or more",
        type: "Type must be 'Online' or 'In person'",
        city: "City is required",
        state: "State is required"
      }
    })
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
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
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
  const newVenue = await Venue.create({ groupId: Number(groupId), address, city, state, lat, lng });

  if (!byGroupId) {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  } else if (newVenue) {
    res.json(newVenue)
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

router.get('/:groupId/events', async (req, res) => {
  const { groupId } = req.params

  const byGroupId = await Group.findByPk(groupId)

  const byEventId = await Event.findAll({
    where: { groupId },
    attributes: { exclude: ['description', 'capacity', 'price'] },
    include: [{ model: Group, attributes: ['id', 'name', 'city', 'state'] }, { model: Venue, attributes: ['id', 'city', 'state'] }]
  })

  if (byGroupId) {
    res.json({ Events: byEventId })
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.post('/:groupId/events', async (req, res) => {
  const { groupId } = req.params;
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
  console.log(req.body)

  const byGroupId = await Group.findByPk(groupId);

  const newEvent = await Event.create({ groupId: Number(groupId), venueId, name, type, capacity, price, description, startDate, endDate });

  if (!byGroupId) {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  } if (newEvent) {
    res.json(newEvent);
  } else {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        venueId: "Venue does not exist",
        name: "Name must be at least 5 characters",
        type: "Type must be online or In person",
        capacity: "Capacity must be an integer",
        price: "Price is invalid",
        description: "Description is required",
        startDate: "Start date must be in the future",
        endDate: "End date is less than start date"
      }
    })
  }
});

router.get('/:groupId/members', async (req, res) => {
  const { groupId } = req.params;
  const { user } = req
  const userId = user.dataValues.id

  const findGroup = await Group.findByPk(groupId)


  if (findGroup) {

    const allGroupMembers = await User.findAll({
      attributes: { exclude: 'id' },
      include: [{ model: Membership, attributes: ['status'], where: { groupId } }]
    });

    let coHost;
    for (let co of allGroupMembers) {
      if (co.Memberships[0].status === 'co-host') {
        if (co.id === userId) {
          coHost = true;
        }
      }
    }

    if (userId !== findGroup.dataValues.organizerId && !coHost) {
      const allGroupMembers = await User.findAll({
        attributes: { exclude: ['id', 'email'] },
        include: [{ model: Membership, attributes: ['status'], where: { groupId } }]
      });

      let membershipStatusCheck = [];

      for (let member of allGroupMembers) {
        if (member.Memberships[0].status !== 'pending') {
          membershipStatusCheck.push(member)
        }
      }

      res.json({ Members: membershipStatusCheck });
    } else {

      const allGroupMembers = await User.findAll({
        attributes: { exclude: ['id', 'email'] },
        include: [{ model: Membership, attributes: ['status'], where: { groupId } }]
      });

      res.json({ Members: allGroupMembers });
    }
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.post('/:groupId/membership', async (req, res) => {
  const { user } = req
  const userId = user.dataValues.id;

  const { groupId } = req.params;

  const groupById = await Group.findByPk(groupId)
  const member = await Membership.findOne({where: {userId}})

  if (groupById) {
    if (member) {
      res.json({
        message: "Membership has already been requested or granted",
        statusCode: 400
      })
    } else {
      const membershipReq = await Membership.create({ groupId, userId, status: 'pending' });
      res.json(membershipReq)
    }
  } else {
    res.json({
      message: "Group couldn't be found",
      statusCode: 404
    })
  }
});

router.put('/:groupId/membership', async (req, res) => {
  const { groupId } = req.params;
  const { user } = req;
  const userId = user.dataValues.id

  const updateMembership = await Membership.findOne({where: {groupId}});


})

module.exports = router
