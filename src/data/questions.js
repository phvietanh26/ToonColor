// ToonColor Guess — Question Bank
// answer: { h: 0-360, s: 0-100, b: 0-100 }

export const ALL_QUESTIONS = [
  {
    id: 1,
    character: "SpongeBob SquarePants",
    show: "SpongeBob SquarePants (1999)",
    part: "Body",
    image_url: "https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg",
    hint: "Màu vàng đặc trưng của miếng bọt biển",
    answer: { h: 51, s: 100, b: 98 }
  },
  {
    id: 2,
    character: "Doraemon",
    show: "Doraemon (1979)",
    part: "Body",
    image_url: "https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png",
    hint: "Màu xanh dương nổi bật của chú mèo máy",
    answer: { h: 195, s: 85, b: 88 }
  },
  {
    id: 3,
    character: "Pikachu",
    show: "Pokémon (1997)",
    part: "Body",
    image_url: "https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png",
    hint: "Màu vàng tươi của Pikachu",
    answer: { h: 48, s: 95, b: 100 }
  },
  {
    id: 4,
    character: "Elmo",
    show: "Sesame Street (1969)",
    part: "Fur",
    image_url: "https://upload.wikimedia.org/wikipedia/en/7/74/Elmo_from_Sesame_Street.png",
    hint: "Màu đỏ rực của Elmo",
    answer: { h: 4, s: 90, b: 88 }
  },
  {
    id: 5,
    character: "Shrek",
    show: "Shrek (2001)",
    part: "Skin",
    image_url: "https://upload.wikimedia.org/wikipedia/en/8/8e/Shrek-DreamWorks.png",
    hint: "Màu xanh lá đặc trưng của Shrek",
    answer: { h: 95, s: 52, b: 65 }
  },
  {
    id: 6,
    character: "Winnie the Pooh",
    show: "Winnie the Pooh (1966)",
    part: "Body",
    image_url: "https://upload.wikimedia.org/wikipedia/en/1/10/Winnie_the_Pooh_Winnie_the_Pooh.jpg",
    hint: "Màu vàng cam của chú gấu Pooh",
    answer: { h: 38, s: 72, b: 92 }
  },
  {
    id: 7,
    character: "Mickey Mouse",
    show: "Mickey Mouse (1928)",
    part: "Pants",
    image_url: "https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png",
    hint: "Màu đỏ của quần short Mickey",
    answer: { h: 355, s: 88, b: 78 }
  },
  {
    id: 8,
    character: "Tom (Tom & Jerry)",
    show: "Tom and Jerry (1940)",
    part: "Fur",
    image_url: "https://upload.wikimedia.org/wikipedia/en/f/f8/Tom_Tom_and_Jerry.png",
    hint: "Màu xám xanh nhạt của mèo Tom",
    answer: { h: 210, s: 20, b: 68 }
  },
  {
    id: 9,
    character: "Bart Simpson",
    show: "The Simpsons (1989)",
    part: "Shirt",
    image_url: "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png",
    hint: "Màu đỏ cam của áo Bart Simpson",
    answer: { h: 15, s: 85, b: 90 }
  },
  {
    id: 10,
    character: "Totoro",
    show: "My Neighbor Totoro (1988)",
    part: "Body",
    image_url: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Totoro_and_Satsuki.png",
    hint: "Màu xám trắng của Totoro",
    answer: { h: 220, s: 8, b: 72 }
  }
];

// Pick 5 random questions for a set
export function getRandomSet() {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}