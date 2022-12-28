import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { EntityInput } from "../../Types/LendingTypes";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { saveLendingInformation } from "../../Redux/LendingInformationSlice";
import { DateFieldProp } from "../../Types/ComponentTypes";

export const DateField = ({ display, entity, field, value }: DateFieldProp) => {
  const day = React.useMemo(() => {
    if (!value) {
      return null;
    }

    var d = new Date(value.year, value.month, value.day);
    return dayjs(d);
  }, [value]);

  const [currentValue, setCurrentValue] = React.useState<Dayjs | null>(day);
  const dispatch = useDispatch<any>();

  const handleChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return;
    }

    setCurrentValue(newValue);

    const entityInput: EntityInput = {
      entityType: entity,
      inputField: field,
      lendingInput: {
        day: newValue.date(),
        month: newValue.month(),
        year: newValue.year(),
      },
    };

    dispatch(saveLendingInformation(entityInput));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
      <div>
        <span>{display}</span>
        <DatePicker
          label={display}
          value={currentValue}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
};
