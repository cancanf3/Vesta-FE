import { render, screen } from "@testing-library/react";
import { TextField } from "../TextField";
import * as React from "react";
import store from "../../../Redux/Store";
import { fetchLendingForm } from "../../../Redux/LendingFormSlice";
import { fetchLendingInformation } from "../../../Redux/LendingInformationSlice";
import { Provider } from "react-redux";

describe("Render TextField", () => {
  test("renders TextField then check if renders correctly", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());
    render(
      <Provider store={store}>
        <TextField
          entity={"Borrower"}
          display={"First Name"}
          field={"firstName"}
          type={"string"}
          value={"Jose"}
        />
      </Provider>
    );

    const linkElement = screen.getByRole("textbox", { name: /first name/i });
    expect(linkElement).toBeDefined();
  });
});
