import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";
import "react-native-gesture-handler/jestSetup";
import { RenderResult } from "@testing-library/react";
import { Loading } from "../../Loading";
import { Login } from "../login";
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

describe("<Loading/>", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(<Login />);
    });
  });
  it("renders correctly", async () => {
    const { getByText } = renderResult;
    const title = getByText("Loading");
    expect(title).toBeTruthy();
  });
});
