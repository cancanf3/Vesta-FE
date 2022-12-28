
export type MoneyCondition = {
    maxValue: number,
    minValue: number
}

export function isMoneyCondition(condition: MoneyCondition | StringCondition | undefined): condition is MoneyCondition {
    return condition !== undefined && condition.hasOwnProperty('minValue') && condition.hasOwnProperty('maxValue'); 
}


export type StringCondition = {
    regex: string
}

export function isStringCondition(condition: MoneyCondition | StringCondition | undefined): condition is StringCondition {
    return condition !== undefined && condition.hasOwnProperty('regex'); 
}


export const EntityTypes: readonly string[] = Object.freeze(["Loan", "Borrower"]);

export type EntityType = typeof EntityTypes[number];
export type InputType = "money" | "string" | "date";

export type LendingEntry = {
    entity: EntityType,
    display: string,
    field: string,
    type: InputType,
    conditions?: MoneyCondition | StringCondition
}

export type LendingForm = LendingEntry[]; 

export type Loan = { [field: string]: LendingEntry };
export type Borrower = { [field: string]: LendingEntry };
export type LoadingStatus = 'Idle' | 'Processing' | 'Error';

export type LendingStoreState = {
    status: LoadingStatus;
    loan: Loan,
    borrower: Borrower
}