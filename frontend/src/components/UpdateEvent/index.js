import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateEventThunk, getEventsThunk } from "../../store/events";

function UpdateEvent() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  const events = useSelector(state => state.events.Events)
  const targetedEvent = events?.find(one => one.id === +eventId)
  const sessionUser = useSelector(state => state.session.user);

  const numberValidation = new RegExp('^[0-9]*$');
  const priceValidation = new RegExp(/\d+(?:[.,]\d{0,2})?/);

  if(targetedEvent) {
    localStorage.setItem('venueId', targetedEvent.venueId)
    localStorage.setItem('description', targetedEvent.description)
    localStorage.setItem('name', targetedEvent.name)
    localStorage.setItem('type', targetedEvent.type)
    localStorage.setItem('capacity', targetedEvent.capacity)
    localStorage.setItem('price', targetedEvent.price)
    localStorage.setItem('startDate', targetedEvent.startDate)
    localStorage.setItem('endDate', targetedEvent.endDate)
    localStorage.setItem('previewImg', targetedEvent.previewImage)
  }


  useEffect(() => {
    dispatch(getEventsThunk())
  }, [dispatch])

  const [venueId, setVenueId] = useState(localStorage.getItem('venueId'));
  const [name, setName] = useState(localStorage.getItem('name'));
  const [type, setType] = useState(localStorage.getItem('type'))
  const [capacity, setCapacity] = useState(localStorage.getItem('capacity'));
  const [price, setPrice] = useState(localStorage.getItem('price'));
  const [description, setDescription] = useState(localStorage.getItem('description'));
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate'));
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate'));
  const [previewImg, setPreviewImg] = useState(localStorage.getItem('previewImg') === 'undefined' ? '' : localStorage.getItem('previewImg'));
  const [errorValidation, setErrorValidations] = useState([]);

  useEffect(() => {
    let errors = []

    if (name.length <= 4) errors.push('Name must be greater than 4 characters');
    if (name.length > 60) errors.push('Name must be less than 60 characters');
    if (type !== 'In person' && type !== 'Online') errors.push('Type must be In person or Online');
    if (!capacity) errors.push('Capacity is required')
    if (!numberValidation.test(capacity)) errors.push('Capacity must be a number')
    if (!price || price < 0) errors.push('Price is required');
    if (!priceValidation.test(price)) errors.push('Price must be a number')
    if (description.length < 0) errors.push('Description must be more than 0 characters');
    if (description.length > 1000) errors.push('Description must less than 1000 characters')
    if (!startDate) errors.push("Start date is required")
    if (!endDate) errors.push("End date is required")
    if (previewImg.length > 1000) errors.push('Preview image must be less than 1000 charcters');
    if ((new Date().getTime() >= new Date(startDate))) errors.push('Event must occur in the future')
    if ((new Date(endDate) - new Date(startDate)) < 0) errors.push('End date must occur after the start date')

    setErrorValidations(errors)
  }, [venueId, name, type, capacity, price, description, startDate, endDate, previewImg]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      name,
      type,
      capacity: Number(capacity),
      price: Number(price),
      description,
      startDate,
      endDate,
      venueId,
      previewImg,
      user: sessionUser
    }

    await dispatch(updateEventThunk(updatedEvent, eventId))
    // console.log(eventId)
    history.push(`/events/${eventId}`)
  }

  if(!sessionUser) {
    history.push('/')
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
            onChange={event => setCapacity(event.target.value)}
            value={capacity}
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
            type='date'
            onChange={event => setStartDate(event.target.value)}
            value={startDate}
          >
          </input>
        </label>
        <label>
          End Date:
          <input
            type='date'
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
        <button
        type='submit'
        disabled={errorValidation.length > 0 ? true: false}
        >Update Event</button>
      </form>
    </div>
  )
}

export default UpdateEvent;
