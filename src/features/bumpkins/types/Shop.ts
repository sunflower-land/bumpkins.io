export type Release = {
  releaseDate: number;
  endDate?: number;
  supply: number;
  price: string;
};

export type BumpkinItemShopDetails = {
  id: number;
  releases: Release[];
};
