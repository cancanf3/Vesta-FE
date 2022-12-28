import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { LendingEntry } from "../../Types/LendingTypes";
import TextField from "@mui/material/TextField";

type Prop = LendingEntry;

export const DateField = ({ display }: Prop) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    // Dispatch to Store
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
      <div>
        <span>{display}</span>
        <DatePicker
          label={display}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
};
