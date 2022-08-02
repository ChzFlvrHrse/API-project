const express = require('express');
const router = express.Router();

const { User, Group, Image, Venue } = require('../../db/models');

router.put('/:venueId', async (req, res) => {
  const { venueId } = req.params
  const { address, city, state, lat, lng } = req.body
  const userId = 

  const venueById = await Venue.findByPk(venueId);

  const updateVenue = venueById.set({ groupId: Number(venueId), address, city, state, lat, lng })

  if (!venueById) {
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404
    })
  } else if (updateVenue) {
    await updateVenue.save();
    res.json(updateVenue)
  } else {
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
})

module.exports = router
