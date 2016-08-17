import {fromJS} from 'immutable';

export default function reducer(state, action) {
  switch(action.type) {
  case 'SET_STATE':
    return fromJS(action.state);
  default:
    return state;
  }
}
