import { EntityInput, LendingEntry } from "../../Types/LendingTypes";
import { LendingService } from "../LendingService";

describe("Test Lending Service", () => {
  describe("Test Form Service", () => {
    test("Read Form from JSON", async () => {
      const { fetchLendingForm } = LendingService();
      const response = await fetchLendingForm();
      expect(response.length).toBe(5);
    });

    test("Write new Form then Read from Local Storage", async () => {
      const { fetchLendingForm, saveLendingForm } = LendingService();

      const lendingEntry: LendingEntry = {
        entity: "Borrower",
        display: "Social Security",
        field: "socialSecurity",
        type: "string",
        conditions: {
          regex: "^[0-9]+$",
        },
      };

      await saveLendingForm(lendingEntry);
      const response = await fetchLendingForm();

      expect(response.length).toBe(6);
    });
  });

  describe("Test Backing storage Service", () => {
    test("Read backing storage then expect empty response", async () => {
      const { fetchLendingInformation } = LendingService();
      const response = await fetchLendingInformation();

      expect(Object.values(response.Loan).length).toBe(0);
      expect(Object.values(response.Borrower).length).toBe(0);
    });

    test("Write to the Backing Storage then Read backing store", async () => {
      const { fetchLendingInformation, saveLendingInformation } =
        LendingService();

      const entityInput: EntityInput = {
        entityType: "Borrower",
        inputField: "firstName",
        lendingInput: "Jose",
      };
      await saveLendingInformation(entityInput);

      const entityInput1: EntityInput = {
        entityType: "Loan",
        inputField: "downPayment",
        lendingInput: 23456,
      };
      await saveLendingInformation(entityInput1);
      const response = await fetchLendingInformation();

      expect(Object.values(response.Loan).length).toBe(1);
      expect(Object.values(response.Borrower).length).toBe(1);
    });
  });
});
