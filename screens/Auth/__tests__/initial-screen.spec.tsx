import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { InitialScreen } from "../initial-screen";
import "react-native-gesture-handler/jestSetup";
import { RenderResult } from "@testing-library/react";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const realModule = jest.requireActual("@react-navigation/native");
  return {
    ...realModule,
    useNavigation: () => {
      return {
        navigate: mockNavigate,
      };
    },
  };
});

describe("<InitialScreen/>", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(<InitialScreen />);
    });
  });
  it("renders correctly", async () => {
    const { getByText } = renderResult;
    const title = getByText("ShareCoin");
    expect(title).toBeTruthy();
  });
  it("can navigate to create-account", () => {
    const { getByText } = renderResult;
    const createAccountRoute = getByText("Join for FREE");
    fireEvent.press(createAccountRoute);
    expect(mockNavigate).toHaveBeenCalledWith("Create Account");
  });

  it("can navigate to login", () => {
    const { getByText } = renderResult;
    const createAccountRoute = getByText("I already have an account");
    fireEvent.press(createAccountRoute);
    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
