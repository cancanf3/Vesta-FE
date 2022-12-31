/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import store from "../../../Redux/Store";
import { fetchLendingForm } from "../../../Redux/LendingFormSlice";
import { fetchLendingInformation } from "../../../Redux/LendingInformationSlice";
import { Provider } from "react-redux";
import { AppContainer } from "../AppContainer";
import { LendingService } from "../../../Providers/LendingService";

describe("Render AppContainer", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders App then check if renders correctly", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());

    await act(() =>
      render(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
    );

    const linkElement = act(() =>
      screen.getByRole("textbox", { name: /loan amount/i })
    );

    expect(linkElement).toBeDefined();
  });

  test("renders App then check if borrower info renders correctly", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());

    await act(() =>
      render(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
    );

    const tabButton = act(() =>
      screen.getByRole("tab", { name: /loan borrower/i })
    );
    await act(async () => (await tabButton).click());

    const linkElement = act(() =>
      screen.getByRole("textbox", { name: /first name/i })
    );

    expect(linkElement).toBeDefined();
  });

  test("renders App then type a new loan amount to check if stored in Backing Storage", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());
    const { fetchLendingInformation: fetchLendingInfoService } =
      LendingService();

    await act(() =>
      render(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
    );

    const textBox = await act(() =>
      screen.getByRole("textbox", { name: /loan amount/i })
    );

    await act(() => fireEvent.change(textBox, { target: { value: "230000" } }));
    await act(async () => fireEvent.blur(textBox));
    const response = await fetchLendingInfoService();
    expect(response.Loan.hasOwnProperty("loanAmount")).toBe(true);
    expect(response.Loan["loanAmount"]).toBe(230000);
  });

  test("renders App then type a new loan amount incorrectly to check if it is not stored in Backing Storage", async () => {
    store.dispatch(fetchLendingForm());
    store.dispatch(fetchLendingInformation());
    const { fetchLendingInformation: fetchLendingInfoService } =
      LendingService();

    await act(() =>
      render(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
    );

    const textBox = await act(() =>
      screen.getByRole("textbox", { name: /loan amount/i })
    );

    await act(() => fireEvent.change(textBox, { target: { value: "230" } }));
    await act(async () => fireEvent.blur(textBox));

    const response = await fetchLendingInfoService();
    expect(response.Loan.hasOwnProperty("loanAmount")).toBe(false);
  });
});
