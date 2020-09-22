import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { parse, format, isValid } from "date-fns";

interface CalendarProps {
  date: string | undefined;
  setDate: (date: string | undefined) => void;
}

export const DateInput: React.FC<CalendarProps> = ({ date, setDate }) => {
  const [isDateValid, setIsDateValid] = useState<boolean>(true);

  let iniDate;
  if (date === undefined) {
    iniDate = new Date();
  } else {
    iniDate = parse(date, "dd/MM/yy HH:mm", new Date());
  }

  return (
    <div className="dateinput p-inputgroup">
      <InputMask
        mask="99/99/99 99:99"
        placeholder="dd/mm/åå tt:mm"
        style={isDateValid ? {} : { border: "3px solid #d81e1e" }}
        value={date}
        autoClear={false}
        onChange={(e) => {
          if (e.value.indexOf("_") !== -1 || e.value === "") {
            setIsDateValid(true);
          }
        }}
        onComplete={(e) => {
          const date = parse(e.value, "dd/MM/yy HH:mm", new Date());
          if (isValid(date) === false) {
            setDate(e.value);
            setIsDateValid(false);
          } else {
            setDate(e.value);
            setIsDateValid(true);
          }
        }}
      ></InputMask>
      <Calendar
        className="datepicker"
        value={iniDate}
        dateFormat="dd/mm/yy"
        showTime={true}
        disabledDays={[0, 6]}
        showOnFocus={false}
        onChange={(e) => {
          const date = format(e.value as Date, "dd/MM/yy HH:mm");
          setIsDateValid(true);
          setDate(date);
        }}
        hideOnDateTimeSelect={true}
        showIcon
      ></Calendar>
    </div>
  );
};
