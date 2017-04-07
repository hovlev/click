import actions from '../../actions';

const Tile = ({ dispatch, tile, position }) =>
  <div>
    <p>
      <a href="#" onClick={() => dispatch({ type: actions.TILE_SELECT, payload: { tile: tile, ...position }}) }>
        {tile}
      </a>
    </p>
  </div>;

export default Tile;
