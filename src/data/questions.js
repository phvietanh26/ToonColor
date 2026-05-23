/**
 * Question builder
 * ─────────────────────────────────────────────────────────────────────────────
 * Derives flat question objects from the character registry.
 * Each region on a character becomes one question.
 *
 * Asset convention:
 *   /public/assets/<character.id>/image.png
 *   /public/assets/<character.id>/<region.mask>
 *
 * The recolor engine (utils/recolor.js) handles the canvas tinting.
 * MaskedRecolorCanvas renders the result.
 */

import { CHARACTERS } from './registry';

let _questionId = 1;

export const ALL_QUESTIONS = CHARACTERS.flatMap((char) =>
  char.regions.map((region) => ({
    id: _questionId++,
    character: char.character,
    show: char.show,
    part: region.part,
    hint: region.hint,
    answer: region.answer,
    // Local asset paths served from /public/assets/
    image_url: `/assets/${char.id}/image.png`,
    mask_url:  `/assets/${char.id}/${region.mask}`,
  }))
);

/** Returns a random subset of `count` questions (default 5). */
export function getRandomSet(count = 5) {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}