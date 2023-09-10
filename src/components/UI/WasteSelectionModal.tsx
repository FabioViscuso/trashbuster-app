import wasteTypes from "../../utils/wasteTypes";
import { DayOfWeek } from "../../utils/weekDays";
import WasteType from "./WasteType";

interface Props {
  weekday: DayOfWeek;
  fn: () => void;
}

export function WasteSelectionModal({weekday, fn}: Props) {
  return (
    <div className="fixed z-50 top-0 left-0 h-[100dvh] w-[100vw] bg-black bg-opacity-50 backdrop-blur-md">
      <div className="flex flex-col justify-center gap-10 h-full w-full md:w-[80vw] mx-auto px-10">
        <p className=" text-center">Seleziona i tipi di rifiuti da conferire {weekday.toLowerCase()}</p>
        <div className="grid grid-flow-row grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-20 gap-y-10 justify-center justify-items-center">
          {wasteTypes.map((wasteType) => (
            <WasteType wasteType={wasteType.type} bgColor={`${wasteType.bgColor}`} icon={wasteType.icon} forWeekday={weekday} />
          ))}
        </div>
        <button onClick={fn} className="self-center py-2 px-4 rounded-lg bg-red-600">Chiudi</button>
      </div>
    </div>
  );
}
