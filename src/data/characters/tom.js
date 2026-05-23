/**
 * Character: Tom (Tom & Jerry)
 *
 * Assets expected in /public/assets/tom/
 *   image.png     — character artwork
 *   fur_mask.png  — white=recolorable fur, black=untouched
 */
export default {
  id: 'tom',
  character: 'Tom (Tom & Jerry)',
  show: 'Tom and Jerry (1940)',
  // One entry per recolorable region on this character.
  // Each becomes one game question.
  regions: [
    {
      part: 'Fur',
      mask: 'fur_mask.png',
      hint: 'Màu xám xanh nhạt của mèo Tom',
      answer: { h: 210, s: 20, b: 68 },
    },
  ],
};