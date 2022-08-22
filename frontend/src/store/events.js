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
    const events = response.json();
    dispatch(getAllEvents(events));
    return events;
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ:
      let newState = action.events;
      state = {...newState};
      return state;
    default:
      return state
  }
}

export default eventsReducer
