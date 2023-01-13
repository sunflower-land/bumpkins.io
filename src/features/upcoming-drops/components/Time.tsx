import { useSelector } from "@xstate/react";
import React from "react";
import {
  UpcomingDropMachineInterpreter,
  UpcomingDropMachineState,
} from "../lib/upcomingDropMachine";
import threeDots from "assets/images/three-dots.svg";

interface Props {
  service: UpcomingDropMachineInterpreter;
}

type TimeUnit =
  | "days"
  | "day"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "seconds"
  | "second";

const TextDisplay = ({ text, unit }: { text: string; unit?: TimeUnit }) => {
  return (
    <div className="flex flex-col w-[14%] items-center stroke-slate-100 leading-none">
      <span className="text-7xl md:text-9xl font-timer text-white timer-text">
        {text}
      </span>
      <span className="text-gray-600 text-xs md:text-lg">{unit}</span>
    </div>
  );
};

const currentItemDuration = (state: UpcomingDropMachineState) =>
  state.context.currentItemTimer;

export const Time: React.FC<Props> = ({ service }) => {
  const time = useSelector(service, currentItemDuration);

  if (!time)
    return (
      <div className="w-full flex justify-center">
        <img src={threeDots} alt="" />
      </div>
    );

  return (
    <div className="relative w-full border-gray-200 flex rounded-2xl items-center">
      <TextDisplay
        text={`${time.days}`}
        unit={time.days === 1 ? "day" : "days"}
      />
      <TextDisplay text={`:`} />
      <TextDisplay
        text={`${time.hours}`}
        unit={time.hours === 1 ? "hour" : "hours"}
      />
      <TextDisplay text={`:`} />
      <TextDisplay
        text={`${time.minutes}`}
        unit={time.minutes === 1 ? "minute" : "minutes"}
      />
      <TextDisplay text={`:`} />
      <TextDisplay
        text={`${Math.floor(time.seconds as number)}`}
        unit={Math.floor(time.seconds as number) === 1 ? "second" : "seconds"}
      />
    </div>
  );
};
