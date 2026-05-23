/**
 * Character Registry
 *
 * To add a new character:
 *   1. Create /public/assets/{character-id}/image.png
 *   2. Create /public/assets/{character-id}/{region_mask}.png
 *   3. Add a config file at data/characters/{id}.js
 *   4. Import and add it here.
 */
import tom       from './tom';
import spongebob from './spongebob';
import doraemon  from './doraemon';
import pikachu   from './pikachu';
import elmo      from './elmo';
import shrek     from './shrek';
import winnie    from './winnie';
import mickey    from './mickey';
import bart      from './bart';
import totoro    from './totoro';

const CHARACTERS = [
  tom,
  spongebob,
  doraemon,
  pikachu,
  elmo,
  shrek,
  winnie,
  mickey,
  bart,
  totoro,
];

export default CHARACTERS;