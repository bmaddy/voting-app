import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    })
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {pair: ['Trainspotting', '28 Days Later']},
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {pair: ['Trainspotting', '28 Days Later']},
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      },
      entries: []
    }));
  });

  it('sets an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

  it('selects winners when only one has a vote', () => {
    const state = fromJS({ entries: [],
      vote: {
        pair: [ 'Shallow Grave', 'Trainspotting' ],
        tally: { Trainspotting: 1 }
      }
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

  it('performs the last vote', () => {
    const state = fromJS({
      entries: [ '127 Hours' ],
      vote: {
        pair: [ 'Trainspotting', '28 Days Later' ],
        tally: { Trainspotting: 1 }
      }
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ['127 Hours', 'Trainspotting' ]
      }
    }));
  });
});
