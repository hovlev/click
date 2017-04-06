import {
  prop
} from 'ramda';
import actions from '../actions';

const init = {
  
};

export default (state = init, action) => {
  
  switch (action.type) {
    case actions.TILE_SELECT:
      return state;

    default:
      return state;
  }
};
