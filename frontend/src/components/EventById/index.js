import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventsThunk } from "../../store/events";

function EventById() {
  const params = useParams()
  const events = useSelector(state => state.events.Events)

  if (!events) {
    return (
      <div>Loading</div>
    )
  }

  const targetEvent = events.find(event=>event.id = params.id)

  return (
    <>
      <div>{targetEvent?.name}</div>
    </>
  )
}

export default EventById;
