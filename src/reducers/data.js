import { assoc, assocPath, merge, prop, update, pipe, nth } from 'ramda';
import actions from '../actions';

const init = {
  board: [],
  rules: {
    a: { score: 50, bonus: { toCollect: 3, bonus: 50 } },
    b: { score: 30, bonus: { toCollect: 2, bonus: 30 } },
    c: { score: 20 },
    d: { score: 15 },
    e: { score: 5 },
    f: { score: 4, bonus: { toCollect: 10, bonus: 23 } },
    g: { score: 3, bonus: { toCollect: 20, bonus: 2 } }
  },
  score: {}
};

export default (state = init, action) => {
  const payload = action.payload;
  switch (action.type) {
    case actions.TILE_SELECT:
      return merge(state, { // isNaN, if is not a number assume it is a wall
        board: update(
          payload.y, // update the specific y (row) index with the result of pipe
          pipe(
            prop('board'),
            nth(payload.y), // nth y (row) of the board
            update(payload.x, '') // clear the specific x (col) index in the y (row)
          )(state),
          prop('board', state)
        ),
        score: assoc(payload.tile, 5, prop('score', state))
      });
    case actions.BOARD_LOADED:
      return assoc('board', prop('board', action.payload), state);
    default:
      return state;

  }
};
