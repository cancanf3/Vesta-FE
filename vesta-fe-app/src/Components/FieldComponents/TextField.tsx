import * as React from "react";
import MaterialTextField from "@mui/material/TextField";
import { EntityInput, isStringCondition } from "../../Types/LendingTypes";
import { IncorrectStringField } from "../../Constants";
import { TextFieldProp } from "../../Types/ComponentTypes";
import { useDispatch } from "react-redux";
import { saveLendingInformation } from "../../Redux/LendingInformationSlice";

export const TextField = ({
  display,
  entity,
  field,
  conditions,
  value,
}: TextFieldProp) => {
  const [isIncorrect, setIsIncorrect] = React.useState<boolean>(false);
  const [currentValue, setCurrrentValue] = React.useState<string>(value ?? "");
  const dispatch = useDispatch<any>();

  const incorrectStringMessage = React.useMemo(() => {
    if (isStringCondition(conditions)) {
      return IncorrectStringField(conditions.regex);
    }

    return "Text does not follow the correct formatting";
  }, [conditions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrrentValue(event.target.value);
  };

  const handleBlur = () => {
    if (!currentValue) {
      return;
    }

    if (!isStringCondition(conditions)) {
      setIsIncorrect(true);
      return;
    }

    const regex = new RegExp(conditions.regex);

    if (regex.test(currentValue)) {
      // Dispatch To Store

      const entityInput: EntityInput = {
        entityType: entity,
        inputField: field,
        lendingInput: currentValue,
      };
      dispatch(saveLendingInformation(entityInput));
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
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isIncorrect}
        helperText={isIncorrect ? incorrectStringMessage : undefined}
      />
    </div>
  );
};
