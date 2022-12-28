import * as React from "react";
import MaterialTextField from "@mui/material/TextField";
import { isStringCondition, LendingEntry } from "../../Types/LendingTypes";
import { IncorrectStringField } from "../../Constants";

type Prop = LendingEntry;

export const TextField = ({ display, field, conditions }: Prop) => {
  const [isIncorrect, setIsIncorrect] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const incorrectStringMessage = React.useMemo(() => {
    if (isStringCondition(conditions)) {
      return IncorrectStringField(conditions.regex);
    }

    return "Text does not follow the correct formatting";
  }, [conditions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    if (!value) {
      return;
    }

    if (!isStringCondition(conditions)) {
      setIsIncorrect(true);
      return;
    }

    const regex = new RegExp(conditions.regex);

    if (regex.test(value)) {
      // Dispatch To Store
      isIncorrect && setIsIncorrect(false);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div>
      <span>{display}</span>
      <MaterialTextField
        id={field}
        label={display}
        variant="outlined"
        placeholder={display}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isIncorrect}
        helperText={isIncorrect ? incorrectStringMessage : undefined}
      />
    </div>
  );
};
