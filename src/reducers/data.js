import { add, assoc, assocPath, divide, fromPairs, map, merge, multiply, prop, reduce, update, path, pipe, toPairs, nth } from 'ramda';
import actions from '../actions';

const init = {
  board: [],
  cachedBoard: [],
  rules: {
    a: { score: 50, bonus: { toCollect: 3, total: 50 } },
    b: { score: 30, bonus: { toCollect: 2, total: 30 } },
    c: { score: 20 },
    d: { score: 15 },
    e: { score: 5 },
    f: { score: 4, bonus: { toCollect: 10, total: 23 } },
    g: { score: 3, bonus: { toCollect: 20, total: 2 } }
  },
  tally: {},
  score: {
    bonusTotal: 0,
    calculatedTally: {},
    preTotal: 0,
    total: 0
  }
};

const calculateScore = (state, totalTally) => {
  const totals = map(x => {
    const rule = path([ 'rules', nth(0, x) ], state);
    const multiplier = prop('score', rule);
    const tally = nth(1, x);
    const preTotal = multiply(multiplier, tally);
    const bonusCount = prop('bonus', rule) ? Math.floor(divide(tally, path([ 'bonus', 'toCollect' ], rule))) : 0;
    const bonusTotal = bonusCount ? multiply(bonusCount, path([ 'bonus', 'total' ], rule)) : 0;
    return [ nth(0, x), { bonusTotal: bonusTotal, preTotal: preTotal, quantity: tally, total: add(preTotal, bonusTotal) } ];
  }, toPairs(totalTally));
  const preTotal = reduce((accum, value) => add(accum, prop('preTotal', nth(1, value))), 0, totals);
  const bonusTotal = reduce((accum, value) => add(accum, prop('bonusTotal', nth(1, value))), 0, totals);
  const total = add(preTotal, bonusTotal);
  return merge(prop('score', state), {
    bonusTotal: bonusTotal,
    calculatedTally: fromPairs(totals),
    preTotal: preTotal,
    total: total
  });
};

export default (state = init, action) => {
  const payload = action.payload;
  switch (action.type) {
    case actions.TILE_SELECT:
      const currentTally = path([ 'tally', payload.tile ], state);
      const updatedTally = currentTally ? add(currentTally, 1) : 1;
      const totalTally = assoc(payload.tile, updatedTally, prop('tally', state));
      return merge(state, {
        board: update(
          payload.y, // update the specific y (row) index with the result of pipe
          pipe(
            prop('board'),
            nth(payload.y), // nth y (row) of the board
            update(payload.x, '') // clear the specific x (col) index in the y (row)
          )(state),
          prop('board', state)
        ),
        tally: totalTally,
        score: calculateScore(state, totalTally)
      });
    case actions.BOARD_LOADED:
      return merge(state, {
        board: prop('board', action.payload),
        cachedBoard: prop('board', action.payload)
      });
    case actions.GAME_RESET:
      return merge(state, {
        board: prop('cachedBoard', state),
        tally: prop('tally', init),
        score: prop('score', init)
      });
    default:
      return state;

  }
};
