import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = {helloimstate: 'hello'}) => state
});

export default rootReducer;
