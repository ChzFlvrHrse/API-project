import { csrfFetch } from './csrf';

const READ = 'events/getEvents';

const getAllEvents = (events) => {
  return {
    type: READ,
    events
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

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case READ:
      newState = {...action.events};
      return newState;
    default:
      return state
  }
}

export default eventsReducer
