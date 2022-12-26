import * as React from "react";
import { LocalStorageKey } from "../Constants";
import { EntityTypes, LendingEntry, LendingInformation } from "../LendingTypes";
import sampleJson from '../static/InitialData.json'; 


/**
 *  Provides Functionality to Load and Save Lending Data into the Local Storage
 *
 *  @return {LendingInformation} 
 */
export const LendingServiceHook = () => {

  const validateLendingInformation = React.useCallback((lendingInformation: LendingInformation) => {

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
      (lendingEntry.condition === null || lendingEntry.condition === undefined) ) {
        throw new Error("Lending Validator: Entity type money or string must be have a condition")
      }      
    })

  }, [])

  const fetchLendingInformation = (): LendingInformation => {
    // Read From API 
    // If API Does not anything: load from SampleJson
    const lendingInformationData = localStorage.getItem(LocalStorageKey);

    if (!lendingInformationData) {
      return sampleJson as LendingInformation;
    }

    return JSON.parse(lendingInformationData) as LendingInformation ;
  }; 

  const saveLendingInformation = (newLendingInformation: LendingInformation) => {
    validateLendingInformation(newLendingInformation);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newLendingInformation));   
  }

  const context = {
    saveLendingInformation,
    fetchLendingInformation
  };

  return context; 
};
