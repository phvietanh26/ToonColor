/**
 * Character: Shrek
 *
 * Assets expected in /public/assets/shrek/
 *   image.png      — character artwork
 *   skin_mask.png  — white=recolorable skin, black=untouched
 */
export default {
  id: 'shrek',
  character: 'Shrek',
  show: 'Shrek (2001)',
  regions: [
    {
      part: 'Skin',
      mask: 'skin_mask.png',
      hint: 'Màu xanh lá đặc trưng của Shrek',
      answer: { h: 95, s: 52, b: 65 },
    },
  ],
};