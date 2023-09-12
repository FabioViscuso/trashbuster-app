import { useState } from "react";
import { createPortal } from "react-dom";
import { WasteSelectionModal } from "./WasteSelectionModal";
import { DayOfWeek } from "../../utils/weekDays";
import WasteTypesList from "./WasteTypesList";

interface Props {
  weekday: DayOfWeek;
  weekNumber?: number;
}

export default function DayCell({ weekday, weekNumber }: Props) {
  const [isWasteSelectionModalOpen, setIsWasteSelectionModalOpen] =
    useState<boolean>(false);
  const handleToggleWasteSelectionModal = () => {
    setIsWasteSelectionModalOpen(!isWasteSelectionModalOpen);
  };

  const today = new Date();
  const currentWeekday = today.toLocaleDateString("it-IT", { weekday: "long" });
  const isToday = currentWeekday.toLowerCase() === weekday.toLowerCase();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowWeekday = tomorrow.toLocaleDateString("it-IT", {
    weekday: "long",
  });
  const isTomorrow = tomorrowWeekday.toLowerCase() === weekday.toLowerCase();

  const isOfCurrentWeek = (
    today: Date,
    tomorrow: Date,
    weekNumber: number | undefined
  ) => {
    const todayAsDayNumber = today.getDate();
    const tomorrowAsNumber = tomorrow.getDate();
    if (!weekNumber) {
      return true;
    }
    if (
      weekNumber === 1 &&
      todayAsDayNumber >= 1 &&
      todayAsDayNumber <= 7 &&
      tomorrowAsNumber >= 1 &&
      tomorrowAsNumber <= 7
    ) {
      return true;
    }
    if (
      weekNumber === 2 &&
      todayAsDayNumber >= 8 &&
      todayAsDayNumber <= 14 &&
      tomorrowAsNumber >= 8 &&
      tomorrowAsNumber <= 14
    ) {
      return true;
    }
    if (
      weekNumber === 3 &&
      todayAsDayNumber >= 15 &&
      todayAsDayNumber <= 21 &&
      tomorrowAsNumber >= 15 &&
      tomorrowAsNumber <= 21
    ) {
      return true;
    }
    if (
      weekNumber === 4 &&
      todayAsDayNumber >= 22 &&
      todayAsDayNumber <= 28 &&
      tomorrowAsNumber >= 22 &&
      tomorrowAsNumber <= 28
    ) {
      return true;
    }
  };

  return (
    <>
      <div
        className={`relative [width:clamp(16rem,15vw,30rem)] p-4 flex flex-col gap-5 ${
          isToday && isOfCurrentWeek(today, tomorrow, weekNumber)
            ? "bg-green-950"
            : isTomorrow && isOfCurrentWeek(today, tomorrow, weekNumber)
            ? "bg-green-800"
            : ""
        } border-green-700 border-2 rounded-md`}
      >
        <p>{weekday}</p>
        <div id={weekday} className="w-full flex">
          <WasteTypesList weekday={weekday} weekNumber={weekNumber} />
          <button
            onClick={handleToggleWasteSelectionModal}
            className="p-3 ml-auto leading-[0.7] border-[#eee] border-2 rounded-full hover:border-green-400 hover:text-green-400 [filter:invert(0%)]"
          >
            +
          </button>
        </div>
        {isToday && isOfCurrentWeek(today, tomorrow, weekNumber) ? (
          <p className="absolute -top-7 left-0">Oggi</p>
        ) : isTomorrow && isOfCurrentWeek(today, tomorrow, weekNumber) ? (
          <p className="absolute -top-7 left-0">Domani</p>
        ) : null}
      </div>
      {isWasteSelectionModalOpen &&
        createPortal(
          <WasteSelectionModal
            key={Math.floor(1000 + Math.random() * 9999)}
            fn={handleToggleWasteSelectionModal}
            weekday={weekday}
            weekNumber={weekNumber}
          />,
          document.body
        )}
    </>
  );
}
