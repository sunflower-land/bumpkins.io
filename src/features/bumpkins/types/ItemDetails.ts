import { BumpkinItem, BumpkinPart } from "features/bumpkins/types/Items";

type ItemDetails = {
  description: string;
  part: BumpkinPart;
  boosts?: string[];
};

export const DETAILS: Record<BumpkinItem, ItemDetails> = {
  "Beige Farmer Potion": {
    description:
      "An ancient potion of beige goodness. Consuming this potion transforms your Bumpkin's colour.",
    part: "body",
  },
  "Light Brown Farmer Potion": {
    description:
      "A mixture of sunflower and gold. Consuming this potion transforms your Bumpkin's colour.",
    part: "body",
  },
  "Dark Brown Farmer Potion": {
    description:
      "A traditional recipe passed down from Bumpkin Ancestors. Consuming this potion transforms your Bumpkin's colour.",
    part: "body",
  },
  "Goblin Potion": {
    description:
      "A recipe crafted during the Great Goblin War. Consuming this potion turns your Bumpkin into a Goblin",
    part: "body",
  },
  "Basic Hair": {
    description:
      "Nothing says Bumpkin like this Basic Hair. This mop of hair is a signal of a true Bumpkin.",
    part: "hair",
  },
  "Rancher Hair": {
    description:
      "Bright and orange! You can spot this hair piece a mile away in the fields.",
    part: "hair",
  },
  "Explorer Hair": {
    description:
      "This cut never goes out of style. Plenty of room to store extra seeds while farming.",
    part: "hair",
  },
  "Buzz Cut": {
    description: "Short, simple & easy maintenance. More time for farming!",
    part: "hair",
  },
  "Parlour Hair": {
    description: "There is enough hair spray in here to last a year.",
    part: "hair",
  },
  "Sun Spots": {
    description:
      "Long days in the field and the blaring sun. The sign of a true worker.",
    part: "hair",
  },
  "Red Farmer Shirt": {
    description:
      "The Basic Bumpkin must-have. Nothing blends in the crowd quite like this red farmer shirt.",
    part: "shirt",
  },
  "Yellow Farmer Shirt": {
    description:
      "The colour of happiness, warmth and sunflowers! A beloved shirt amongst all farmers.",
    part: "shirt",
  },
  "Blue Farmer Shirt": {
    description:
      "Getting down to business? This is a mark of a trained and focussed farmer.",
    part: "shirt",
  },
  "Chef Apron": {
    description:
      "If you are baking cakes don't forget your Apron! The mark of a true baker.",
    part: "coat",
    boosts: ["Bonus 20% SFL when selling cakes"],
  },
  "Warrior Shirt": {
    description:
      "The mark of a warrior who survived the Goblin War. This shirt commands respect amongst the Sunflower community.",
    part: "shirt",
  },
  "Fancy Top": {
    description:
      "Oooh isn't that fancy? This short is worn in the royal kingdoms of Sunflorea.",
    part: "shirt",
  },
  "Farmer Overalls": {
    description: "Plenty of pockets to store your tools!",
    part: "pants",
  },
  "Lumberjack Overalls": {
    description:
      "Chopping wood and crafting tools, what more could you want in life?",
    part: "pants",
  },
  "Farmer Pants": {
    description: "Basic pants that get the job down at Sunflower Land",
    part: "pants",
  },
  "Warrior Pants": {
    description:
      "The mark of a warrior who survived the Goblin War. Gotta protect your thighs out on the battlefield!",
    part: "pants",
  },
  "Black Farmer Boots": {
    description:
      "These boots were made for walking...and exploring Sunflower Land.",
    part: "shoes",
  },
  "Farmer Pitchfork": {
    description:
      "A trusty pitchfork. Don't be caught dead without one when the crops are ready",
    part: "tool",
  },
  Axe: {
    description: "You can't expand your empire with chopping trees!",
    part: "tool",
  },
  Sword: {
    description: "When tensions rise in Sunflower Land, you will be ready.",
    part: "tool",
  },
  "Farmer Hat": {
    description:
      "The sun is harsh in Sunflower Land. Don't forget to protect your Bumpkin",
    part: "hat",
  },
  "Chef Hat": {
    description:
      "A champion in the great bake off. Goblins get hungry when they see a Bumpkin wearing a chef hat!",
    part: "hat",
  },
  "Warrior Helmet": {
    description:
      "Through blood and sweat, the wearer of this helmet was victorious in the Goblin war.",
    part: "hat",
  },
  "Sunflower Amulet": {
    description:
      "The crop that fuels the Sunflower MetaVerse. Now in necklace form!",
    part: "necklace",
  },
  "Carrot Amulet": {
    description:
      "Carrots for breakfast, lunch and dinner. Rumour says that wearing this necklace improves your Bumpkin's eyesight!",
    part: "necklace",
  },
  "Beetroot Amulet": {
    description: "Grandma always said to carry a beetroot wherever you go.",
    part: "necklace",
  },
  "Green Amulet": {
    description: "King of the crops. Nothing can stop your farming empire now!",
    part: "necklace",
  },
  "Sunflower Shield": {
    description:
      "Fight smart, not hard. This shield offered protection during the Goblin War and is now a mark of a true warrior.",
    part: "secondaryTool",
  },
  "Farm Background": {
    description:
      "There is no better place for a Bumpkin to be...out in the fields!",
    part: "background",
  },
  "Brown Boots": {
    description: "Perfect for a hard days work, you will barely see a stain!",
    part: "shoes",
  },
  "Brown Suspenders": {
    description:
      "Are you worried about your pants falling down? These are a must have for Goblins.",
    part: "pants",
  },
  "Fancy Pants": {
    description: "Ooh, well don't you look all high and mighty!",
    part: "pants",
  },
  "Maiden Skirt": {
    description:
      "Plowing, exploring and trading. These are a perfect choice for your Bumpkin",
    part: "pants",
  },
  "Maiden Top": {
    description:
      "A universal choice, whether you are out on the fields or trading at the markets. You will fit right in!",
    part: "shirt",
  },
  "Peasant Skirt": {
    description: "No time for rest, there are crops for harvesting!",
    part: "pants",
  },
  "SFL T-Shirt": {
    description: "Official Sunflower Land merchandise!",
    part: "shirt",
  },
  "Yellow Boots": {
    description: "The winner of the 2022 Goblin Fashion awards. ",
    part: "shoes",
  },
  "Blue Suspenders": {
    description: "A perfect outfit for the annual barn dance",
    part: "pants",
  },
  "Brown Long Hair": {
    description: "Well groomed hair for a day out farming potatoes.",
    part: "hair",
  },
  "Forest Background": {
    description: "Some Bumpkins prefer the forest to the fields.",
    part: "background",
  },
  "Seashore Background": {
    description:
      "Bumpkins were built to explore! Nothing excites a Bumpkin quite like a vast ocean in front of them.",
    part: "background",
  },
  "White Long Hair": {
    description:
      "Rumour has it the long forgotten Saphiro tribe passed down the white hair gene. These days, Bumpkins bleach their hair for fashion.",
    part: "hair",
  },
  Blondie: {
    description: "Too much time in the sun results in a Bumpkin Blondie.",
    part: "hair",
  },
  "Cemetery Background": {
    description:
      "A limited edition Halloween event! Looks like a Bumpkin Bimbo summoned the necromancer again...",
    part: "background",
  },
  "Golden Spatula": {
    description:
      "Increase the quality of your cooking. A 10% increase of experience when eating food.",
    part: "tool",
  },
  "Jail Background": {
    description: "This Bumpkin was accused of stealing potatoes.",
    part: "background",
  },
  "Space Background": {
    description: "Bumpkins to the moon!",
    part: "background",
  },
  "Teal Mohawk": {
    description: "Not all Bumpkins like to fit into the crowd.",
    part: "hair",
  },
  Parsnip: {
    description:
      "Looks like you found the perfect parsnip! 20% increased yield when farming parsnips",
    part: "tool",
  },
  "Artist Scarf": {
    description:
      "Red wine, poetry and fine pixel art. A mark of a certified Sunflower Land contributors.",
    part: "necklace",
  },
  "Bumpkin Art Competition Merch": {
    description:
      "A special event shirt for participants in the first official Bumpkin Art competition.",
    part: "shirt",
  },
  "Developer Hoodie": {
    description:
      "Coffee, comfort and coding. Time to build the Bumpkins - a mark of a certified code developer",
    part: "shirt",
  },
  "Project Dignity Hoodie": {
    description:
      "Are you a frog collector? Project Dignity is a project built on top of Sunflower Land and an amazing community!",
    part: "shirt",
  },
  "Blacksmith Hair": {
    description: "This hair is older than moon rocks!",
    part: "hair",
  },
  Hammer: {
    description: "Bumpkins were made to build!",
    part: "tool",
  },
  "Bumpkin Boots": {
    description: "Trendy Bumpkin Boots",
    part: "shoes",
  },
  "Fire Shirt": {
    description: "Bad Bumpkins break the rules!!!",
    part: "shirt",
  },
  "Red Long Hair": {
    description: "Let the fiery hair flow.",
    part: "hair",
  },
  "Snowman Onesie": {
    description: "Do you want to build a snowman?",
    part: "onesie",
  },
  "Reindeer Suit": {
    description: "Rudolph can't stop eating carrots!",
    part: "suit",
  },
  "Ancient Goblin Sword": {
    description:
      "A rare artifact found from an ancient battle. The blood of enemies stain the handle.",
    part: "tool",
  },
  "Ancient War Hammer": {
    description:
      "This ancient weapon is rumoured to bring peace to Sunflower Land",
    part: "tool",
  },
  "Angel Wings": {
    description: "Ascend to the heavens with these beautiful wings",
    part: "wings",
  },
  "Devil Wings": {
    description:
      "This Bumpkin has been doing Lucifer's dirty work and using black magic on crops.",
    part: "wings",
  },
  "Christmas Background": {
    description:
      "Deck the halls with gifts for Bumpkins, la la la la, la la la la.",
    part: "background",
  },
  "Fire Hair": {
    description: "Some one has been eating too many beetroots!",
    part: "hair",
  },
  "Luscious Hair": {
    description: "The secret to Luscious Hair is eating Kale every day.",
    part: "hair",
  },
  "Mountain View Background": {
    description:
      "Exploring beyond the reach of the mountains, what a nice place for a picnic",
    part: "background",
  },
  "Reindeer Antlers": {
    description:
      "Rumour has it if you eat too many carrots, you will grow Antlers!",
    part: "hat",
  },
  "Shark Onesie": {
    description: "Bumpkin Shark do do do do do do.",
    part: "onesie",
  },
  "Skull Hat": {
    description:
      "The most fierce warriors from the Goblin War can be seen wearing the skulls of their enemies!",
    part: "hat",
  },
  "Santa Hat": {
    description: "Ho ho ho! Someone found Santa's lost hat!",
    part: "hat",
  },
  "Pineapple Shirt": {
    description:
      "You feel like taking a break from farming? Get on the holiday vibes with this shirt.",
    part: "shirt",
  },
  "China Town Background": {
    description: "A perfect day for a hungry Goblin.",
    part: "background",
  },
  "Lion Dance Mask": {
    description: "Bring good luck and drive away evil spirits.",
    part: "hat",
  },
  "Fruit Bowl": {
    description: "A festive fruit hat fit for any occasion!",
    part: "hat",
  },
  "Fruit Picker Apron": {
    description:
      "Whether you're a professional fruit picker or just enjoy picking fruit as a hobby, this apron is a must-have accessory",
    part: "coat",
    boosts: ["Bonus +0.1 picking Apples, Blueberries & Oranges"],
  },
  "Fruit Picker Shirt": {
    description:
      "A comfortable and sturdy shirt that can withstand the elements while picking fruit.",
    part: "shirt",
  },
  "Striped Blue Shirt": {
    description:
      "Yo ho ho, the pirate with the Striped Blue Shirt has style that'll make even Davy Jones jealous!",
    part: "shirt",
  },
  "Peg Leg": {
    description: "Your jig dancing skills would make Blackbeard proud!",
    part: "shoes",
  },
  "Pirate Potion": {
    description:
      "Becoming a pirate is like trading in your suit and tie for a life of adventure on the high seas!",
    part: "body",
  },
  "Pirate Hat": {
    description:
      "Arrr! A pirate hat is the cherry on top of a swashbuckling ensemble that inspires fear and respect on the seven seas.",
    part: "hat",
  },
};
