import actions from '../../actions';
import { connect } from 'react-redux';

const Breakdown = ({ score }) => 
  <table className="scores">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      { Object.keys(score.calculatedTally).sort().map((item, i) => {
        const details = score.calculatedTally[item];
        return <tr key={i}>
          <td className={`item class_${item}`}>{item}</td>
          <td>{details.quantity}</td>
          <td>{details.total}</td>
        </tr>;
      })}
    </tbody>
  </table>;

const Score = ({ score }) =>
  <div>
    <p>Bonuses: { score.bonusTotal }</p>
    <p>Pretotal: { score.preTotal }</p>
    <p>Total: { score.total }</p>
  </div>;

const Controls = ({ dispatch }) =>
  <div>
    <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RESET })}>Reset game</a></p>
    <p><a href="#" onClick={() => dispatch({ type: actions.GAME_RANDOM })}>Random game</a></p>
  </div>;

const WonDialogue = ({ dispatch, noTilesLeft }) =>
  <div>
    {noTilesLeft ? <p className="won">You won! <a href="#" onClick={() => dispatch({ type: actions.GAME_RANDOM })}>Play again?</a></p> : ''}
  </div>;

const Sidebar = ({ dispatch, score, noTilesLeft }) =>
  <aside>
    <WonDialogue noTilesLeft={noTilesLeft} dispatch={dispatch} />
    {score.total ? <Breakdown score={score} /> : ''}
    <Score score={score} />
    <Controls dispatch={dispatch} />
  </aside>;

export default connect(state => ({
  noTilesLeft: state.data.noTilesLeft,
  score: state.data.score
}))(Sidebar);
