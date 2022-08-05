const express = require('express');
const router = express.Router();

const { Group, Image, Venue, Event, User, Attendance, Membership } = require('../../db/models');

router.get('/', async (req, res) => {
  const allEvents = await Event.findAll({
    attributes: { exclude: ['description', 'capacity', 'price', 'previewImage'] },
    include: [
      { model: Image, attributes: { exclude: ['groupId', 'imageableType', 'createdAt', 'updatedAt'] } },
      { model: Group, attributes: ['id', 'name', 'city', 'state'] },
      { model: Venue, attributes: ['id', 'city', 'state'] }]
  })

  if (allEvents) {
    res.json({ Events: allEvents })
  }
});

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const byEventId = await Event.findByPk(eventId, {
    attributes: { exclude: ['previewImage'] },
    include: [
      { model: Group, attributes: { exclude: ['organizerId', 'about', 'type', 'createdAt', 'updatedAt', 'numMembers'] } },
      { model: Venue, attributes: { exclude: ['groupId', 'createdAt', 'updatedAt'] } },
      { model: Image, attributes: { exclude: ['groupId', 'imageableType', 'createdAt', 'updatedAt'] } }]
  })

  if (byEventId) {
    res.json({Events: byEventId})
  } else {
    res.status(404)
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  }
});

