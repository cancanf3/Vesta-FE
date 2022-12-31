# Vesta-FE

## Requirements
### PDF 
Please see the PDF attached to this project Front-End Project Interview.pdf 

## Technical Choices

- React 
- Typescript
- Material UI for Component Library
- Emotion as CSS Framework (Decided to use Material UI Theme Provider Instead)
- Redux for StateManagement with 
    - Redux Toolkit to leverage latest Redux patterns
    - Thunk Methods for Async Reducers
- Jest and React Testing Library

#### Web App Patterns

- React Global Context with React Hooks for App's state Management architecture
- Redux for App State management

## Component Hierarchy

1. LendingService.tsx: API Provider to interact with JSON File and Backing Storage (LocalStorage) 
2. Redux/: State Management Provider
    1. LendingFormSlice.ts: Set of Selectors, State and Reducers to interact with Form Object. Functionality to add new objects is implemented but not leveraged, it only execute reads
    2. LendingInformationSlice.ts: Set of Selectors, State and Reducrs to interact with the information saved in the form
    3. Store.ts: Redux store 
3. Types: 
    1. LendingTypes.ts: File defining the types used to represent the Lending object for the form and the information
    2. ComponentTypes.ts: File defining objects pertinent to the React component layouts 
4. AppContainer.tsx
	1. EntityContainer.tsx
		1. TextField.tsx
		2. MoneyField.tsx
		3. DateField.tsx

## Test Plan

Test at the API Level
1. Test loading all data
2. Test Loading empty data
3. Test Loading Input with no data

Test at Field Level
1. Test loading Component with Data
2. Test Adding Incorrect Data

Test at the AppContainer Level
1. Test App renders Loan information correctly
2. Test App renders Borrower information Correctly
3. Test App rendersand modify information Correctly
3. Test App rendersand modify information Incorrectly based on the given condition

Note: Modifying the InputJson could make the test suits to fail

## Instructions
Please read ./vesta-fe-app/README.md
