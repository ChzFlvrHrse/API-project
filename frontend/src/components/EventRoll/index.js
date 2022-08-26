import { Link } from 'react-router-dom';

import './EventRoll.css'

function EventRoll({ event }) {
  console.log(event);

  if (!event) return null

  let icon;
  let location;

  if (event.type === 'Online') {
    icon = <i className="fa-solid fa-video"></i>;
  }

  if (event.state && event.city) {
    location = `${event.city}, ${event.state}`
  }

  return (
    <>
      <div className='events-container'>
        <div className='inner-container'>
          <Link exact to={`/events/${event.id}`}>
            <div className='image-container'>
              <img className='prevImg' src={event.previewImage} />
              <h5>{icon}{event.type}{' Event'}</h5>
            </div>
          </Link>
          <Link exact to={`/events/${event.id}`}><div className='event-roll-container'>
            <div className='date'>
              {event.startDate}
            </div>
            <div className='event-name'>
              {event.name}
            </div>
            <div className='location'>
              {location}
            </div>
            <div className='attendees'>
              {event.numAttending}{' attendees'}
            </div>
            {/* <div>
              <Link exact to={`/events/${event.id}`}>View Event</Link>
            </div> */}
          </div>
          </Link>
        </div>

      </div>
    </>
  )
}

export default EventRoll;
