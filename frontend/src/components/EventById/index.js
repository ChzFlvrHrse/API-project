import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getEventsThunk, deleteEventThunk } from "../../store/events";
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

  console.log(targetEvent)

  let image;
  let privacyStatus;

  if (targetEvent.Images[0] && targetEvent.Images[0].url !== '') {
    image = targetEvent.Images[0].url
  } else {
    image = 'https://www.travelandleisure.com/thmb/lZeCZo1hq_41edFv-hEop-VtQ-w=/1600x1200/smart/filters:no_upscale()/red-pink-orange-purple-sunset-WHYCOLORS1220-7684b47c858b4e1e9d73018e213c7ff3.jpg'
  }

  if (targetEvent.private) {
    privacyStatus = 'Private'
  } else {
    privacyStatus = 'Public'
  }

  return (
    <>
      <div className="event-details">
        <div className="details">
          <h3>{targetEvent.startDate}</h3>
          <h1>{targetEvent?.name}</h1>
          <h4>{"Host: "}{targetEvent.Group.name}</h4>
          <h4>{privacyStatus}{' Group'}</h4>
        </div>
        <div className="manipulate">
          <div className="delete-event">
            {user?.id === targetEvent?.Group?.organizerId ? <button onClick={handleDelete}>Delete Event</button> : <></>}
          </div>
          <div className="update-event">
            {user?.id === targetEvent?.Group?.organizerId ? <button onClick={handleUpdate}>Update Event</button> : <></>}
          </div>
        </div>
      </div>
      <div className="more-details">
        <div className="visuals">
          <img className='event-pic' src={image} />
          <h3>Details</h3>
          <p>{targetEvent.description}</p>
        </div>
      </div>
    </>
  )
}

export default EventById;
