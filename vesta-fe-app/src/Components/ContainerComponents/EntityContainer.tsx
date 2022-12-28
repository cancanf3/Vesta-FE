import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectFormBorrowers,
  selectFormLoans,
} from "../../Redux/LendingFormSlice";
import {
  BorrowerForm,
  EntityType,
  LendingEntry,
  LoanForm,
} from "../../Types/LendingTypes";
import { DateField } from "../FieldComponents/DateField";
import { MoneyField } from "../FieldComponents/MoneyField";
import { TextField } from "../FieldComponents/TextField";

type Prop = { entityType: EntityType };

export const EntityContainer = ({ entityType }: Prop) => {
  const selector =
    entityType === "Loan" ? selectFormLoans : selectFormBorrowers;

  const entities: LoanForm | BorrowerForm = useSelector(selector);

  const inputFieldds = () => {
    return Object.values(entities).map((entry: LendingEntry) => {
      switch (entry.type) {
        case "string":
          return <TextField key={entry.field} {...entry} />;
        case "money":
          return <MoneyField key={entry.field} {...entry} />;
        case "date":
          return <DateField key={entry.field} {...entry} />;
        default:
          return <React.Fragment key={entry.field} />;
      }
    });
  };

  return <React.Fragment>{inputFieldds()}</React.Fragment>;
};
