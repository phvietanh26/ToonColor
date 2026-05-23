/**
 * Character: Mickey Mouse
 *
 * Assets expected in /public/assets/mickey/
 *   image.png       — character artwork
 *   pants_mask.png  — white=recolorable pants, black=untouched
 */
export default {
  id: 'mickey',
  character: 'Mickey Mouse',
  show: 'Mickey Mouse (1928)',
  regions: [
    {
      part: 'Pants',
      mask: 'pants_mask.png',
      hint: 'Màu đỏ của quần short Mickey',
      answer: { h: 355, s: 88, b: 78 },
    },
  ],
};