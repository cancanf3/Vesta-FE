
export type MoneyCondition = {
    maxValue: number,
    minValue: number
}

export type StringCondition = {
    regex: RegExp
}


export const EntityTypes: readonly string[] = Object.freeze(["Loan", "Borrower"]);

export type EntityType = typeof EntityTypes[number];
export type InputType = "money" | "string" | "date";

export type LendingEntry = {
    entity: EntityType,
    display: string,
    field: string,
    type: InputType,
    condition?: MoneyCondition | StringCondition
}

export type LendingInformation = LendingEntry[]; 

export type Loan = { [field: string]: LendingEntry };
export type Borrower = { [field: string]: LendingEntry };
export type LoadingStatus = 'Idle' | 'Processing' | 'Error';

export type LendingStoreState = {
    status: LoadingStatus;
    loan: Loan,
    borrower: Borrower
}