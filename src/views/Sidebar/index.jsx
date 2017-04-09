import actions from '../../actions';
import { connect } from 'react-redux';

const Sidebar = ({ dispatch, score }) =>
  <aside>
    <div>
      { Object.keys(score.calculatedTally).sort().map((item, i) => 
        {
          const details = score.calculatedTally[item];
          return <p key={i}>{item}: Quantity: {details.quantity} Total: {details.total}</p>
        }
      )}
    </div>
    <p>Bonuses: {score.bonusTotal}</p>
    <p>Pretotal: {score.preTotal}</p>
    <p>Total: {score.total}</p>
    <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RESET })}>Reset game</a></p>
  </aside>;

export default connect(state => ({
  score: state.data.score
}))(Sidebar);
