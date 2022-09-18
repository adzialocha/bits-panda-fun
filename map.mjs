import chalk from 'chalk';
import { makeNoise2D } from 'open-simplex-noise';

const TILES = [
  {
    label: '🌲',
    color: '#008800',
  },
  {
    label: '🌳',
    color: '#008800',
  },
  {
    label: '🟩',
    color: '#009900',
  },
  {
    label: '🟦',
    color: '#1111aa',
  },
];

function valueToTile(value) {
  const step = 1 / TILES.length;
  const index = Math.floor(value / step);
  return TILES[index];
}

export function generateMap(seed, dimension) {
  const map = [];

  // Generate OpenSimplex noise (n-dimensional gradient noise)
  const noise = makeNoise2D(seed);

  // Take values from generated noise and build an 2d array out of it based on
  // the given map dimension
  for (let x = 0; x < dimension; x++) {
    const row = [];

    for (let y = 0; y < dimension; y++) {
      // Get noise value and normalize it to 0.0-1.0 range
      const value = (noise(x, y) + 1) / 2;

      // Get regarding map "tile" for this value
      const tile = valueToTile(value);

      // Add tile to map at this position
      row.push(tile);
    }

    map.push(row);
  }

  return map;
}

export function printMap(map) {
  const dimension = map.length;

  for (let x = 0; x < dimension; x++) {
    const row = [];

    for (let y = 0; y < dimension; y++) {
      const tile = map[x][y];

      const str = tile.color
        ? chalk.bgHex(tile.color).hex(tile.color)(tile.label)
        : tile.label;

      row.push(str);
    }

    console.log(row.join(''));
  }
}
