import React from "react";
import { render, screen } from "@testing-library/react";
import Copyright from "../../Components/Copyright/Copyright";

describe("Copyright", () => {
  test("renders copyright link", () => {
    const { getByText } = render(<Copyright />);
    const linkElement = screen.getByRole("link", { name: /Isabel Condori/i });
    expect(linkElement).toBeInTheDocument();
  });
});
