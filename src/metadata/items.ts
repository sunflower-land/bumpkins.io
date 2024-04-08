import { BumpkinItem, ITEM_IDS } from "features/bumpkins/types/Items";
import { DETAILS } from "features/bumpkins/types/ItemDetails";

type DisplayType = "boost_percentage" | "boost_number";

export type Attribute = {
  display_type?: DisplayType;
  trait_type?: string;
  value: number | string;
};

export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

type Designer = {
  name: string;
  link: string;
};

type Details = {
  boosts?: Attribute[];
  supply?: number;
  designer?: Designer;
};

export type Metadata = Details & {
  id: number;
  name: BumpkinItem;
  description: string;
  attributes?: Attribute[];
  supply?: number;
  designer?: Designer;
};

export const EXTRA_DETAILS: Record<BumpkinItem, Details> = {
  "Chef Apron": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Cake Sale Price",
        value: 20,
      },
      { trait_type: "Boost", value: "Food & XP" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Fruit Picker Apron": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Fruit Yield",
        value: 0.1,
      },
      { trait_type: "Boost", value: "Fruit" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Angel Wings": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Chance of Instant Crops",
        value: 30,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Devil Wings": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Chance of Instant Crops",
        value: 30,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Eggplant Onesie": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Eggplant Yield",
        value: 0.1,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Corn Onesie": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Corn Yield",
        value: 0.1,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Golden Spatula": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase XP gains",
        value: 10,
      },
      { trait_type: "Boost", value: "Food & XP" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Mushroom Hat": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Mushroom Yield",
        value: 0.1,
      },
      { trait_type: "Boost", value: "Resource" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  Parsnip: {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Parsnip Yield",
        value: 20,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Sunflower Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Sunflower Yield",
        value: 10,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Carrot Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Carrot Growth Time",
        value: -20,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Beetroot Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Increase Beetroot Yield",
        value: 20,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Sunflower Shield": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Cost of Sunflower Seeds",
        value: 0,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Green Amulet": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Crop Critical Hit Yield",
        value: 900, // 900% more yield=10x
      },
      {
        display_type: "boost_percentage",
        trait_type: "Critical Hit Chance",
        value: 10,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  Cattlegrim: {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Animal Yield",
        value: 0.25,
      },
      { trait_type: "Boost", value: "Animal" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Luna's Hat": {
    boosts: [
      {
        display_type: "boost_percentage",
        trait_type: "Cooking time",
        value: -50,
      },
      { trait_type: "Boost", value: "Food & XP" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Infernal Pitchfork": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Crop Yield",
        value: 3,
      },
      { trait_type: "Boost", value: "Crop" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Pirate Potion": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Free Chest per day in Treasure Island",
        value: 1,
      },
      { trait_type: "Boost", value: "Other" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Luminous Anglerfish Topper": {
    boosts: [
      { trait_type: "Boost", value: "Food & XP" },
      {
        display_type: "boost_percentage",
        value: 50,
        trait_type: "Increase XP gains for Fish Products",
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Ancient Rod": {
    boosts: [
      { trait_type: "Boost", value: "Fish" },
      {
        display_type: "boost_number",
        value: 1,
        trait_type: "Cast Fish without Rod",
      },
    ],
  },
  Trident: {
    boosts: [
      { trait_type: "Boost", value: "Fish" },
      {
        display_type: "boost_percentage",
        value: 20,
        trait_type: "Fish Critical Hit Chance",
      },
      {
        display_type: "boost_number",
        value: 1,
        trait_type: "Fish Critical Hit Amount",
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Bucket O' Worms": {
    boosts: [
      { trait_type: "Boost", value: "Bait" },
      {
        display_type: "boost_number",
        value: 1,
        trait_type: "Increase Worm Yield",
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Angler Waders": {
    boosts: [
      { trait_type: "Boost", value: "Fish" },
      {
        display_type: "boost_number",
        value: 10,
        trait_type: "Increase Daily Fishing Attempts",
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Sunflower Rod": {
    boosts: [
      { trait_type: "Boost", value: "Fish" },
      {
        display_type: "boost_percentage",
        value: 10,
        trait_type: "Fish Critical Hit Chance",
      },
      {
        display_type: "boost_number",
        value: 1,
        trait_type: "Fish Critical Hit Amount",
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Banana Amulet": {
    boosts: [
      {
        display_type: "boost_number",
        trait_type: "Increase Banana Yield",
        value: +0.5,
      },
      { trait_type: "Boost", value: "Fruit" },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Bee Suit": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Increase Honey Yield per full beehive",
        value: 0.1,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Beekeeper Hat": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Increase Honey Production Speed",
        value: +0.2,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Crimstone Armor": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Increase Honey Yield",
        value: 0.1,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Crimstone Hammer": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Increase Crimstone Yield on 5th Mine",
        value: 2,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Crimstone Amulet": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Crimstone Cooldown Time",
        value: -20,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Honeycomb Shield": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_number",
        trait_type: "Increase Honey Yield per full beehive",
        value: 1,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Hornet Mask": {
    boosts: [
      { trait_type: "Boost", value: "Resource" },
      {
        display_type: "boost_percentage",
        trait_type: "Increase Chance of Bee Swarm",
        value: 100,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Deep Sea Helm": {
    boosts: [
      { trait_type: "Boost", value: "Fish" },
      {
        display_type: "boost_percentage",
        trait_type: "Increase Chance of Marine Marvels",
        value: 200,
      },
      { trait_type: "Tradable", value: "No" },
    ],
  },
  "Flower Crown": {
    boosts: [
      { trait_type: "Boost", value: "Flower" },
      {
        display_type: "boost_percentage",
        trait_type: "Flower Growth Time",
        value: -50,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Banana Onesie": {
    boosts: [
      { trait_type: "Boost", value: "Fruit" },
      {
        display_type: "boost_percentage",
        trait_type: "Banana Growth Time",
        value: -20,
      },
      { trait_type: "Tradable", value: "Yes" },
    ],
  },
  "Beige Farmer Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Light Brown Farmer Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Dark Brown Farmer Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Goblin Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Light Brown Worried Farmer Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Sunburst Potion": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Infected Potion": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Infernal Bumpkin Potion": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Infernal Goblin Potion": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pale Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Squirrel Monkey Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Mermaid Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Elf Potion": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Basic Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Rancher Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Explorer Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Buzz Cut": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Parlour Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Blondie: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Sun Spots": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Brown Long Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "White Long Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Teal Mohawk": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Red Long Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Blacksmith Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fire Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Luscious Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Cupid Hair": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tangerine Hair": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wise Hair": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Greyed Glory": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Goth Hair": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Ash Ponytail": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Pink Ponytail": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Silver Streaks": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Brown Rancher Hair": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Red Farmer Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Yellow Farmer Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Blue Farmer Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Warrior Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fancy Top": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Maiden Top": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "SFL T-Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Project Dignity Hoodie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Developer Hoodie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bumpkin Art Competition Merch": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fire Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pineapple Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fruit Picker Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Striped Blue Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pirate Leather Polo": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Hawaiian Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lifeguard Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Sequence Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Polkastarter Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mushroom Sweater": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Rash Vest": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Club Polo": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "White Turtle Neck": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Summer Top": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Striped Red Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Striped Yellow Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Trial Tee": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Bidder's Brocade": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Traveller's Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Dawn Breaker Tee": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Merch Tee": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Merch Hoodie": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Witches' Eve Tee": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wise Robes": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tattered Jacket": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Skull Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Chic Gala Blouse": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pumpkin Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Grey Merch Hoodie": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Clown Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Seaside Tank Top": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tiki Armor": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Ugly Christmas Sweater": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Cozy Hoodie": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Winter Jacket": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Full Bloom Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Blue Blossom Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Daisy Tee": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Blue Monarch Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Green Monarch Shirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Orange Monarch Shirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Farmer Overalls": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Lumberjack Overalls": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Farmer Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Warrior Pants": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Brown Suspenders": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Blue Suspenders": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fancy Pants": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Maiden Skirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Peasant Skirt": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pirate Pants": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lifeguard Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Beach Trunks": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wavy Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Mushroom Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Auctioneer Slacks": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Traveller's Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wise Slacks": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Stretched Jeans": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Crimson Skirt": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Tattered Slacks": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Fishing Pants": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tiki Pants": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Short Shorts": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Gardening Overalls": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Crimstone Pants": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Cupid Dress": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Beach Sarong": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tropical Sarong": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Witching Wardrobe": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Gothic Twilight": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Dark Enchantment Gown": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Antique Dress": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Rose Dress": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Blue Rose Dress": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Blue Monarch Dress": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Green Monarch Dress": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Orange Monarch Dress": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Farmer Pitchfork": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Sword: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Axe: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Hammer: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Ancient War Hammer": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Ancient Goblin Sword": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pirate Scimitar": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bumpkin Puppet": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Goblin Puppet": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mushroom Lamp": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Dawn Lamp": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Water Gun": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Grave Diggers Shovel": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Auction Megaphone": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Witch's Broom": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Merch Coffee Mug": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wise Staff": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  Kama: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Harpoon: {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Fishing Spear": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Skinning Knife": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Infernal Rod": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pickaxe Shark": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Candy Cane": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Beehive Staff": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bee Smoker": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Black Farmer Boots": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Brown Boots": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Yellow Boots": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bumpkin Boots": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Peg Leg": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Cupid Sandals": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mushroom Shoes": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Leather Shoes": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Old Shoes": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Flip Flops": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Wellies: {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Elf Shoes": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Crimstone Boots": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Fairy Sandals": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Farmer Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Chef Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Warrior Helmet": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Skull Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Reindeer Antlers": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Santa Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Elf Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lion Dance Mask": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fruit Bowl": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pirate Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lifeguard Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Sleeping Otter": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Sequence Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "St Patricks Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Squid Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fox Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Harry's Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Straw Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Infernal Horns": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Merch Bucket Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Birthday Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Double Harvest Cap": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Streamer Helmet": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Pumpkin Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Victorian Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Boater Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Crumple Crown": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Whale Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Parsnip Horns": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  Halo: {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Unicorn Horn": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Unicorn Hat": {
    boosts: [{ trait_type: "Tradable", value: "no" }],
  },
  "Feather Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Valoria Wreath": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Earn Alliance Sombrero": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Abyssal Angler Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fishing Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Coconut Mask": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Koi Fish Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Normal Fish Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tiki Mask": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Seedling Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Companion Cap": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Dazzling Dumbo": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Basic Dumbo": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Stormy Dumbo": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Gloomy Dumbo": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "New Years Tiara": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Propeller Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Queen Bee Crown": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lucky Red Hat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Chicken Hat": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Love's Topper": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Artist Scarf": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Crab Claw": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mushroom Shield": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Wise Book": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Crab Trap": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Fish Trap": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Saw Fish": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tackle Box": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Farm Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Seashore Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Forest Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Cemetery Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Space Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Jail Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Christmas Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mountain View Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "China Town Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "SFL Office Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Dawn Breaker Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Mushroom Lights Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Northern Lights Background": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Valentine's Field Background": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Pirate General Coat": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fresh Catch Vest": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Fish Pro Vest": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Reel Fishing Vest": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Snowman Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Shark Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bear Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Tiger Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Frog Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bunny Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Stockeye Salmon Onesie": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Reindeer Suit": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Imp Costume": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Ox Costume": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Potato Suit": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Santa Suit": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Elf Suit": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Beekeeper Suit": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Lucky Red Suit": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Love Quiver": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Traveller's Backpack": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Crow Wings": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Bat Wings": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Butterfly Wings": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Bee Wings": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
  "Wise Beard": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Hoary Chin": {
    boosts: [{ trait_type: "Tradable", value: "No" }],
  },
  "Santa Beard": {
    boosts: [{ trait_type: "Tradable", value: "Yes" }],
  },
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const BUMPKIN_ITEM_METADATA: Metadata[] = getKeys(DETAILS).reduce(
  (acc, name) => {
    const details = DETAILS[name];
    const extraDetails =
      EXTRA_DETAILS[name as keyof typeof EXTRA_DETAILS] || {};

    const partAttribute = {
      trait_type: "Part",
      value: capitalizeFirstLetter(details.part),
    } as Attribute;
    return [
      ...acc,
      {
        id: ITEM_IDS[name as keyof typeof ITEM_IDS],
        name,
        description: details.description,
        attributes: [partAttribute].concat(extraDetails.boosts || []),
        designer: extraDetails.designer,
        supply: extraDetails.supply,
      } as Metadata,
    ];
  },
  [] as Metadata[]
);
