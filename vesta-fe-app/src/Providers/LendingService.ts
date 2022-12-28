import { LocalStorageKey } from "../Constants";
import { EntityTypes, LendingEntry, LendingInformation } from "../Types/LendingTypes";
import sampleJson from '../static/InitialData.json'; 


/**
 *  Lending Service Exposes Methods to interact with the current Persitent Storage
 *  @returns {context = {fetchLendingInformation, saveLendingInformation}}
 */
export const LendingService = () => {

  const validateLendingInformation = (lendingInformation: LendingInformation) => {

    const entityFielSets: {  [key: string] : Set<string>} = {};

    EntityTypes.forEach((entityType: string) => {
      entityFielSets[entityType] = new Set<string>();
    })
    
    lendingInformation.forEach((lendingEntry: LendingEntry) => {

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

  const writeLendingInformation = (newLendingInformation: LendingInformation) => {
    validateLendingInformation(newLendingInformation);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newLendingInformation));   
  }

  const fetchLendingInformation = async (): Promise<LendingInformation> => {
    
    // Read Data From DB 
    const lendingInformationData = localStorage.getItem(LocalStorageKey);

    // If DB has not been initialized then use Sample JSON
    return !lendingInformationData ? 
      sampleJson : JSON.parse(lendingInformationData);

  }; 

  const saveLendingInformation = async (newLendingEntry: LendingEntry) => {
    
    // Pull current Data from DB 
    const lendingInformation = await fetchLendingInformation();

    // Find Entry to Update
    const lendingEntryIndex = lendingInformation.findIndex((lendingEntry: LendingEntry) => {
      return lendingEntry.entity === newLendingEntry.entity && lendingEntry.field === newLendingEntry.field
    })

    lendingInformation[lendingEntryIndex] = newLendingEntry;
    
    // Write new changes
    writeLendingInformation(lendingInformation);
  }

  const context = {
    saveLendingInformation,
    fetchLendingInformation
  };

  return context; 
};
