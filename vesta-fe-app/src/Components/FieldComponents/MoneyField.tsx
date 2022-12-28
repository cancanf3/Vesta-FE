import * as React from "react";
import MaterialTextField from "@mui/material/TextField";
import { EntityInput, isMoneyCondition } from "../../Types/LendingTypes";
import { IncorrectMoneyField } from "../../Constants";
import { MoneyFieldProp } from "../../Types/ComponentTypes";
import { useDispatch } from "react-redux";
import { saveLendingInformation } from "../../Redux/LendingInformationSlice";

export const MoneyField = ({
  display,
  entity,
  field,
  conditions,
  value,
}: MoneyFieldProp) => {
  const [isIncorrect, setIsIncorrect] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<number>(value ?? 0);
  const dispatch = useDispatch<any>();

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

    setCurrentValue(newValue);
  };

  const handleBlur = () => {
    if (
      isMoneyCondition(conditions) &&
      conditions.minValue <= currentValue &&
      conditions.maxValue >= currentValue
    ) {
      isIncorrect && setIsIncorrect(false);

      const entityInput: EntityInput = {
        entityType: entity,
        inputField: field,
        lendingInput: currentValue,
      };
      dispatch(saveLendingInformation(entityInput));
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
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isIncorrect}
        helperText={isIncorrect ? incorrectMoneyMessage : undefined}
      />
    </div>
  );
};
