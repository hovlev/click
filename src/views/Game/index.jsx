import { connect } from 'react-redux';
import Board from './Board';

const Game = ({ dispatch, board }) =>
  <div>
    <Board board={board} dispatch={dispatch} />
  </div>;

export default connect(state => ({
  board: state.data.board,
}))(Game);
