import { csrfFetch } from './csrf';

const GET_EVENT = 'events/getEvents';
const NEW_EVENT = 'events/newEvent';

const getAllEvents = (events) => {
  return {
    type: GET_EVENT,
    events
  }
};

const newEvent = (event) => {
  return {
    type: NEW_EVENT,
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
};

export const newEventThunk = (event, groupId) => async dispatch => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  });

  if (response.ok) {
    const newEvent = await response.json();
    dispatch(newEvent(newEvent))
    return newEvent
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_EVENT:
      newState = {...action.events};
      return newState;
    case NEW_EVENT:
      let newEvent = {...action.event}
      newState = { ...state, ...newEvent}
    default:
      return state
  }
}

export default eventsReducer
