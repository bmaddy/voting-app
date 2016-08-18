import {fromJS} from 'immutable';

export default socket => store => next => action => {
  console.log('action:', fromJS(action).toJS());
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}
