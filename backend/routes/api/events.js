const express = require('express');
const router = express.Router();

const { Group, Image, Venue, Event, User, Attendance } = require('../../db/models');

router.get('/', async (req, res) => {
  const allEvents = await Event.findAll({
    attributes: { exclude: ['description', 'capacity', 'price'] },
    include: [{ model: Group, attributes: ['id', 'name', 'city', 'state'] }, { model: Venue, attributes: ['id', 'city', 'state'] }]
  })

  if (allEvents) {
    res.json({ Events: allEvents })
  }
});

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const byEventId = await Event.findByPk(eventId, {
    include: [
      { model: Group, attributes: { exclude: ['organizerId', 'about', 'type'] } },
      { model: Venue, attributes: { exclude: ['groupId'] } },
      { model: Image, attributes: { exclude: ['imageableType'] } }]
  })

  if (byEventId) {
    res.json(byEventId)
  } else {
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  }
});

router.post('/:eventId/images', async (req, res) => {
  const { eventId } = req.params
  const { url } = req.body;

  const byEventId = await Event.findByPk(eventId);

  if (!byEventId) {
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  } else {
    const newImage = await Image.create({ imageableId: Number(eventId), url })
    res.json(newImage)
  }
});

router.put('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

  const byEventId = await Event.findByPk(eventId);
  const byVenueId = await Venue.findByPk(eventId);

  if (!byEventId) {
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  } else if (!byVenueId) {
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404
    })
  } else if (!byEventId.set({ groupId: Number(eventId), venueId, name, type, capacity, price, description, startDate, endDate })) {
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
  } else {
    await byEventId.set({ groupId: Number(eventId), venueId, name, type, capacity, price, description, startDate, endDate });
    res.json(byEventId);
  }
});

router.delete('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const deleteEvent = await Event.findByPk(eventId);

  if (deleteEvent) {
    await deleteEvent.destroy();
    res.json({
      message: "Successfully deleted"
    })
  } else {
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
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

router.post('/:eventId/attendees', async (req, res) => {
  const { eventId } = req.params;
  const { user } = req;
  const userId = user.dataValues.id;

  const findEvent = await Event.findByPk(eventId);
  const userEvent = await User.findByPk(userId, {
    include: [{ model: Attendance, attributes: ['status'], where: { eventId } }]
  })

  if (findEvent) {
    if (!userEvent) {
      const newAttendee = await Attendance.create({ eventId, userId, status: 'pending' });
      res.json(newAttendee)
    } else if (userEvent.Attendances[0].status === 'pending') {
      res.json({
        "message": "Attendance has already been requested",
        "statusCode": 400
      })
    } else if (userEvent.Attendances[0].status !== 'pending') {
      res.json({
        "message": "User is already an attendee of the event",
        "statusCode": 400
      })
    }
  } else {
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

router.put('/:eventId/attendees', async (req, res) => {
  const { eventId } = req.params;
  const { userId, status } = req.body;

  const findEvent = await Event.findByPk(eventId);
  const userEvent = await User.findAll({
    include: [{ model: Attendance, where: { eventId } }]
  });


  let isAtt;
  for (let att of userEvent) {
    if (att.id === userId) {
      isAtt = true;
    }
  }

  if (findEvent) {
    if (status === 'pending') {
      res.json({
        "message": "Cannot change an attendance status to pending",
        "statusCode": 400
      })
    } else if (!isAtt) {
      res.json({
        "message": "Attendance between the user and the event does not exist",
        "statusCode": 404
      })
    } else {
      const newStatus = await Attendance.findOne({ where: { userId } });
      newStatus.set({ eventId: Number(eventId), userId, status });
      await newStatus.save()

      res.json(newStatus)
    }
  } else {
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

router.delete('/:eventId/attendees', async (req, res) => {
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
        res.json({
          "message": "Only the event organizer or membership owner can perform this action",
          "statusCode": 400
        })
      }
    } else {
      res.json({
        "message": "Attendance does not exist for this User",
        "statusCode": 404
      })
    }
  } else {
    res.json({
      "message": "Event couldn't be found",
      "statusCode": 404
    })
  }
});

module.exports = router;
