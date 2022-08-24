import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateEventThunk, getEventsThunk } from "../../store/events";

function UpdateEvent() {
  const { eventId } = useParams();

  const events = useSelector(state => state.events.Events)
  // console.log(events);

  // if (!events) return null;

  let event;
  events.forEach(e => {
    if (Number(eventId) === e.id) {
      event = e
    }
  })
  // console.log(event.description);

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const [venueId, setVenueId] = useState(event.venueId);
  const [name, setName] = useState(event.name);
  const [type, setType] = useState(event.type)
  const [numAttending, setNumAttending] = useState(event.numAttending);
  const [price, setPrice] = useState(event.price);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [previewImg, setPreviewImg] = useState('');
  const [errorValidation, setErrorValidations] = useState([]);

  useEffect(() => {
    let errors = []

    if (name.length > 60 || name.length === 0) errors.push('Name must be greater than 0 and less than 60 characters');
    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');
    if (!numAttending) errors.push('Capacity is required')
    if (!price || price < 0) errors.push('Price is required');
    if (description.length < 0 || description > 1000) errors.push('Description must be more than 0 and less than 1000 characters');
    if (!startDate) errors.push("Start date is required")
    if (!endDate) errors.push("End date is required")
    if (previewImg.length > 1000) errors.push('Preview image must be less than 1000 charcters');

    setErrorValidations(errors)
  }, [venueId, name, type, numAttending, price, description, startDate, endDate, previewImg]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    const updatedEvent = {
      name,
      type,
      capacity: Number(numAttending),
      price: Number(price),
      description,
      startDate,
      endDate,
      venueId,
      previewImg,
      user: sessionUser
    }

    const updateEvent = await dispatch(updateEventThunk(updatedEvent, eventId))
    if(updateEvent.errors) {
      const errList = Object.values(updateEvent.errors)
      const flatten = [...errList]
      flatten.map(e => errors.push(e.msg))
      setErrorValidations(errors)
    } else { history.push(`/events/${updateEvent.id}`)}
  }

  return (
    <div>
      <h2>Update Event</h2>

      <form
        onSubmit={handleOnSubmit}
      >
        <div >
            {errorValidation.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
        </div>
        <label>
          Name:
          <input
            type='text'
            onChange={event => setName(event.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          Description:
          <input
            type='text'
            onChange={event => setDescription(event.target.value)}
            value={description}
          >
          </input>
        </label>
        <label>
          Type:
          <select
            onChange={event => setType(event.target.value)}
            value={type}
          >
            <option>Online</option>
            <option>In Person</option>
          </select>
        </label>
        <label>
          Capacity:
          <input
            onChange={event => setNumAttending(event.target.value)}
            value={numAttending}
          >
          </input>
        </label>
        <label>
          Price:
          <input
            onChange={event => setPrice(event.target.value)}
            value={price}
          >
          </input>
        </label>
        <label>
          Start Date:
          <input
            onChange={event => setStartDate(event.target.value)}
            value={startDate}
          >
          </input>
        </label>
        <label>
          End Date:
          <input
            onChange={event => setEndDate(event.target.value)}
            value={endDate}
          >
          </input>
        </label>
        <label>
          Preview Image
          <input
            type='text'
            onChange={event => setPreviewImg(event.target.value)}
            value={previewImg}
          >
          </input>
        </label>
        <button type='submit'>Update Event</button>
      </form>
    </div>
  )
}

export default UpdateEvent;
