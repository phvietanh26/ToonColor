/**
 * Character: Winnie the Pooh
 *
 * Assets expected in /public/assets/winnie/
 *   image.png      — character artwork
 *   body_mask.png  — white=recolorable body, black=untouched
 */
export default {
  id: 'winnie',
  character: 'Winnie the Pooh',
  show: 'Winnie the Pooh (1966)',
  regions: [
    {
      part: 'Body',
      mask: 'body_mask.png',
      hint: 'Màu vàng cam của chú gấu Pooh',
      answer: { h: 38, s: 72, b: 92 },
    },
  ],
};