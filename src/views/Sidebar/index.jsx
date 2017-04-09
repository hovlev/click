import actions from '../../actions';
import { connect } from 'react-redux';

const ScoreTable = ({score}) => 
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
          return <tr>
            <td className={`class_${item}`}>{item}</td>
            <td>{details.quantity}</td>
            <td>{details.total}</td>
          </tr>;
        }
      )}
    </tbody>
  </table>;

const Sidebar = ({ dispatch, score }) =>
  <aside>
    {score.total ? <ScoreTable score={score} /> : ''}
    <p>Bonuses: {score.bonusTotal}</p>
    <p>Pretotal: {score.preTotal}</p>
    <p>Total: {score.total}</p>
    <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RESET })}>Reset game</a></p>
  </aside>;

export default connect(state => ({
  score: state.data.score
}))(Sidebar);
