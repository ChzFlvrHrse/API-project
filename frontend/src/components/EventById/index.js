import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getEventsThunk, deleteEventThunk } from "../../store/events";
import { csrfFetch } from "../../store/csrf";
import "./EventById.css";

function EventById() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const events = useSelector(state => state.events.Events)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault()
    history.push('/')
    const deleting = await dispatch(deleteEventThunk(params.id, user))
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    history.push(`/events/${params.id}/edit`)
  }

  if (!events) {
    return (
      <div>Loading</div>
    )
  }

  const targetEvent = events.find(event => event.id.toString() === params.id)

  // console.log(targetEvent)

  let image;
  let privacyStatus;

  if (targetEvent?.previewImage) {
    image = targetEvent.previewImage
  } else {
    image = 'https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg'
  }

  if (targetEvent?.Group.private) {
    privacyStatus = 'Private'
  } else {
    privacyStatus = 'Public'
  }

  return (
    <>
      <div className="entire">
        <div className="event-details">
          <div className="details">
            <h4 className="h4">{targetEvent?.startDate}</h4>
            <h1 className="h1">{targetEvent?.name}</h1>
            <h4 className="h4">{"Host By: "}{targetEvent?.Group.name}</h4>
            <h4 className="h4">{privacyStatus}{' Group'}</h4>
          </div>
          <div className="manipulate">
            <div className="delete-event">
              {user?.id === targetEvent?.Group?.organizerId ? <button className='butt-2' onClick={handleDelete}>Delete Event</button> : <></>}
            </div>
            <div className="update-event">
              {user?.id === targetEvent?.Group?.organizerId ? <button className='butt-2' onClick={handleUpdate}>Update Event</button> : <></>}
            </div>
          </div>
        </div>
        <div className="more-details">
          <div className="visuals">
            <img className='event-pic' src={image} />
            <h3>Details</h3>
            <p className="details">{targetEvent?.description}</p>
            <h3>Attendees</h3>
            {/* <div>{att()}</div> */}
          </div>
          <div className="visuals-2">
            <div className="small-image">
              <img src={image} />
              <div id='name-group'>
                <div className="group-name">
                  {targetEvent?.Group.name}
                </div>
                <div className="privacy">
                  {privacyStatus}{' Group'}
                </div>
              </div>
            </div>
            <div className="small-info">
              <div id='name-group'>
                <div className="group-name">
                  <i class="fa-solid fa-clock"></i>
                  {targetEvent?.startDate}{' to '}{targetEvent.endDate}
                </div>
                <div className="privacy-2">
                  <i class="fa-solid fa-location-dot"></i>
                  {targetEvent?.Group.city}{', '}{targetEvent.Group.state}
                </div>
              </div>
            </div>
            <div className='google-map'>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventById;
