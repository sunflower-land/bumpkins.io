import * as fs from "fs";
import * as path from "path";
import { Attribute, BUMPKIN_ITEM_METADATA, Metadata } from "./items";

type MetadataObject = {
  name: string;
  external_url: string;
  description: string;
  image: string;
  attributes?: Attribute[];
};

export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

const blurb =
  "Bumpkins is a community driven customisable NFT project powered by Sunflower Land";
const BUMPKINS_SITE_URL = "https://bumpkins.io";
const BUMPKINS_DOCS_URL = "https://docs.bumpkins.io/getting-started/about";
const SFL_DOCS_URL = "https://docs.sunflower-land.com/getting-started/about";
const TERMS_URL = "https://docs.bumpkins.io/support/terms-of-service";
const IMAGE_PATH = "https://bumpkins.io/";

const markdownSections = [
  "name",
  "description",
  "bumpkins.io",
  "docs",
  "designer",
];

function generateMarkdownString(item: Metadata) {
  return markdownSections.reduce((markdown, section) => {
    switch (section) {
      case "name":
        markdown += `\r\n\r\n## ${item[section]}`;
        break;
      case "description":
        markdown += `\r\n\r\n${item[section]}`;
        break;
      case "bumpkins.io":
        markdown += `\r\n\r\n### Bumpkins.io\r\n\r\nGo to bumpkins.io to equip this collectible to your Bumpkin NFT`;
        break;
      case "docs":
        markdown += `\r\n\r\n### About\r\n\r\n${blurb}\r\n[Bumpkins](${BUMPKINS_DOCS_URL})\r\n[Bumpkins Terms and Conditions](${TERMS_URL})\r\n[Sunflower Land](${SFL_DOCS_URL})`;
        break;
      case "designer":
        markdown += item.designer
          ? `\r\n\r\n### Designer\r\n\r\n[${item.designer.name}](${item.designer.link})`
          : "";
        break;
    }

    return markdown;
  }, "");
}

function generateMetadata(items: Metadata[]) {
  items.forEach((item) => {
    const image = `${BUMPKINS_SITE_URL}/erc1155/images/${item.id}.png`;
    const filePath = path.join(__dirname, `../assets/open-sea/${item.id}.json`);
    const markdown = generateMarkdownString(item);

    const json: MetadataObject = {
      name: item.name,
      description: markdown,
      image,
      attributes: [...(item.attributes ? item.attributes : [])],
      external_url: BUMPKINS_SITE_URL,
    };

    fs.writeFile(filePath, JSON.stringify(json), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
      console.log(`File ${item.id}.json success!`);
    });
  });
}

generateMetadata(BUMPKIN_ITEM_METADATA);
