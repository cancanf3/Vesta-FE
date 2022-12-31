import { render, screen } from "@testing-library/react";
import * as React from "react";
import store from "../../../Redux/Store";
import { fetchLendingForm } from "../../../Redux/LendingFormSlice";
import { fetchLendingInformation } from "../../../Redux/LendingInformationSlice";
import { Provider } from "react-redux";
import { DateField } from "../DateField";

describe("Render DateField", () => {
  test("renders DateField then check if renders correctly", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());
    render(
      <Provider store={store}>
        <DateField
          entity={"Borrower"}
          display={"Birth Date"}
          field={"birthdate"}
          type={"date"}
          value={{
            day: 21,
            month: 1,
            year: 2022,
          }}
        />
      </Provider>
    );

    const linkElement = screen.getByRole("textbox", { name: /Birth Date/i });
    expect(linkElement).toBeDefined();
  });
});
