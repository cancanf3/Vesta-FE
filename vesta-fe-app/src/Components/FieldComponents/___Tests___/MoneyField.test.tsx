import { render, screen } from "@testing-library/react";
import * as React from "react";
import store from "../../../Redux/Store";
import { fetchLendingForm } from "../../../Redux/LendingFormSlice";
import { fetchLendingInformation } from "../../../Redux/LendingInformationSlice";
import { Provider } from "react-redux";
import { MoneyField } from "../MoneyField";

describe("Render MoneyField", () => {
  test("renders MoneyField then check if renders correctly", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());
    render(
      <Provider store={store}>
        <MoneyField
          entity={"Borrower"}
          display={"Loan Amount"}
          field={"loanAmount"}
          type={"money"}
          value={23456}
        />
      </Provider>
    );

    const linkElement = screen.getByRole("textbox", { name: /loan amount/i });
    expect(linkElement).toBeDefined();
  });
});
