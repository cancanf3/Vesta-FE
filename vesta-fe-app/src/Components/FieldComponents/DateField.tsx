import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { EntityInput } from "../../Types/LendingTypes";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import {
  removeLendingInformation,
  saveLendingInformation,
} from "../../Redux/LendingInformationSlice";
import { DateFieldProp } from "../../Types/ComponentTypes";
import { DateValidationError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";

export const DateField = ({ display, entity, field, value }: DateFieldProp) => {
  const day = React.useMemo(() => {
    if (!value) {
      return null;
    }

    var d = new Date(value.year, value.month, value.day);
    return dayjs(d);
  }, [value]);

  const [currentValue, setCurrentValue] = React.useState<Dayjs | null>(day);
  const [isIncorrect, setIsIncorrect] = React.useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const handleChange = (newValue: Dayjs | null) => {
    setCurrentValue(newValue);
  };

  const handleBlur = () => {
    if (isIncorrect) {
      return;
    }

    const entityInput: EntityInput = {
      entityType: entity,
      inputField: field,
      lendingInput: {
        day: currentValue?.date() ?? 1,
        month: currentValue?.month() ?? 0,
        year: currentValue?.year() ?? 2000,
      },
    };

    if (!currentValue) {
      dispatch(removeLendingInformation(entityInput));
    } else {
      setCurrentValue(currentValue);
      dispatch(saveLendingInformation(entityInput));
    }
  };

  const handleError = (
    reason: DateValidationError,
    value: dayjs.Dayjs | null
  ) => {
    setIsIncorrect(reason !== null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
      <div>
        <span>{display}</span>
        <div onBlur={handleBlur}>
          <DatePicker
            label={display}
            closeOnSelect={true}
            value={currentValue}
            onChange={handleChange}
            onError={handleError}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
