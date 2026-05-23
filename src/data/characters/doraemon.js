/**
 * Character: Doraemon
 *
 * Assets expected in /public/assets/doraemon/
 *   image.png      — character artwork
 *   body_mask.png  — white=recolorable body, black=untouched
 */
export default {
  id: 'doraemon',
  character: 'Doraemon',
  show: 'Doraemon (1979)',
  regions: [
    {
      part: 'Body',
      mask: 'body_mask.png',
      hint: 'Màu xanh dương nổi bật của chú mèo máy',
      answer: { h: 195, s: 85, b: 88 },
    },
  ],
};