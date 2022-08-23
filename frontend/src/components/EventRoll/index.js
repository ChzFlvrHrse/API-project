import { Link } from 'react-router-dom';

import './EventRoll.css'

function EventRoll({event}) {

  if (!event) return null

  return (
    <div className='event-roll-container'>
      <div>
        {event.name}
      </div>
      <div>
        {event.type}
      </div>
      <div>
        <Link to={`/events/${event.id}`}>View Event</Link>
      </div>
    </div>
  )
}

export default EventRoll;
