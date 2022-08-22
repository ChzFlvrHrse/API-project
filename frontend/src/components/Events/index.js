import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events';
import EventRoll from '../EventRoll';

function Events() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.Events)

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [dispatch])

  if (!events) return null

  console.log('your events', events)
  // console.log(typeof events[0].Events)
  return (
    <div>
      {events.map(event => (
        <EventRoll event={event} />
      ))}
    </div>
  )
}

export default Events;
