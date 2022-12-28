import { EntityTypes, LendingDateInput, LendingEntry } from "./LendingTypes";

export const SectionTypes = EntityTypes;
export type SectionType = typeof EntityTypes[number];

type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type TextFieldProp = Merge<LendingEntry, { value: string | undefined }>;
export type MoneyFieldProp = Merge<LendingEntry, { value: number | undefined }>;
export type DateFieldProp = Merge<
  LendingEntry,
  { value: LendingDateInput | undefined }
>;
