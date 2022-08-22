import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events';

function EventRoll({event}) {
  // const dispatch = useDispatch();
  // const events = useSelector(state => state.events.Events)

  // useEffect(() => {
  //   dispatch(getEventsThunk())
  // }, [dispatch])

  if (!event) return null

  // console.log('your events', events)
  // console.log(typeof events[0].Events)
  const handleShit = () => {
    console.log('I handled shit')
  }

  return (
    <div>
      {event.id}
     {event.name}
     {event.type}
     <button onClick={handleShit}>Click</button>
    </div>
  )
}

export default EventRoll;
