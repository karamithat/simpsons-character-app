import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders logo and add button with correct text and link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("The Simpsons Logo");
    expect(logo).toBeInTheDocument();
    const addButton = screen.getByRole("link", { name: /Add Character/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton.getAttribute("href")).toBe("/add");
    userEvent.click(addButton);
  });
});
