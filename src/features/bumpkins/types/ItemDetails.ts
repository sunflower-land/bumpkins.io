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
  "Crab Claw": {
    description:
      "The pirate's claw-some companion was a crab with a hook for a hand, making them the terror of the seas and the king and queen of crab cakes.",
    part: "secondaryTool",
  },
  "Pirate General Coat": {
    description: "So grand, even the seas would salute you.",
    part: "coat",
  },
  "Pirate Leather Polo": {
    description: "Rough and tough, just like his sea-faring reputation.",
    part: "shirt",
  },
  "Pirate Pants": {
    description:
      "With this pirate baggy pants, you could have hidden a whole treasure trove in the pockets.",
    part: "pants",
  },
  "Pirate Scimitar": {
    description:
      "The Pirate's scimitar is sharp enough to slice through the seven seas and sail with ease.",
    part: "tool",
  },
  "Cupid Hair": {
    description:
      "A whimsical headpiece that resembles the iconic wings and bow of Cupid, the Roman god of love.",
    part: "hair",
  },
  "Cupid Dress": {
    description:
      "A stunning piece of attire that perfectly captures the essence of Cupid. The dress is made from a soft, flowing fabric that drapes gracefully over the wearer's body.",
    part: "dress",
  },
  "Cupid Sandals": {
    description:
      "A pair of stylish footwear that adds the finishing touch to the Cupid ensemble",
    part: "shoes",
  },
  "Love Quiver": {
    description:
      "A unique item that holds all of Cupid's arrows. The Love Quiver is a symbol of Cupid's power and is a must-have for any character who wants to embody the spirit of the Roman god of love. ",
    part: "wings",
  },
  "Bear Onesie": {
    description:
      "A cozy and cute outfit that will make you feel like a cuddly and playful bear. Perfect for parties!",
    part: "onesie",
  },
  "Bumpkin Puppet": {
    description:
      "Gather around the Puppet Master as they tell the origins of Sunflower Land.",
    part: "tool",
  },
  "Goblin Puppet": {
    description:
      "Gather around the Puppet Master as they tell the origins of Goblins and their struggles.",
    part: "tool",
  },
  "Frog Onesie": {
    description:
      "This what happens when you kiss the frog! You turn into a magical amphibian.",
    part: "onesie",
  },
  "Hawaiian Shirt": {
    description:
      "A must have for Bumpkins with a laid-back and tropical vibe. Perfect for beach parties.",
    part: "shirt",
  },
  "SFL Office Background": {
    description:
      "Immerse yourself in the office of the game designers! Feel right at home during live streams.",
    part: "background",
  },
  "Tiger Onesie": {
    description: "Rarrrrrrgh!",
    part: "onesie",
  },
  "Lifeguard Hat": {
    description:
      "Stay cool and protected under the scorching sun with the Lifeguard Hat!",
    part: "hat",
  },
  "Lifeguard Shirt": {
    description:
      "Stand out as a guardian of the water in our Lifeguard Shirt! The bold and recognizable 'LIFEGUARD' print on the front and back of the shirt ensures that you'll be easily spotted in an emergency situation.",
    part: "shirt",
  },
  "Lifeguard Pants": {
    description:
      "Stay agile and ready to jump into action with our Lifeguard Pants! With multiple pockets, you can easily store your lifeguarding essentials like a whistle, sunscreen, and gloves. Whether you're patrolling the beach, pool, or waterpark, our Lifeguard Pants are the perfect addition to your lifeguarding gear.",
    part: "pants",
  },
  "Beach Sarong": {
    description:
      "Perfect for a day in the sun or a sunset stroll along the beach, our Beach Sarong is an essential addition to your beach bag.",
    part: "dress",
  },
  "Tropical Sarong": {
    description:
      "Bring the beauty of the tropics to your beach or pool day with our Tropical Sarong!",
    part: "dress",
  },
  "Sleeping Otter": {
    description:
      "This cute and cuddly otter loves nothing more than curling up on your head for a nap. A must-have for Project Dignity supporters",
    part: "hat",
  },
  "Sequence Hat": {
    description:
      "Introducing the ultimate collectible hat for all crypto enthusiasts and bumpkins alike, created in collaboration with Sequence, a leading crypto wallet provider. Available through special events.",
    part: "hat",
  },
  "Sequence Shirt": {
    description:
      "The ultimate wearable for those who want to show their love for crypto and the Sequence platform. Available through special events.",
    part: "shirt",
  },
  "St Patricks Hat": {
    description:
      "Top o' the mornin' to ya, me friend! A special event item found at Bumpkin parties during the festive season",
    part: "hat",
  },

  "Bunny Onesie": {
    description:
      "A charming and adorable ensemble that will transform you into a lovable and bouncy bunny. Ideal for gatherings and celebrations!",
    part: "onesie",
  },
  "Polkastarter Shirt": {
    part: "shirt",
    description:
      "Show your love for gaming with this exclusive Polkastarter Shirt. Available from special events.",
  },
  "Light Brown Worried Farmer Potion": {
    part: "body",
    description: "?",
  },
  "Beach Trunks": {
    description:
      "Get ready to catch some rays and make a splash with these beach trunks that are perfect for a day out by the water.",
    part: "pants",
  },
  "Club Polo": {
    description:
      "Look sharp and stylish at the farmers market with this fancy club polo that's sure to turn heads and make you stand out.",
    part: "shirt",
  },
  "Dawn Breaker Background": {
    description:
      "Set the mood and create an atmosphere of peace and tranquility with this stunning dawn breaker background that will transport you to a serene and beautiful place.",
    part: "background",
  },
  "Dawn Lamp": {
    description:
      "Light up your life and your farm with this sturdy and reliable dawn lamp that's perfect for early mornings and late nights.",
    part: "tool",
  },
  "Eggplant Onesie": {
    description:
      "Keep cozy and comfortable in the eggplant fields with this cute and snuggly eggplant onesie that's perfect for lazy afternoons and chilly evenings.",
    part: "onesie",
  },
  "Fox Hat": {
    description:
      "Get wild and free with this furry and playful fox hat that's perfect for exploring the great outdoors and going on exciting adventures.",
    part: "hat",
  },
  "Grave Diggers Shovel": {
    description:
      "Dig up some spooky and exciting surprises with this creepy and cool grave diggers shovel that's perfect for Halloween and other fun events.",
    part: "tool",
  },
  "Infected Potion": {
    description:
      "Mix things up and add a little bit of excitement to your farming routine with this strange and mysterious infected potion that's sure to surprise and delight.",
    part: "body",
  },
  "Mushroom Hat": {
    description:
      "Get in touch with nature and feel like a whimsical woodland creature with this adorable and charming mushroom hat that's perfect for exploring the woods and foraging for mushrooms.",
    part: "hat",
  },
  "Mushroom Lamp": {
    description:
      "Set the mood and create a magical atmosphere on your farm with this enchanting and delightful mushroom lamp that will transport you to a world of wonder and whimsy.",
    part: "tool",
  },
  "Mushroom Lights Background": {
    description:
      "Add a touch of magic and mystery to your farm with this mystical and otherworldly mushroom lights background that's perfect for creating an atmosphere of enchantment and wonder.",
    part: "background",
  },
  "Mushroom Pants": {
    description:
      "Keep it practical and stylish with these sturdy and reliable mushroom pants that are perfect for exploring the woods and foraging for mushrooms.",
    part: "pants",
  },
  "Mushroom Shield": {
    description:
      "Protect yourself from danger and look cool doing it with this sturdy and reliable mushroom shield that's perfect for fending off pests and predators.",
    part: "secondaryTool",
  },
  "Mushroom Shoes": {
    description:
      "Keep your feet dry and comfy with these adorable and charming mushroom shoes that are perfect for exploring the woods and foraging for mushrooms.",
    part: "shoes",
  },
  "Mushroom Sweater": {
    description:
      "Keep warm and stylish with this cozy and comfortable mushroom sweater that's perfect for chilly nights and lazy afternoons.",
    part: "shirt",
  },
  "Rash Vest": {
    description:
      "Get ready for some fun in the sun with this stylish and practical rash vest that's perfect for staying safe and comfortable while you're out on the water.",
    part: "shirt",
  },
  "Squid Hat": {
    description:
      "Get in touch with your inner sea creature with this fun and playful squid hat that's perfect for going on aquatic adventures and exploring the deep blue sea.",
    part: "hat",
  },
  "Striped Red Shirt": {
    description:
      "Keep it simple and stylish with this classic and timeless striped red shirt that's perfect for any occasion.",
    part: "shirt",
  },
  "Striped Yellow Shirt": {
    description:
      "Add a pop of color and excitement to your wardrobe with this vibrant and cheerful striped yellow shirt that's sure to brighten up your day.",
    part: "shirt",
  },
  "Summer Top": {
    description:
      "Keep cool and comfortable during the hot summer months with this cute and stylish summer top that's perfect for any occasion.",
    part: "shirt",
  },
  "Sunburst Potion": {
    description:
      "Add a touch of magic and wonder to your farming routine with this exciting and mysterious sunburst potion that's sure to surprise and delight.",
    part: "body",
  },
  "Water Gun": {
    description:
      "Get ready for some good old-fashioned fun in the sun with this playful and exciting water gun that's perfect for splashing around with your friends and family.",
    part: "tool",
  },
  "Wavy Pants": {
    description: "Add a touch of flair and style to your farming",
    part: "pants",
  },
  "White Turtle Neck": {
    description:
      "When the winter winds are blowin' cold and fierce, this here white turtle neck keeps me warm and toasty, and it looks darn good too.",
    part: "shirt",
  },
  "Trial Tee": {
    description: "A shirt only attained through special testing sessions.",
    part: "shirt",
  },
  "Auction Megaphone": {
    description:
      "Amp up the bidding frenzy with this booming piece of equipment. Nothing says 'sold!' quite like the Auction Megaphone.",
    part: "tool",
  },
  "Auctioneer Slacks": {
    description:
      "Crafted for comfort and style, these slacks ensure you're never out of place, whether in the auction house or the cornfield.",
    part: "pants",
  },
  "Bidder's Brocade": {
    description:
      "Elegance meets business with this blazer, your partner in turning any bid into a winning one.",
    part: "shirt",
  },
  "Harry's Hat": {
    description:
      "From the sun-drenched wheat fields to the auction's spotlight, this hat's a symbol of Harry's dedication to his craft.",
    part: "hat",
  },
  "Leather Shoes": {
    description:
      "No auctioneer's ensemble is complete without these sturdy, yet stylish, leather shoes. They're made for walkin', and that's just what they'll do.",
    part: "shoes",
  },
  "Tangerine Hair": {
    description:
      "Stand out from the crowd with Harry's vibrant tangerine hair, spiked to perfection and crowned with a mustache of authority.",
    part: "hair",
  },
  "Witching Wardrobe": {
    description:
      "Step into the realm of style and elegance with the bewitching Witching Wardrobe wearable.",
    part: "dress",
  },
  "Witch's Broom": {
    description:
      "Take flight on the wings of magic with the Witches Broom wearable.",
    part: "tool",
  },
  "Infernal Bumpkin Potion": {
    description: "Unleash your infernal charm with the Infernal Bumpkin potion",
    part: "body",
  },
  "Infernal Goblin Potion": {
    description: "Unleash your infernal charm with the Infernal Goblin potion",
    part: "body",
  },
  "Imp Costume": {
    description:
      "Transform into a playful and charismatic imp with the Imp Costume wearable. ",
    part: "suit",
  },
  "Ox Costume": {
    description:
      "Embrace the strength and resilience of the ox with the Ox Suit wearable.",
    part: "suit",
  },
  "Luna's Hat": {
    description:
      "Unleash your culinary prowess with Luna's Hat, a whimsical accessory that enhances your cooking speed.",
    part: "hat",
    boosts: ["50% Cooking Speed"],
  },
  "Infernal Pitchfork": {
    description:
      "Embrace the power of the Infernal Pitchfork and witness the land yield a bountiful harvest. (Does not stack with criticals).",
    part: "tool",
    boosts: ["+3 Crops"],
  },
  "Infernal Horns": {
    description:
      "Tap into your inner infernal power with the Infernal Horns wearable. ",
    part: "hat",
  },
  Cattlegrim: {
    description:
      "Harness the extraordinary abilities of the Cattlegrim and witness your animal produce soar to new heights.",
    part: "hat",
    boosts: ["+0.25 Animal Produce"],
  },
  "Crumple Crown": {
    description:
      "Crown yourself with the illustrious Crumple Crown, an exclusive wearable that exudes elegance and refinement.",
    part: "hat",
  },

  "Merch Bucket Hat": {
    description: "A stylish bucket hat featuring the Sunflower Land logo.",
    part: "hat",
  },
  "Merch Coffee Mug": {
    description: "A Sunflower Land coffee mug to keep you caffeinated.",
    part: "tool",
  },
  "Dawn Breaker Tee": {
    description: "Show your love for Sunflower Land with this exclusive tee.",
    part: "shirt",
  },
  "Merch Tee": {
    description: "Official Sunflower Land merchandise tee.",
    part: "shirt",
  },
  "Merch Hoodie": {
    description: "Stay cozy with this Sunflower Land hoodie.",
    part: "shirt",
  },
  "Birthday Hat": {
    description: "Celebrate with this festive birthday hat.",
    part: "hat",
  },
  "Double Harvest Cap": {
    description: "Double the harvest, double the fun.",
    part: "hat",
  },
  "Streamer Helmet": {
    description: "Stream your adventures with this stylish helmet.",
    part: "hat",
  },
  "Corn Onesie": {
    description: "Transform into a cornstalk in this comfy onesie.",
    part: "onesie",
  },
  "Crow Wings": {
    description: "Fly high with these crow-like wings.",
    part: "wings",
  },
  "Witches' Eve Tee": {
    description: "Celebrate Witches' Eve with this special tee.",
    part: "shirt",
  },
  "Wise Beard": {
    description: "Show your wisdom with this majestic beard.",
    part: "beard",
  },
  "Pumpkin Hat": {
    description: "Get into the spirit of autumn with this pumpkin hat.",
    part: "hat",
  },
  "Wise Book": {
    description: "Carry your knowledge with this ancient tome.",
    part: "secondaryTool",
  },
  "Wise Hair": {
    description: "Hair that exudes wisdom and experience.",
    part: "hair",
  },
  "Wise Robes": {
    description: "Robes worn by the wisest of Bumpkins.",
    part: "shirt",
  },
  "Wise Slacks": {
    description: "Stylish and comfortable slacks for the wise Bumpkin.",
    part: "pants",
  },
  "Wise Staff": {
    description: "Channel your inner wisdom with this magical staff.",
    part: "tool",
  },
  "Greyed Glory": {
    description: "Grey hair that adds a touch of maturity.",
    part: "hair",
  },
  "Tattered Jacket": {
    description: "A worn-out jacket with a story to tell.",
    part: "shirt",
  },
  "Hoary Chin": {
    description: "A beard that shows the passage of time.",
    part: "beard",
  },
  "Tattered Slacks": {
    description: "Slacks that have seen their fair share of adventures.",
    part: "pants",
  },
  "Old Shoes": {
    description: "Sturdy shoes that have stood the test of time.",
    part: "shoes",
  },
  "Bat Wings": {
    description: "Wings that evoke the spirit of the night.",
    part: "wings",
  },
  "Gothic Twilight": {
    description: "A dress that captures the essence of twilight.",
    part: "dress",
  },
  "Dark Enchantment Gown": {
    description: "A gown that exudes a mysterious enchantment.",
    part: "dress",
  },
  "Goth Hair": {
    description: "Hair that embraces the darkness of the night.",
    part: "hair",
  },
  "Pale Potion": {
    description: "A potion that gives your Bumpkin a pale appearance.",
    part: "body",
  },
  "Stretched Jeans": {
    description: "Jeans perfect for a laid-back and casual look.",
    part: "pants",
  },
  "Skull Shirt": {
    description: "A shirt adorned with skulls for a daring style.",
    part: "shirt",
  },
  "Victorian Hat": {
    description: "A hat inspired by the elegance of the Victorian era.",
    part: "hat",
  },
  "Boater Hat": {
    description: "A classic boater hat for a stylish look.",
    part: "hat",
  },
  "Antique Dress": {
    description: "A dress that embodies vintage charm.",
    part: "dress",
  },
  "Crimson Skirt": {
    description: "A skirt in a vibrant crimson shade.",
    part: "pants",
  },
  "Chic Gala Blouse": {
    description: "A blouse that's perfect for a gala event.",
    part: "shirt",
  },
  "Ash Ponytail": {
    description: "A ponytail with a subtle ash-gray hue.",
    part: "hair",
  },
  "Pink Ponytail": {
    description: "A playful ponytail in a delightful pink color.",
    part: "hair",
  },
  "Silver Streaks": {
    description: "Streaks of silver add a touch of sophistication.",
    part: "hair",
  },
  "Straw Hat": {
    description: "A classic and timeless straw hat for a sunny day.",
    part: "hat",
  },
  "Traveller's Backpack": {
    description:
      "A functional and stylish backpack for the adventurous Bumpkin.",
    part: "wings",
  },
  "Traveller's Pants": {
    description: "Comfortable pants that are essential for any journey.",
    part: "pants",
  },
  "Traveller's Shirt": {
    description: "A versatile shirt that suits any traveler's wardrobe.",
    part: "shirt",
  },
  "Potato Suit": {
    description:
      "A quirky and amusing potato-themed suit for those who love a good laugh.",
    part: "suit",
  },
  "Parsnip Horns": {
    description:
      "A unique set of parsnip-shaped horns that adds a touch of whimsy to any outfit.",
    part: "hat",
  },
  "Brown Rancher Hair": {
    description:
      "A rugged and tousled hairstyle inspired by the hardworking ranchers of the countryside.",
    part: "hair",
  },
  "Whale Hat": {
    description:
      "A fun and charming hat shaped like a friendly whale, perfect for ocean enthusiasts.",
    part: "hat",
  },
  "Pumpkin Shirt": {
    description:
      "A cute shirt with a pumpkin design, perfect for fall festivities.",
    part: "shirt",
  },
  Halo: {
    description:
      "A glowing halo that gives a celestial aura to its wearer. A symbol of a moderator",
    part: "hat",
  },
  Kama: {
    description: "A dark mysterious farming sickle.",
    part: "tool",
  },
  "Grey Merch Hoodie": {
    description: "Stay cozy with this Sunflower Land grey hoodie.",
    part: "shirt",
  },
  "Unicorn Horn": {
    description: "Neiiiiigh. A magestical horn from the Crypto Unicorns collab",
    part: "hat",
  },
  "Unicorn Hat": {
    description: "Is that blossom? Fit right in with this rare unicorn hat",
    part: "hat",
  },
  "Feather Hat": {
    description:
      "A beautiful rare green feather hat - a special event giveaway",
    part: "hat",
  },
  "Valoria Wreath": {
    description: "A wreath from Valoria!",
    part: "hat",
  },
  "Earn Alliance Sombrero": {
    description: "A sombrero from the Earn Alliance!",
    part: "hat",
  },
  "Fresh Catch Vest": {
    description:
      "A comfortable and practical vest for your fishing adventures.",
    part: "coat",
  },
  "Fish Pro Vest": {
    description: "A vest designed for professional fishermen.",
    part: "coat",
  },
  "Reel Fishing Vest": {
    description:
      "A vest equipped with pockets and style to enhance your fishing experience.",
    part: "coat",
  },
  "Clown Shirt": {
    description:
      "A playful and colorful shirt that adds a touch of fun to your outfit.",
    part: "shirt",
  },
  "Luminous Anglerfish Topper": {
    description: "A unique hat featuring the luminous anglerfish.",
    part: "hat",
  },
  "Abyssal Angler Hat": {
    description: "A mysterious hat inspired by the depths of the ocean.",
    part: "hat",
  },
  Harpoon: {
    description:
      "A versatile tool designed for spearfishing and capturing larger fish.",
    part: "tool",
  },
  "Ancient Rod": {
    description:
      "A fishing rod with a classic design, perfect for those who appreciate tradition.",
    part: "tool",
  },
  "Fishing Hat": {
    description:
      "A practical and stylish hat that provides shade while fishing in the sun.",
    part: "hat",
  },
  "Saw Fish": {
    description:
      "A unique and formidable fishing tool for cutting through tough materials.",
    part: "tool",
  },
  Trident: {
    description: "A mythical fishing tool.",
    part: "tool",
  },
  "Bucket O' Worms": {
    description:
      "An essential secondary tool for bait, ensuring you're well-prepared for fishing.",
    part: "secondaryTool",
  },
  "Coconut Mask": {
    description: "A fun and tropical-themed mask.",
    part: "hat",
  },
  "Crab Trap": {
    description: "A decorative trap for catching crabs and other crustaceans.",
    part: "secondaryTool",
  },
  "Seaside Tank Top": {
    description:
      "A comfortable and casual tank top, ideal for a day by the water.",
    part: "shirt",
  },
  "Fish Trap": {
    description: "An decorative trap for catching fish.",
    part: "secondaryTool",
  },
  "Fishing Pants": {
    description:
      "Durable and comfortable pants designed for a full day of fishing.",
    part: "pants",
  },
  "Angler Waders": {
    description:
      "Waders that keep you dry and comfortable while fishing in water.",
    part: "pants",
  },
  "Fishing Spear": {
    description:
      "A specialized tool for spearfishing, adding excitement to your fishing adventures.",
    part: "tool",
  },
  "Flip Flops": {
    description:
      "Lightweight and easy-to-wear shoes for a relaxed day at the beach.",
    part: "shoes",
  },
  Wellies: {
    description:
      "Waterproof and practical shoes for wet and muddy fishing conditions.",
    part: "shoes",
  },
  "Skinning Knife": {
    description:
      "A sharp and precise tool for cleaning and preparing your catch.",
    part: "tool",
  },
  "Sunflower Rod": {
    description:
      "A rod with a cheerful sunflower energy, perfect for sunny days by the water.",
    part: "tool",
  },
  "Tackle Box": {
    description:
      "An organized and spacious container for storing your fishing gear.",
    part: "tool",
  },
  "Infernal Rod": {
    description: "A fiery and eye-catching fishing rod with a unique design.",
    part: "tool",
  },
  "Mermaid Potion": {
    description: "?",
    part: "body",
  },
  "Squirrel Monkey Potion": {
    description: "?",
    part: "body",
  },
  "Koi Fish Hat": {
    description:
      "A hat inspired by the graceful and colorful koi fish, adding an elegant touch to your outfit.",
    part: "hat",
  },
  "Normal Fish Hat": {
    description: "A classic fish-themed hat, perfect for fishing enthusiasts.",
    part: "hat",
  },
  "Stockeye Salmon Onesie": {
    description:
      "A cozy and fun onesie featuring the Stockeye Salmon, ideal for cold fishing trips.",
    part: "onesie",
  },
  "Tiki Armor": {
    description:
      "A set of stylish and protective armor with a island inspired design.",
    part: "shirt",
  },
  "Tiki Mask": {
    description:
      "A unique mask that adds a touch of mystery and style to your outfit.",
    part: "hat",
  },
  "Tiki Pants": {
    description:
      "Comfortable and fashionable island themed pants, perfect for a tropical adventure.",
    part: "pants",
  },
  "Banana Amulet": {
    description:
      "Go bananas for this amulet! Legends whisper it grants its wearer a-peel-ing charm and a slip-free day.",
    part: "necklace",
  },
  "Banana Onesie": {
    description:
      "Cute and cozy, embrace the essence of a banana in this adorable onesie.",
    part: "onesie",
  },
  "Basic Dumbo": {
    description:
      "A simple and classic hat featuring the iconic tentacles of a lovable octopus.",
    part: "hat",
  },
  "Companion Cap": {
    description:
      "A trusty cap that keeps you company on your virtual adventures.",
    part: "hat",
  },
  "Dazzling Dumbo": {
    description:
      "Stand out with this dazzling hat that adds a touch of sparkle to your style.",
    part: "hat",
  },
  "Deep Sea Helm": {
    description:
      "Dive into the depths with this nautical-inspired helm, perfect for underwater explorations.",
    part: "hat",
  },
  "Gloomy Dumbo": {
    description:
      "Express your emotions with this somber hat, featuring the iconic tentacles of a certain melancholy octopus.",
    part: "hat",
  },
  "Pickaxe Shark": {
    description:
      "Equip yourself with this trusty pickaxe fashioned like a shark, ready for farming adventures.",
    part: "tool",
  },
  "Seedling Hat": {
    description:
      "Embrace the spirit of agriculture with this charming hat adorned with sprouting seedlings.",
    part: "hat",
  },
  "Stormy Dumbo": {
    description:
      "Weather the storm in style with this hat featuring the turbulent tentacles of an octopus caught in a tempest.",
    part: "hat",
  },
  "Ugly Christmas Sweater": {
    description: "A whimsical holiday wearable from Earn Alliance",
    part: "shirt",
  },
  "Candy Cane": {
    description: "A festive tool for spreading sweet holiday cheer.",
    part: "tool",
  },
  "Elf Hat": {
    description: "Get into the holiday spirit with this whimsical elf hat.",
    part: "hat",
  },
  "Elf Potion": {
    description: "Magical elixir to bring out your inner elf.",
    part: "body",
  },
  "Elf Shoes": {
    description: "Stylish footwear to complete your elfin look.",
    part: "shoes",
  },
  "Elf Suit": {
    description: "A complete elf outfit for festive occasions.",
    part: "suit",
  },
  "Santa Beard": {
    description: "Classic white beard to transform into the jolly old elf.",
    part: "beard",
  },
  "Santa Suit": {
    description: "The iconic red suit for spreading joy as Santa Claus.",
    part: "suit",
  },
  "Butterfly Wings": {
    description: "Delicate and colorful wings to add a touch of enchantment.",
    part: "wings",
  },
  "Cozy Hoodie": {
    description:
      "Warm and comfortable hoodie for a snug and stylish winter look.",
    part: "shirt",
  },
  "New Years Tiara": {
    description:
      "Elegant tiara to sparkle and shine as you welcome the new year.",
    part: "hat",
  },
  "Northern Lights Background": {
    description:
      "Mesmerizing background capturing the beauty of the northern lights.",
    part: "background",
  },
  "Short Shorts": {
    description: "Cool and trendy shorts for a casual and fashionable vibe.",
    part: "pants",
  },
  "Winter Jacket": {
    description:
      "Insulated jacket to keep you warm and fashionable during winter.",
    part: "shirt",
  },
  "Beehive Staff": {
    description: "A staff that harnesses the power of bees.",
    part: "tool",
  },
  "Bee Smoker": {
    description: "A tool that calms bees.",
    part: "tool",
  },
  "Bee Suit": {
    description: "Bee the best you can bee.",
    part: "suit",
  },
  "Bee Wings": {
    description: "Wings that shimmer with the iridescence of blooming flowers",
    part: "wings",
  },
};
