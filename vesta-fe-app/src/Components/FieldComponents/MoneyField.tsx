import * as React from "react";
import MaterialTextField from "@mui/material/TextField";
import { isMoneyCondition, LendingEntry } from "../../Types/LendingTypes";
import { IncorrectMoneyField } from "../../Constants";

type Prop = LendingEntry;

export const MoneyField = ({ display, field, conditions }: Prop) => {
  const [isIncorrect, setIsIncorrect] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  const incorrectMoneyMessage = React.useMemo(() => {
    if (isMoneyCondition(conditions)) {
      return IncorrectMoneyField(conditions.minValue, conditions.maxValue);
    }

    return "Incorrect Value Range";
  }, [conditions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    if (Number.isNaN(newValue)) {
      return;
    }

    setValue(newValue);
  };

  const handleBlur = () => {
    if (
      isMoneyCondition(conditions) &&
      conditions.minValue <= value &&
      conditions.maxValue >= value
    ) {
      isIncorrect && setIsIncorrect(false);
      // Dispatch To Store
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div>
      <span>{display}</span>
      <MaterialTextField
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        id={field}
        label={display}
        variant="outlined"
        placeholder={display}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isIncorrect}
        helperText={isIncorrect ? incorrectMoneyMessage : undefined}
      />
    </div>
  );
};
