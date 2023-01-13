import React, { useState } from "react";

import arrowDown from "assets/icons/down.svg";
import { Category, Shop } from "features/collection/actions/items";
import { CategoryButton } from "features/collection/components/CategoryButton";

interface Props {
  counts: Omit<Shop, "items"> & { itemCount: number };
  category: Category;
  setCategory: (category: Category) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  counts,
  category,
  setCategory,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  type CategoryDetails = {
    title: Category;
    secondaryText: string;
  };

  const categories: CategoryDetails[] = [
    { title: "All", secondaryText: counts.itemCount.toString() },
    { title: "Hats", secondaryText: counts?.hatCount.toString() },
    { title: "Hair", secondaryText: counts?.hairCount.toString() },
    { title: "Necklaces", secondaryText: counts?.necklaceCount.toString() },
    { title: "Shirts", secondaryText: counts?.shirtCount.toString() },
    { title: "Pants", secondaryText: counts?.pantCount.toString() },
    { title: "Shoes", secondaryText: counts?.shoeCount.toString() },
    { title: "Potions", secondaryText: counts?.potionCount.toString() },
    { title: "Tools", secondaryText: counts?.toolCount.toString() },
    { title: "Backgrounds", secondaryText: counts?.backgroundCount.toString() },
  ];

  const openDropdown = (open: boolean) => {
    setDropdownOpen(open);
  };

  const Categories: React.FC = () => (
    <>
      {categories
        .filter(({ secondaryText: count }) => Number(count) > 0)
        .map(({ title, secondaryText }) => (
          <CategoryButton
            key={title}
            title={title}
            onClick={() => {
              setCategory(title);
              dropdownOpen && setDropdownOpen(false);
            }}
            secondaryText={secondaryText}
            selected={category === title}
          />
        ))}
    </>
  );

  return (
    <>
      <div className="invisible h-0 lg:visible lg:h-auto">
        <Categories />

        {/* <div className="mb-10 xl:mb-11">
                  <h2 className="mb-6 text-3xl leading-9 font-heading font-medium">
                    Availability
                  </h2>

                  <Checkbox
                    text="Available"
                    isChecked={availability.includes("Available")}
                    onToggle={() => toggle("Available")}
                  />
                  <Checkbox
                    text="Sold out"
                    isChecked={availability.includes("Sold out")}
                    onToggle={() => toggle("Sold out")}
                  />
                  <Checkbox
                    text="Upcoming"
                    isChecked={availability.includes("Upcoming")}
                    onToggle={() => toggle("Upcoming")}
                  />
                </div> */}
      </div>
      {/* Dropdown categories */}
      <div
        className="lg:hidden flex items-center justify-between py-4 mb-3 px-8 bg-white font-heading font-medium rounded-3xl cursor-pointer border-[1px] border-gray-100 bg-opacity-100"
        onClick={() => openDropdown(!dropdownOpen)}
      >
        <span>{dropdownOpen ? "Select category" : `${category}`}</span>
        <img
          className={`${dropdownOpen && "rotate-180"} w-3`}
          src={arrowDown}
          alt=""
        />
      </div>
      {dropdownOpen && <Categories />}
    </>
  );
};
