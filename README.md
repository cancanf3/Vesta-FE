# Vesta-FE


## Requirements
### PDF 
Please see the PDF attached to this project

## Technical Choices

- React 
- Typescript
- Material UI for Component Library
- Emotion as CSS Framework
- Redux for StateManagement with Redux Toolkit to leverage latest Redux patterns
- Jest and React Testing Library

#### Web App Patterns

- React Global Context with React Hooks for App's state Management architecture
- Redux for App State management

## Component Hierarchy

1. LendingServiceProvider.tsx: API Provider 
2. LendingProvider.tsx: State Management Hook 
3. LendingTypes.ts: File defining the types used in the App
4. AppContainer.tsx
	1. EntityContainer.tsx
		1. TextField.tsx
		2. MoneyField.tsx
		3. DateField.tsx
5. TestData.ts 
	1. Test Data, Normal 
	2. Test Data, Incorrect Data
	3. Test Data, Empty Questions
	4. Test Data, Empty Everything

## Test Plan

Test at the EntityContainer Level
1. Test loading all data
2. Test Loading empty data
3. Test Loading Input with no data

Test at Field Level
1. Test Adding Data
2. Test Adding Incorrect Data

## Notes: 
- Keep Components Dynamic: 'Loan' | 'Borrower' and 'string' | 'Money' | 'date'
- Only use Prop at the Field level
- Might use a Toggle Button to go between Components
- As of now, there is no functionality to add new inputs on the go. 
- Validation should happen at the input level and only submit to the API if text is valid

### Redux  Notes:
- Typing would not go into the Redux Store but OnBlur data after they have been validated 
	- Keep Redux store clean from Corrupted Data (Can reducer have validators to reject changes?)
- Define Selectors: 
	- To Get the right LendingInput based on (Entity, Field) pair
- Single Global Store
- Once new State has been calculated, Changes will be pushed to the local store
- Expose as a React Provider 
- If there is need to print the granular changes, a middleware can be a fancy way to do it  
- useSelector to fetch the right data to every single component
- useDispatch to dispatch the action directly into the store at any level
- [use MiddleWare](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#saving-todo-items) to attach the LendingServiceProvider: 
- [Implement Loading Indicator with Redux](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#loading-state-enum-values)
- State going to have a Borrower Object and a Lean Object, so they can be enumerated
#### How to optimize rendering ?
- Keep InputFields with primitive props 
- Have EntityComponents take the dependency from the LendingProvider

## TODOs
- [ ] Add Instructions to use React DevTools    
- [ ] Add Functionality to Save Form in LocalStorage
- [ ] Add Functionality to add new input forms
- [ ] Add Functionality to discard malformed forms? 
- [x] Fix Bug with stale data while going back and forth 
