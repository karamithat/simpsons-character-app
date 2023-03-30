import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

describe("NotFound", () => {
  it("should return text", () => {
    render(<NotFound />);

    const text = screen.getByText(/404/i);
    expect(text).toBeInTheDocument();
  });
});