import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { LendingEntry } from "../../Types/LendingTypes";
import TextField from "@mui/material/TextField";

type Prop = LendingEntry;

export const DateField = ({ display, field, conditions }: Prop) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (
    newValue: Dayjs | null,
    keyboardInputValue?: string | undefined
  ) => {
    setValue(newValue);
    // Dispatch to Store
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={"en"}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
