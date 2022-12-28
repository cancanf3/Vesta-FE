import { LocalStorageKey } from "../Constants";
import { EntityTypes, LendingEntry, LendingForm } from "../Types/LendingTypes";
import sampleJson from '../static/InitialData.json'; 


/**
 *  Lending Service Exposes Methods to interact with the current Persitent Storage
 *  @returns {context = {fetchLendingForm, saveLendingForm}}
 */
export const LendingService = () => {

  const validateLendingForm = (lendingForm: LendingForm) => {

    const entityFielSets: {  [key: string] : Set<string>} = {};

    EntityTypes.forEach((entityType: string) => {
      entityFielSets[entityType] = new Set<string>();
    })
    
    lendingForm.forEach((lendingEntry: LendingEntry) => {

      // If String or Money, Then Condition must be defined
      if (!lendingEntry.entity.includes('Loan') && !lendingEntry.entity.includes('Borrower')) {
        throw new Error("Lending Validator: Entity Entry must be of Type Loan | Borrower")
      } 

      if (lendingEntry.display === '' || lendingEntry.display === undefined || lendingEntry.display === null ) {
        throw new Error("Lending Validator: Entity Display can't be Empty, Null or Undefined")
      }

      if (lendingEntry.field === '' || lendingEntry.field === undefined || lendingEntry.field === null ) {
        throw new Error("Lending Validator: Entity Field can't be Empty, Null or Undefined")
      }

      if (entityFielSets[lendingEntry.entity].has(lendingEntry.field)) {
        throw new Error("Lending Validator: Entity Field can't be duplicated")
      } 

      entityFielSets[lendingEntry.entity].add(lendingEntry.field);

      if (!lendingEntry.type.includes('money') && 
      !lendingEntry.type.includes('string') && 
      !lendingEntry.type.includes('date')) {
        throw new Error("Lending Validator: Entity type must be of Type money | string | date")
      } 

      if ( (lendingEntry.type.includes('money') || lendingEntry.type.includes('string')) && 
      (lendingEntry.conditions === null || lendingEntry.conditions === undefined) ) {
        throw new Error("Lending Validator: Entity type money or string must be have a condition")
      }      
    })

  }

  const writeLendingForm = (newLendingForm: LendingForm) => {
    validateLendingForm(newLendingForm);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newLendingForm));   
  }

  const fetchLendingForm = async (): Promise<LendingForm> => {
    
    // Read Data From DB 
    const lendingFormData = localStorage.getItem(LocalStorageKey);

    // If DB has not been initialized then use Sample JSON
    return !lendingFormData ? 
      sampleJson : JSON.parse(lendingFormData);

  }; 

  const saveLendingForm = async (newLendingEntry: LendingEntry) => {
    
    // Pull current Data from DB 
    const lendingForm = await fetchLendingForm();

    // Find Entry to Update
    const lendingEntryIndex = lendingForm.findIndex((lendingEntry: LendingEntry) => {
      return lendingEntry.entity === newLendingEntry.entity && lendingEntry.field === newLendingEntry.field
    })

    lendingForm[lendingEntryIndex] = newLendingEntry;
    
    // Write new changes
    writeLendingForm(lendingForm);
  }

  const context = {
    saveLendingForm,
    fetchLendingForm
  };

  return context; 
};
