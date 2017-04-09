import actions from '../../actions';

const Tile = ({ dispatch, tile, position }) =>
  <a onClick={() => dispatch({ type: actions.TILE_SELECT, payload: { tile: tile, ...position }}) }>
    {tile}
  </a>;

export default Tile;
