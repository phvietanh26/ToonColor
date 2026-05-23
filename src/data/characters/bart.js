/**
 * Character: Bart Simpson
 *
 * Assets expected in /public/assets/bart/
 *   image.png       — character artwork
 *   shirt_mask.png  — white=recolorable shirt, black=untouched
 */
export default {
  id: 'bart',
  character: 'Bart Simpson',
  show: 'The Simpsons (1989)',
  regions: [
    {
      part: 'Shirt',
      mask: 'shirt_mask.png',
      hint: 'Màu đỏ cam của áo Bart Simpson',
      answer: { h: 15, s: 85, b: 90 },
    },
  ],
};