import { LocalStorageKeyInformation, LocalStorageKeyForm } from "../Constants";
import {
  EntityInput,
  EntityTypes,
  isLendingDateInput,
  LendingEntry,
  LendingForm,
  LendingInformation,
  LendingInput,
} from "../Types/LendingTypes";
import sampleJson from "../static/InitialData.json";

/**
 *  Lending Service Exposes Methods to interact with the current Persitent Storage
 *  @returns {context = {saveLendingForm,fetchLendingForm,fetchLendingInformation,saveLendingInformation,removeLendingInformation,}}
 */
export const LendingService = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const APIDelayMock = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const validateLendingForm = (lendingForm: LendingForm) => {
    const entityFielSets: { [key: string]: Set<string> } = {};

    EntityTypes.forEach((entityType: string) => {
      entityFielSets[entityType] = new Set<string>();
    });

    lendingForm.forEach((lendingEntry: LendingEntry) => {
      // If String or Money, Then Condition must be defined
      if (
        !lendingEntry.entity.includes("Loan") &&
        !lendingEntry.entity.includes("Borrower")
      ) {
        throw new Error(
          "Lending Validator: Entity Entry Form must be of Type Loan | Borrower"
        );
      }

      if (
        lendingEntry.display === "" ||
        lendingEntry.display === undefined ||
        lendingEntry.display === null
      ) {
        throw new Error(
          "Lending Validator: Entity Display can't be Empty, Null or Undefined"
        );
      }

      if (
        lendingEntry.field === "" ||
        lendingEntry.field === undefined ||
        lendingEntry.field === null
      ) {
        throw new Error(
          "Lending Validator: Entity Field can't be Empty, Null or Undefined"
        );
      }

      if (entityFielSets[lendingEntry.entity].has(lendingEntry.field)) {
        throw new Error("Lending Validator: Entity Field can't be duplicated");
      }

      entityFielSets[lendingEntry.entity].add(lendingEntry.field);

      if (
        !lendingEntry.type.includes("money") &&
        !lendingEntry.type.includes("string") &&
        !lendingEntry.type.includes("date")
      ) {
        throw new Error(
          "Lending Validator: Entity type must be of Type money | string | date"
        );
      }

      if (
        (lendingEntry.type.includes("money") ||
          lendingEntry.type.includes("string")) &&
        (lendingEntry.conditions === null ||
          lendingEntry.conditions === undefined)
      ) {
        throw new Error(
          "Lending Validator: Entity type money or string must be have a condition"
        );
      }
    });
  };

  const writeLendingForm = (newLendingForm: LendingForm) => {
    validateLendingForm(newLendingForm);
    localStorage.setItem(LocalStorageKeyForm, JSON.stringify(newLendingForm));
  };

  const fetchLendingForm = async (): Promise<LendingForm> => {
    // Read Data From DB
    const lendingFormData = localStorage.getItem(LocalStorageKeyForm);

    // If DB has not been initialized then use Sample JSON
    return !lendingFormData ? sampleJson : JSON.parse(lendingFormData);
  };

  const saveLendingForm = async (newLendingEntry: LendingEntry) => {
    // Pull current Data from DB
    const lendingForm = await fetchLendingForm();

    // Find Entry to Update
    const lendingEntryIndex = lendingForm.findIndex(
      (lendingEntry: LendingEntry) => {
        return (
          lendingEntry.entity === newLendingEntry.entity &&
          lendingEntry.field === newLendingEntry.field
        );
      }
    );

    if (lendingEntryIndex !== -1) {
      lendingForm[lendingEntryIndex] = newLendingEntry;
    } else {
      lendingForm.push(newLendingEntry);
    }

    // Write new changes
    writeLendingForm(lendingForm);
  };

  const fetchLendingInformation = async (): Promise<LendingInformation> => {
    // Read Data From DB
    const lendingInformationData = localStorage.getItem(
      LocalStorageKeyInformation
    );

    // If DB has not been initialized then use empty JSON
    return !lendingInformationData
      ? { Loan: {}, Borrower: {} }
      : JSON.parse(lendingInformationData);
  };

  const validateLendingInformation = (
    lendingInformation: LendingInformation
  ) => {
    // Check For Each EntityType
    EntityTypes.forEach((entityType: string) => {
      Object.values(lendingInformation[entityType]).forEach(
        (lendingInput: LendingInput) => {
          if (
            isLendingDateInput(lendingInput) &&
            (lendingInput.day < 0 ||
              lendingInput.day > 31 ||
              lendingInput.month < 1 ||
              lendingInput.month > 12)
          ) {
            throw new Error(
              "Lending Validator: Entity Input must have a valid date"
            );
          } else if (
            typeof lendingInput !== "number" &&
            typeof lendingInput !== "string" &&
            !isLendingDateInput(lendingInput)
          ) {
            throw new Error(
              "Lending Validator: Entity Input must have a input of type date | number | string"
            );
          }
        }
      );
    });
  };

  const writeLendingInformation = (
    newLendingInformation: LendingInformation
  ) => {
    validateLendingInformation(newLendingInformation);
    localStorage.setItem(
      LocalStorageKeyInformation,
      JSON.stringify(newLendingInformation)
    );
    console.log(newLendingInformation);
  };

  const saveLendingInformation = async (entityInput: EntityInput) => {
    // Pull current Data from DB
    const lendingInformation: LendingInformation =
      await fetchLendingInformation();

    // Find Entry to Update or Add New Entry
    lendingInformation[entityInput.entityType][entityInput.inputField] =
      entityInput.lendingInput;

    // Write new changes
    writeLendingInformation(lendingInformation);
  };

  const removeLendingInformation = async (entityInput: EntityInput) => {
    // Pull current Data from DB
    const lendingInformation: LendingInformation =
      await fetchLendingInformation();

    // Find Entry to Delete
    delete lendingInformation[entityInput.entityType][entityInput.inputField];

    // Write new changes
    writeLendingInformation(lendingInformation);
  };

  const context = {
    saveLendingForm,
    fetchLendingForm,
    fetchLendingInformation,
    saveLendingInformation,
    removeLendingInformation,
  };

  return context;
};