router.post('/:eventId/images', async (req, res) => {
  const { eventId } = req.params
  const { url } = req.body;
  const currUserId = req.user.dataValues.id;

  const byEventId = await Event.findByPk(eventId);

  if (byEventId) {
    const groupId = byEventId.groupId
    const byGroupId = await Group.findByPk(groupId)

    const allGroupMembers = await User.findAll({
      include: [{ model: Membership, attributes: ['status'], where: { groupId } }]
    });

    let attendee;
    for (let att of allGroupMembers) {
      if (att.id === currUserId && att.Memberships[0].status !== 'pending') {
        attendee = true;
      }
    }

    if (byGroupId.organizerId === currUserId || attendee) {
      const newImage = await Image.create({ eventId: Number(eventId), url })
      res.json(newImage);
    }
  } else {
    res.status(404)
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

router.put('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
  const currUserId = req.user.dataValues.id

  const byEventId = await Event.findByPk(eventId);
  const byVenueId = await Venue.findByPk(venueId);


  if (!byVenueId) {
    res.status(404);
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404
    })
  } else if (!byEventId) {
    res.status(404)
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  } else if (byEventId) {
    const groupId = byEventId.groupId;
    const byGroupId = await Group.findByPk(groupId);

    const userMember = await User.findAll({
      include: [{ model: Membership, where: { groupId } }]
    })

    let coHost;
    for (let co of userMember) {
      if (co.id === currUserId && co.Memberships[0].status === 'co-host') {
        coHost = true;
      }
    }

    if (byGroupId.organizerId === currUserId || coHost) {
      const updateEvent = byEventId.set({ groupId: Number(eventId), venueId, name, type, capacity, price, description, startDate, endDate });
      await updateEvent.save();

      const updatedEvent = await Event.findByPk(eventId, {
        attributes: { exclude: ['numAttending', 'previewImage'] }
      });
      res.json(updatedEvent);
    }
  } else {
    res.status(400)
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

router.delete('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const currUserId = req.user.dataValues.id

  const deleteEvent = await Event.findByPk(eventId);

  if (deleteEvent) {
    const groupId = deleteEvent.groupId;
    const byGroupId = await Group.findByPk(groupId);

    const userMember = await User.findAll({
      include: [{ model: Membership, where: { groupId } }]
    })

    let coHost;
    for (let co of userMember) {
      if (co.id === currUserId && co.Memberships[0].status === 'co-host') {
        coHost = true;
      }
    }

    if (byGroupId.organizerId === currUserId || coHost) {
      await deleteEvent.destroy();
      res.json({
        message: "Successfully deleted"
      })
    } else {
      res.status(400);
      res.json({
        message: "Only the organizer or co-host can perform this action"
      })
    }
  } else {
    res.status(404)
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  }
});

router.get('/:eventId/attendees', async (req, res) => {
  const { eventId } = req.params;
  const { user } = req;
  const currUserId = user.dataValues.id;

  const findEvent = await Event.findByPk(eventId);
  const findGroup = await Group.findByPk(currUserId)

  const Attendees = await User.findAll({
    include: [{ model: Attendance, where: { eventId }, attributes: ['status'] }]
  });

  if (findEvent) {
    let coHost;
    for (let att of Attendees) {
      if (att.Attendances[0].status === 'co-host') {
        if (att.id === currUserId) {
          coHost = true;
        }
      }
    }
    if (findGroup.organizerId === currUserId || coHost) {
      res.json({ Attendees })
    } else {
      let noPend = [];

      for (let att of Attendance) {
        if (att.Attendances[0].status !== 'pending') {
          noPend.push(att)
        }
      };

      res.json({ noPend })
    }
  } else {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

router.post('/:eventId/attendance', async (req, res) => {
  const { eventId } = req.params;
  const { user } = req;
  const userId = user.dataValues.id;

  const findEvent = await Event.findByPk(eventId);
  const userEvent = await User.findByPk(userId, {
    include: [{ model: Attendance, attributes: ['status'], where: { eventId } }]
  })

  if (findEvent) {
    if (!userEvent) {
      const newAttendee = await Attendance.create({ eventId: Number(eventId), userId, status: 'pending' });
      res.json(newAttendee)
    } else if (userEvent.Attendances[0].status === 'pending') {
      res.status(400)
      res.json({
        "message": "Attendance has already been requested",
        "statusCode": 400
      })
    } else {
      res.status(400)
      res.json({
        "message": "User is already an attendee of the event",
        "statusCode": 400
      })
    }
  } else {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

router.put('/:eventId/attendance', async (req, res) => {
  const { eventId } = req.params;
  const { userId, status } = req.body;
  const currUserId = req.user.dataValues.id;

  const findEvent = await Event.findByPk(eventId);

  if (findEvent) {

  }

  if (findEvent) {
    const groupId = findEvent.groupId;
    const byGroupId = await Group.findByPk(groupId);

    const userEvent = await User.findAll({
      include: [{ model: Attendance, where: { eventId } }]
    });

    let isAtt;
    for (let att of userEvent) {
      // console.log(att.id)
      if (att.id === currUserId && att.Attendances[0].status === 'co-host') {
        isAtt = true;
      }
    }

    if (status === 'pending') {
      res.status(400)
      res.json({
        "message": "Cannot change an attendance status to pending",
        "statusCode": 400
      })
    } else if (byGroupId.organizerId === currUserId || isAtt) {
      const newStatus = await Attendance.findOne({ where: { userId } });
      newStatus.set({ eventId: Number(eventId), userId, status });
      await newStatus.save()

      res.json(newStatus)
    } else {
      res.status(404)
      res.json({
        "message": "Attendance between the user and the event does not exist",
        "statusCode": 404
      })
    }
  } else {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
  res.json(userEvent)
});

router.delete('/:eventId/attendance', async (req, res) => {
  const { eventId } = req.params;
  const { user } = req
  const currUserId = user.dataValues.id;

  const findEvent = await Event.findByPk(eventId);
  const findAtt = await Attendance.findOne({
    where: { userId: currUserId }
  });
  const findGroup = await Group.findOne({ where: { organizerId: currUserId } });

  if (findEvent) {
    if (findAtt) {
      if (findGroup.organizerId === currUserId || findAtt.id === currUserId) {
        await findAtt.destroy();
        res.json({
          "message": "Successfully deleted attendance from event"
        })
      } else {
        res.status(400)
        res.json({
          "message": "Only the event organizer or membership owner can perform this action",
          "statusCode": 400
        })
      }
    } else {
      res.status(404)
      res.json({
        "message": "Attendance does not exist for this User",
        "statusCode": 404
      })
    }
  } else {
    res.status(404)
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

module.exports = router;
