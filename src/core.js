import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  return state.merge({
    vote: Map({pair: state.get('entries').take(2)}),
    entries: state.get('entries').skip(2)
  });
}
