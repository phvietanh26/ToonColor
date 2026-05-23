/**
 * ToonColor Question Bank
 *
 * Questions are auto-generated from the character registry.
 * Each character region becomes one question.
 *
 * Asset convention:
 *   /public/assets/{character.id}/image.png      — character artwork
 *   /public/assets/{character.id}/{region.mask}  — grayscale mask
 *     white pixel = recolorable region
 *     black pixel = untouched region
 *
 * To add a new character → see data/characters/index.js
 */
import CHARACTERS from './characters/index';

let _id = 1;

export const ALL_QUESTIONS = CHARACTERS.flatMap((char) =>
  char.regions.map((region) => ({
    id: _id++,
    character:  char.character,
    show:       char.show,
    part:       region.part,
    image_url:  `/assets/${char.id}/image.png`,
    mask_url:   `/assets/${char.id}/${region.mask}`,
    hint:       region.hint,
    answer:     region.answer,
  }))
);

/** Pick `count` random questions for a game set (default 5). */
export function getRandomSet(count = 5) {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}