import actions from '../../actions';
import { connect } from 'react-redux';

const Score = ({score}) => 
  <table className="scores">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(score.calculatedTally).sort().map((item, i) =>
        {
          const details = score.calculatedTally[item];
          return <tr key={i}>
            <td className={`item class_${item}`}>{item}</td>
            <td>{details.quantity}</td>
            <td>{details.total}</td>
          </tr>;
        }
      )}
    </tbody>
  </table>;

const Sidebar = ({ dispatch, score }) =>
  <aside>
    <div>
      {score.total ? <Score score={score} /> : ''}
      <p>Bonuses: {score.bonusTotal}</p>
      <p>Pretotal: {score.preTotal}</p>
      <p>Total: {score.total}</p>
      <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RESET })}>Reset game</a></p>
      <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RANDOM })}>Random game</a></p>
    </div>
  </aside>;

export default connect(state => ({
  score: state.data.score
}))(Sidebar);
