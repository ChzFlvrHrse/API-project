const express = require('express');
const router = express.Router();

const { Group, Image, Venue, Event } = require('../../db/models');

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
  const byVenueId =

  if (!byEventId) {
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  } else if () {

  } else if (! await byEventId.set({ groupId: Number(eventId), venueId, name, type, capacity, price, description, startDate, endDate })) {
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
})

module.exports = router;
