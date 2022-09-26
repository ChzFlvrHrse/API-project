import { Link } from 'react-router-dom';

import './EventRoll.css'

function EventRoll({ event }) {

  if (!event) return null

  let icon;
  let location;
  let image;

  if (event.type === 'Online') {
    icon = <i className="fa-solid fa-video"></i>;
  }

  if (event.state && event.city) {
    location = `${event.city}, ${event.state}`
  }

  if (event.previewImage) {
    image = event.previewImage;
  } else {
    image = 'https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg'
  }

  let date = event.startDate

  const convertDate = (date) => {
    const dateInfo = { year: "numeric", month: "long", day: "numeric"};
    return new Date(date).toLocaleDateString(undefined, dateInfo)
  }

  return (
    <>
      <div className='events-container'>
        <div className='inner-container'>
          <Link exact to={`/events/${event.id}`}>
            <div className='image-container'>
              <img className='prevImg' src={image} />
              <h5 className='h5'>{icon}{event.type}{' Event'}</h5>
            </div>
          </Link>
          <Link exact to={`/events/${event.id}`}>
            <div className='event-roll-container'>
              <div className='date'>
                {convertDate(date)}
              </div>
              <div className='event-name'>
                {event.name}
              </div>
              <div className='location'>
                {location}
              </div>
              <div className='attendees'>
                {event.numAttending >= 1 ? event.numAttending : 0}{' attendees'}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default EventRoll;
