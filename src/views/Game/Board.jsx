import actions from '../../actions';
import Tile from './Tile';

const Board = ({ dispatch, board }) =>
  <table>
    <tbody>
      {board.map((row, i) =>
        <tr key={i}>
          {row.map((tile, j) => 
            <td key={j}>
              {tile ? <Tile dispatch={dispatch} tile={tile} position={ { x: j, y: i } } /> : ''}
            </td>
          )}
        </tr>
      )}
    </tbody>
  </table>;

export default Board;
