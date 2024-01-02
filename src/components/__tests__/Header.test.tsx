import { render } from "@testing-library/react";
import Header from "../Header";

describe("Test Header component", () => {
  test("renders heeader with correct title", () => {
    const { getByText } = render(<Header />);
    const titleElement = getByText(/Github User Repository/i);
    expect(titleElement).toBeInTheDocument();
  });
});
