/**
 * Character: SpongeBob SquarePants
 *
 * Assets expected in /public/assets/spongebob/
 *   image.png      — character artwork
 *   body_mask.png  — white=recolorable body, black=untouched
 */
export default {
  id: 'spongebob',
  character: 'SpongeBob SquarePants',
  show: 'SpongeBob SquarePants (1999)',
  regions: [
    {
      part: 'Body',
      mask: 'body_mask.png',
      hint: 'Màu vàng đặc trưng của miếng bọt biển',
      answer: { h: 51, s: 100, b: 98 },
    },
  ],
};