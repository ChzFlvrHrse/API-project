import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events';

function Events() {
  const dispatch = useDispatch();
  const events = useSelector(state => Object.values(state.events))
  console.log(events)

  useEffect(() => {
    dispatch(getEventsThunk(events))
  }, [dispatch])

  if (!events) return null

  return (
    <div>
      {events.map(event => (
        <li key={event.id}>
          {event}
        </li>
      ))}
    </div>
  )
}

export default Events;
