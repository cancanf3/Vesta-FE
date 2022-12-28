export type MoneyCondition = {
  maxValue: number;
  minValue: number;
};

export function isMoneyCondition(
  condition: MoneyCondition | StringCondition | undefined
): condition is MoneyCondition {
  return (
    condition !== undefined &&
    condition.hasOwnProperty("minValue") &&
    condition.hasOwnProperty("maxValue")
  );
}

export type StringCondition = {
  regex: string;
};

export function isStringCondition(
  condition: MoneyCondition | StringCondition | undefined
): condition is StringCondition {
  return condition !== undefined && condition.hasOwnProperty("regex");
}

export const EntityTypes: readonly string[] = Object.freeze([
  "Loan",
  "Borrower",
]);

export type EntityType = typeof EntityTypes[number];
export type InputType = "money" | "string" | "date";

export type LendingEntry = {
  entity: EntityType;
  display: string;
  field: string;
  type: InputType;
  conditions?: MoneyCondition | StringCondition;
};

export type LendingForm = LendingEntry[];

export type LoanForm = { [field: string]: LendingEntry };
export type BorrowerForm = { [field: string]: LendingEntry };
export type LoadingStatus = "Idle" | "Processing" | "Error";

export type LendingFormState = {
  status: LoadingStatus;
  Loan: LoanForm;
  Borrower: BorrowerForm;
};

export type LoanInput = { [field: string]: LendingInput };
export type BorrowerInput = { [field: string]: LendingInput };

export type LendingInformationState = {
  status: LoadingStatus;
  Loan: LoanInput;
  Borrower: BorrowerInput;
};

export type LendingDateInput = {
  month: number;
  day: number;
  year: number;
};
export function isLendingDateInput(
  lendingDateInput: LendingInput
): lendingDateInput is LendingDateInput {
  return (
    typeof lendingDateInput !== "string" &&
    typeof lendingDateInput !== "number" &&
    typeof lendingDateInput !== "undefined" &&
    lendingDateInput.hasOwnProperty("month") &&
    lendingDateInput.hasOwnProperty("day") &&
    lendingDateInput.hasOwnProperty("year")
  );
}

export type LendingInput = string | number | LendingDateInput;

export type EntityInput = {
  entityType: EntityType;
  inputField: string;
  lendingInput: LendingInput;
};

export type LendingInformation = {
  [entityType: EntityType]: { [key: string]: LendingInput };
};
