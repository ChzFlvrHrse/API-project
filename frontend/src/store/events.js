import { csrfFetch } from './csrf';

const GET_EVENT = 'events/getEvents';
const NEW_EVENT = 'events/newEvent';
const DELETE_EVENT = 'events/delete'

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

const deleteEvent = (deleted) => {
  return {
    type: DELETE_EVENT,
    deleted
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
    const createdEvent = await response.json();
    dispatch(newEvent(createdEvent))
    return createdEvent
  }
}

export const deleteEventThunk = (id) => async dispatch => {
  const response = await csrfFetch(`/api/events/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const deleted = response.json();
    dispatch(deleteEvent(deleted))
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
      newState = { ...state, newEvent}
      return newState
    case DELETE_EVENT:
      newState = {...state}
    default:
      return state
  }
}

export default eventsReducer
