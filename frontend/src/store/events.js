import { csrfFetch } from './csrf';

const GET_EVENT = 'events/getEvents';
const GET_EVENT_ID = 'events/getEventId'

const getAllEvents = (events) => {
  return {
    type: GET_EVENT,
    events
  }
}

const getEventId = (event) => {
  return {
    type: GET_EVENT_ID,
    event
  }
}

export const getEventsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/events');

  if (response.ok) {
    const events = await response.json();
    dispatch(getAllEvents(events));
    return events;
  }
}

export const getEventIdThunk = (eventId) => async dispatch => {
  const response = await csrfFetch(`/api/events/${eventId}`);

  if (response.ok) {
    const event = await response.json();
    dispatch(getEventId(event));
    return event;
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_EVENT:
      newState = {...action.events};
      return newState;
    case GET_EVENT_ID:
      newState = {...action.event};
      return newState;
    default:
      return state
  }
}

export default eventsReducer
