import actions from '../../actions';
import { connect } from 'react-redux';

const Game = ({ dispatch }) =>
  <div>
    <h2>Game</h2>
    <a href="#" onClick={e => dispatch({ type: actions.TILE_SELECT, payload: e }) }>Clicky</a>
  </div>;

export default connect(state => ({
  board: state.data.board,
}))(Game);
