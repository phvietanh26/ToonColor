/**
 * Character: Totoro
 *
 * Assets expected in /public/assets/totoro/
 *   image.png      — character artwork
 *   body_mask.png  — white=recolorable body, black=untouched
 */
export default {
  id: 'totoro',
  character: 'Totoro',
  show: 'My Neighbor Totoro (1988)',
  regions: [
    {
      part: 'Body',
      mask: 'body_mask.png',
      hint: 'Màu xám trắng của Totoro',
      answer: { h: 220, s: 8, b: 72 },
    },
  ],
};