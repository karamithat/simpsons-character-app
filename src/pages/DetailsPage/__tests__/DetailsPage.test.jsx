import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SimpsonsContext } from "../../../context/SimpsonsContext";
import DetailsPage from "../DetailsPage";

const mockCharacter = {
  name: "Homer Simpson",
  avatar: "https://abc.com/simpsons.png",
  job: "Nuclear Safety Inspector",
  description:
    "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show). ",
  id: "100",
};

it("renders page and show character information", async () => {
  render(
    <MemoryRouter initialEntries={["/characters/100"]}>
      <SimpsonsContext.Provider value={{ characters: [mockCharacter] }}>
        <Routes>
          <Route path="/characters/:id" element={<DetailsPage />} />
        </Routes>
      </SimpsonsContext.Provider>
    </MemoryRouter>
  );

  await waitFor(async () => {
    expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
    expect(screen.getByText("Nuclear Safety Inspector")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show)."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://abc.com/simpsons.png"
    );
  });

  fireEvent.click(screen.getByRole("button"));
});
