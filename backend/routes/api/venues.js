const express = require('express');
const router = express.Router();

const { Venue, User, Membership, Group } = require('../../db/models');

router.put('/:venueId', async (req, res) => {
  const { venueId } = req.params
  const { address, city, state, lat, lng } = req.body
  const { user } = req;
  const currUserId = user.dataValues.id;

  const venueById = await Venue.findByPk(venueId);

  if (venueById && (groupById.organizerId === currUserId || coHost)) {
    const groupId = venueById.groupId;
    const groupById = await Group.findOne({ where: { id: groupId } })

    const userMember = await User.findAll({
      include: [{ model: Membership, where: { groupId } }]
    })
    let coHost;
    for (let co of userMember) {
      if (co.id === currUserId && co.Memberships[0].status === 'co-host') {
        coHost = true;
      }
    }

    const updateVenue = venueById.set({ address, city, state, lat, lng })
    await updateVenue.save();
    res.json(updateVenue)
  } else if (!venueById) {
    res.status(404);
    res.json({
      message: "Venue couldn't be found",
      statusCode: 404
    })
  } else {
    res.status(400)
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
