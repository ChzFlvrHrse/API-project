import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { newEventThunk } from "../../store/events";
import { Link } from "react-router-dom";
import "./CreateEvent.css"

function CreateEvent() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const [venueId, setVenueId] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [numAttending, setNumAttending] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [errorValidation, setErrorValidations] = useState([]);

  const numberValidation = new RegExp('^[0-9]*$')
  const priceValidation = new RegExp(/\d+(?:[.,]\d{0,2})?/)

  useEffect(() => {
    let errors = []

    if (name.length <= 4) errors.push('Name must be greater than 4 characters');
    if (name.length > 60) errors.push('Name must be less than 60 characters');

    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');

    if (!numAttending) errors.push('Capacity is required')
    if (!numberValidation.test(numAttending)) errors.push('Capacity must be a number')

    if (!price || price < 0) errors.push('Price is required');

    if (!priceValidation.test(price)) errors.push('Price must be a number')

    if (!description.length) errors.push('Description must be more than 0 characters');
    if (description.length > 1000) errors.push('Description must less than 1000 characters')

    if (!startDate) errors.push("Start date is required")
    if (!endDate) errors.push("End date is required")

    // if (image.length > 1000) errors.push('Preview image must be less than 1000 charcters');

    if (new Date().getTime() >= new Date(startDate)) errors.push('Event must occur in the future')
    if ((new Date(endDate) - new Date(startDate)) < 0) errors.push('End date must occur after the start date')

    setErrorValidations(errors)
  }, [venueId, name, type, numAttending, price, description, startDate, endDate, image]);

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
      image,
      user: sessionUser
    }

    const createdEvent = await dispatch(newEventThunk(newEvent, groupId))

    history.push(`/events`)
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  if (!sessionUser) {
    return (
      <div>You are not authorized to access this page. <Link to='/login'>Click here to login</Link></div>
    )
  }

  return (
    <>
      <div>
        <h1 className="new-event">Create Your New Event!</h1>
      </div>

      <div className="event-errors">
        {errorValidation.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="event-form">

        <form
          onSubmit={handleOnSubmit}
        >
          <label>
            Name:
          </label>
          <input
            type='text'
            onChange={event => setName(event.target.value)}
            value={name}
          ></input>
          <label>
            Description:
          </label>
          <textarea
            type='text'
            onChange={event => setDescription(event.target.value)}
            value={description}
            placeholder='Describe your event here!'
            rows='5'
            cols='40'
          >
          </textarea>
          <label>
            Type:
          </label>
          <select
            onChange={event => setType(event.target.value)}
            value={type}
          >
            <option>Event Type</option>
            <option>Online</option>
            <option>In person</option>
          </select>
          <label>
            Capacity:
          </label>
          <input
            onChange={event => setNumAttending(event.target.value)}
            value={numAttending}
          >
          </input>
          <label>
            Price:
          </label>
          <input
            onChange={event => setPrice(event.target.value)}
            value={price}
          >
          </input>
          <label>
            Start Date:
          </label>
          <input
            type='date'
            onChange={event => setStartDate(event.target.value)}
            value={startDate}
          >
          </input>
          <label>
            End Date:
          </label>
          <input
            type='date'
            onChange={event => setEndDate(event.target.value)}
            value={endDate}
          >
          </input>
          <label>
            Preview Image (Optional):
          </label>
          <input
            type='file'
            className="aws"
            onChange={updateFile}
            // value={image}
          >
          </input>
          <button
            type='submit'
            className="create-button"
            disabled={errorValidation.length > 0}
          >Create Event</button>
        </form>
      </div>
    </>

  )
}

export default CreateEvent;
