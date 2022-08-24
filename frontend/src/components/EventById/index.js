import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getEventsThunk, deleteEventThunk } from "../../store/events";

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

  const targetEvent = events.find(event=>event.id.toString() === params.id)

  return (
    <>
      <div>{targetEvent?.name}</div>
      {user?.id === targetEvent?.Group?.organizerId ? <button onClick={handleDelete}>Delete Event</button>:<></>}
      {user?.id === targetEvent?.Group?.organizerId ? <button onClick={handleUpdate}>Update Event</button>:<></>}
    </>
  )
}

export default EventById;
