import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { parse, format, isValid } from "date-fns";

interface CalendarProps {
  date: Date | Date[];
  setDate: (date: Date | Date[]) => void;
}

export const DateInput: React.FC<CalendarProps> = ({ date, setDate }) => {
  const [dateStr, setDateStr] = useState<string>("");
  const [isDateValid, setIsDateValid] = useState<boolean>(true);
  //Arbejd ud fra en string state i stedet for en Date

  return (
    <div className="dateinput p-inputgroup">
      <InputMask
        mask="99/99/99 99:99"
        placeholder="dd/mm/åå tt:mm"
        style={isDateValid ? {} : { border: "3px solid #d81e1e" }}
        value={dateStr}
        autoClear={false}
        onChange={(e) => {
          if (e.value.indexOf("_") !== -1 || e.value === "") {
            setIsDateValid(true);
          }
        }}
        onComplete={(e) => {
          const date = parse(e.value, "dd/MM/yy HH:mm", new Date());
          if (isValid(date) === false) {
            setDateStr(e.value);
            setIsDateValid(false);
          } else {
            setDate(date);
            setDateStr(e.value);
            setIsDateValid(true);
          }
        }}
      ></InputMask>
      <Calendar
        value={date}
        dateFormat="dd/mm/yy"
        showTime={true}
        disabledDays={[0, 6]}
        onChange={(e) => {
          const date = format(e.value as Date, "dd/MM/yy HH:mm");
          setIsDateValid(true);
          setDate(e.value);
          setDateStr(date);
        }}
        hideOnDateTimeSelect={true}
        showIcon
      ></Calendar>
    </div>
  );
};
