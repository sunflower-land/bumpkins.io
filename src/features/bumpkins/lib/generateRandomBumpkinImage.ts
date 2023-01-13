import { BumpkinBackground } from "../types/Items";

function randomBetweenMaxExclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export type LimitedBody =
  | "Beige Farmer Potion"
  | "Light Brown Farmer Potion"
  | "Dark Brown Farmer Potion";
export type LimitedHair = "Basic Hair" | "Explorer Hair" | "Rancher Hair";
export type LimitedShirt =
  | "Red Farmer Shirt"
  | "Yellow Farmer Shirt"
  | "Blue Farmer Shirt";
export type LimitedPants = "Farmer Pants";
export type LimitedEyes =
  | "Rosy Wide Eyes"
  | "Rosy Squinted Eyes"
  | "Rosy Butterfly Eyes";
export type LimitedMouth = "Wide Smile";
export type LimitedShoes = "Black Farmer Boots";
export type LimitedTools = "Farmer Pitchfork";

type LimitedBumpkinItem =
  | LimitedBody
  | LimitedHair
  | LimitedShirt
  | LimitedPants
  | LimitedEyes
  | LimitedMouth
  | LimitedShoes
  | LimitedTools;

interface Bumpkin {
  body: LimitedBody;
  hair: LimitedHair;
  shirt: LimitedShirt;
  pants: LimitedPants;
  shoes: LimitedShoes;
  tool: LimitedTools;
  background: BumpkinBackground;
}

type Category = "hair" | "eyes" | "body" | "shirt";

const BUMPKIN_PARTS: Record<Category, LimitedBumpkinItem[]> = {
  hair: ["Basic Hair", "Explorer Hair", "Rancher Hair"],
  eyes: ["Rosy Wide Eyes", "Rosy Squinted Eyes", "Rosy Butterfly Eyes"],
  body: ["Light Brown Farmer Potion", "Dark Brown Farmer Potion"],
  shirt: ["Red Farmer Shirt", "Yellow Farmer Shirt", "Blue Farmer Shirt"],
};

const getRandomPart = <T>(category: Category) => {
  const randomIndex = randomBetweenMaxExclusive(
    0,
    BUMPKIN_PARTS[category].length
  );

  return BUMPKIN_PARTS[category][randomIndex] as unknown as T;
};

export const generateRandomBumpkinImage = (): Bumpkin => ({
  body: getRandomPart<LimitedBody>("body"),
  hair: getRandomPart<LimitedHair>("hair"),
  shirt: getRandomPart<LimitedShirt>("shirt"),
  pants: "Farmer Pants",
  shoes: "Black Farmer Boots",
  tool: "Farmer Pitchfork",
  background: "Farm Background",
});
