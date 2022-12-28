

export const LocalStorageKey = 'lendingInformation';

export const IncorrectStringField = (pattern: string): string => `Text does not follow the correct formatting: ${pattern}`;

export const IncorrectMoneyField = 
    (minValue: number, maxValue: number): string => `Value must be between ${minValue} than ${maxValue}`;