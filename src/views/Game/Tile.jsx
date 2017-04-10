import actions from '../../actions';

const Tile = ({ dispatch, tile, position }) =>
  <a className={`class_${tile}`} onClick={() => dispatch({ type: actions.TILE_SELECT, payload: { tile: tile, ...position } }) }>
    <span>{tile}</span>
  </a>;

export default Tile;
