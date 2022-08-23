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

    const deleting = await dispatch(deleteEventThunk(params.id, user))
    history.push('/')
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
    </>
  )
}

export default EventById;
