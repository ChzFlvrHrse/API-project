const express = require('express');
const router = express.Router();

const { Group, Image, Venue, Event } = require('../../db/models');

router.get('/', async (req, res) => {
  const allEvents = await Event.findAll({
    attributes: {exclude: ['description', 'capacity', 'price']},
    include: [{model: Group, attributes: ['id', 'name', 'city', 'state'] }, {model: Venue, attributes: ['id', 'city', 'state']}]
  })

  if (allEvents) {
    res.json({Events: allEvents})
  }
});

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const byEventId = await Event.findByPk(eventId, {
    include: [
      {model: Group, attributes: {exclude: ['organizerId', 'about', 'type']} },
      {model: Venue, attributes: {exclude: ['groupId']}},
      {model: Image, attributes: {exclude: ['imageableType']}}]
  })

  if (byEventId) {
    res.json(byEventId)
  } else {
    res.json({
      message: "Event couldn't be found",
      statusCode: 404
    })
  }
})

module.exports = router;
