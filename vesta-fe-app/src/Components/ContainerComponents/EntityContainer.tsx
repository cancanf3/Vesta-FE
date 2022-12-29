import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectFormBorrowers,
  selectFormLoans,
} from "../../Redux/LendingFormSlice";
import {
  selectInformationBorrowers,
  selectInformationLoans,
} from "../../Redux/LendingInformationSlice";
import {
  BorrowerForm,
  BorrowerInput,
  EntityType,
  isLendingDateInput,
  LendingDateInput,
  LendingEntry,
  LoanForm,
  LoanInput,
} from "../../Types/LendingTypes";
import { DateField } from "../FieldComponents/DateField";
import { MoneyField } from "../FieldComponents/MoneyField";
import { TextField } from "../FieldComponents/TextField";
import "./EntityContainer.css";

type Prop = { entityType: EntityType };

export const EntityContainer = ({ entityType }: Prop) => {
  const formSelector =
    entityType === "Loan" ? selectFormLoans : selectFormBorrowers;

  const infoSelector =
    entityType === "Loan" ? selectInformationLoans : selectInformationBorrowers;

  const entityForm: LoanForm | BorrowerForm = useSelector(formSelector);
  const entityInputs: LoanInput | BorrowerInput = useSelector(infoSelector);

  const inputFieldds = () => {
    return Object.values(entityForm).map((entry: LendingEntry) => {
      const entityInput = entityInputs[entry.field];

      switch (entry.type) {
        case "string": {
          const value: string | undefined =
            typeof entityInput === "string" ? entityInput : undefined;
          return <TextField key={entry.field} {...entry} value={value} />;
        }
        case "money": {
          const value: number | undefined =
            typeof entityInput === "number" ? entityInput : undefined;
          return <MoneyField key={entry.field} {...entry} value={value} />;
        }
        case "date": {
          const value: LendingDateInput | undefined = isLendingDateInput(
            entityInput
          )
            ? entityInput
            : undefined;
          return <DateField key={entry.field} {...entry} value={value} />;
        }
        default:
          return <React.Fragment key={entry.field} />;
      }
    });
  };

  return <div className="formContainer"> {inputFieldds()}</div>;
};
