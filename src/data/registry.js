/**
 * Character Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * To add a new character:
 *   1. Create /public/assets/<id>/image.png  (character art)
 *   2. Create /public/assets/<id>/<region>_mask.png  (white=recolorable)
 *   3. Create data/characters/<id>.js  (copy any existing one as template)
 *   4. Import and add it to the CHARACTERS array below.
 *
 * That's it — questions are auto-generated from the registry.
 */

import spongebob from './characters/spongebob';
import doraemon  from './characters/doraemon';
import pikachu   from './characters/pikachu';
import elmo      from './characters/elmo';
import shrek     from './characters/shrek';
import winnie    from './characters/winnie';
import mickey    from './characters/mickey';
import tom       from './characters/tom';
import bart      from './characters/bart';
import totoro    from './characters/totoro';

export const CHARACTERS = [
  spongebob,
  doraemon,
  pikachu,
  elmo,
  shrek,
  winnie,
  mickey,
  tom,
  bart,
  totoro,
];