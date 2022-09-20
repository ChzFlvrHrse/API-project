import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events';
import EventRoll from '../EventRoll';
import './Events.css'

function Events() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.Events)

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [dispatch])

  if (!events) return null

  return (
    <div id='events'>
      {events.map(event => (
        <EventRoll event={event} key={event.id}/>
      ))}
    </div>
  )
}

export default Events;
