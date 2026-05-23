/**
 * Character: Elmo
 *
 * Assets expected in /public/assets/elmo/
 *   image.png     — character artwork
 *   fur_mask.png  — white=recolorable fur, black=untouched
 */
export default {
  id: 'elmo',
  character: 'Elmo',
  show: 'Sesame Street (1969)',
  regions: [
    {
      part: 'Fur',
      mask: 'fur_mask.png',
      hint: 'Màu đỏ rực của Elmo',
      answer: { h: 4, s: 90, b: 88 },
    },
  ],
};