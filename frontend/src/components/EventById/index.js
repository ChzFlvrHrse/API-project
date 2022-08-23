
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventsThunk } from "../../store/events";

function EventById() {
  const dispatch = useDispatch()
  const params = useParams()
  const events = useSelector(state => state.events.Events)

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [dispatch]);

  if (!events) {
    return (
      <div>Loading</div>
    )
  }

  const targetEvent = events.find(event=>event.id.toString() === params.id)

  return (
    <>
      <div>{targetEvent?.name}</div>
    </>
  )
}

export default EventById;
