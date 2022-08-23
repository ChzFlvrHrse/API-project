import { csrfFetch } from './csrf';

const GET_GROUP = 'groups/getGroups';

const getAllGroups = (groups) => {
  return {
    type: GET_GROUP,
    groups
  }
};

export const getGroupsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/groups');

  if (response.ok) {
    const groups = await response.json();
    dispatch(getAllGroups(groups));
    return groups;
  }
};

const initialState = {};

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_GROUP:
      newState = {...state, entries: [...action.groups]};
      return newState;
    default:
      return state
  }
}

export default groupsReducer
