import {
  prop
} from 'ramda';
import actions from '../actions';

const init = {
  board: []
};

export default (state = init, action) => {
  
  switch (action.type) {
    case actions.TILE_SELECT:
      console.log(action);
      return state;

    default:
      return state;
  }
};
