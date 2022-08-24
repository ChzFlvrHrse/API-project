import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { newEventThunk } from "../../store/events";

function CreateEvent() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const [venueId, setVenueId] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('In person');
  const [numAttending, setNumAttending] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

    let errors = []

    const newEvent = {
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

    const createdEvent = await dispatch(newEventThunk(newEvent, groupId))
    if(createdEvent.errors) {
      const errList = Object.values(createdEvent.errors)
      const flatten = [...errList]
      flatten.map(e => errors.push(e.msg))
      setErrorValidations(errors)
    } else { history.push(`/events/${createdEvent.id}`)}
  }

  return (
    <div>
      <h2>New Event</h2>

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
            <option>In person</option>
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
        <button type='submit'>Create Event</button>
      </form>
    </div>
  )
}

export default CreateEvent;
