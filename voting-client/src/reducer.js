import {fromJS} from 'immutable';

function vote(state, entry) {
  if (state.getIn(['vote', 'pair']).contains(entry))
    return state.set('hasVoted', entry)
  else return state;
}

function setState(oldState, newState) {
  const oldPair = oldState.getIn(['vote', 'pair']);
  const newPair = fromJS(newState).getIn(['vote', 'pair']);
  if (newPair && newPair.equals(oldPair)) {
    return oldState.merge(newState);
  }
  else {
    return oldState.merge(newState).delete('hasVoted');
  }
}

export default function reducer(state = fromJS({}), action) {
  switch(action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VOTE':
    return vote(state, action.entry);
  default:
    return state;
  }
}
