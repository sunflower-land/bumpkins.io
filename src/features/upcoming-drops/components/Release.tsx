import classNames from "classnames";
import { DateTime } from "luxon";
import React from "react";

import calendar from "assets/icons/calendar.png";
import stopwatch from "assets/icons/stopwatch.png";
import sflIcon from "assets/icons/token_2.png";

import { secondsToString } from "../lib/time";
import { UNLIMITED_SUPPLY } from "../UpcomingDrops";

interface Props {
  endDate: DateTime;
  releaseDate: DateTime;
  sfl: number;
  supply?: number;
}

export const Release: React.FC<Props> = ({
  endDate,
  releaseDate,
  supply,
  sfl,
}) => {
  const ended = endDate && endDate.toMillis() < Date.now();
  const open = releaseDate.toMillis() < Date.now() && !ended;

  const secondsOpen = endDate.toSeconds() - releaseDate.toSeconds();
  return (
    <div className="mb-5 text-sm md:text-base" key={releaseDate.toMillis()}>
      <div
        className={classNames("flex", {
          "line-through": ended,
          "bg-yellow-400": open,
        })}
      >
        <div className="w-10 flex justify-center">
          <img src={calendar} className="h-6 mr-1 pixelate" />
        </div>
        <span className="font-bold">{`${releaseDate.toLocaleString(
          DateTime.DATETIME_FULL
        )}`}</span>
      </div>

      <div className="flex mt-1">
        <div className="flex mr-1">
          <div className="w-10 flex justify-center">
            <img src={sflIcon} className="h-6 mr-1 pixelate" />
          </div>
          <span className="">{`${sfl} SFL`}</span>
        </div>
        <div className="flex ml-2">
          <div className="w-8 flex justify-center">
            <img src={stopwatch} className="h-6 pixelate" />
          </div>
          <span>{`Available for ${secondsToString(secondsOpen)}`}</span>
        </div>

        {!!supply && supply !== UNLIMITED_SUPPLY && (
          <span className="py-[2px] px-2 text-[11px] leading-5 text-red-500 font-bold uppercase bg-orange-100 rounded-xl  z-10 border border-red-500 ml-2">
            Supply: {supply}
          </span>
        )}
      </div>
    </div>
  );
};
