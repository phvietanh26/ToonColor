/**
 * Character: Pikachu
 *
 * Assets expected in /public/assets/pikachu/
 *   image.png      — character artwork
 *   body_mask.png  — white=recolorable body, black=untouched
 */
export default {
  id: 'pikachu',
  character: 'Pikachu',
  show: 'Pokémon (1997)',
  regions: [
    {
      part: 'Body',
      mask: 'body_mask.png',
      hint: 'Màu vàng tươi của Pikachu',
      answer: { h: 48, s: 95, b: 100 },
    },
  ],
};