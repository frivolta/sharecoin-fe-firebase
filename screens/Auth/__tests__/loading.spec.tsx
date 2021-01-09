import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";
import "react-native-gesture-handler/jestSetup";
import { RenderResult } from "@testing-library/react";
import { Loading } from "../../Loading";

describe("<Loading/>", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(<Loading />);
    });
  });
  it("renders correctly", async () => {
    const { getByText } = renderResult;
    const title = getByText("Loading");
    expect(title).toBeTruthy();
  });
});
