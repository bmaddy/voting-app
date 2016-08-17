import {fromJS} from 'immutable';

export function reducer(state, action) {
  switch(action.type) {
  case 'SET_STATE':
    return fromJS(action.state);
  }
  return state;
}
