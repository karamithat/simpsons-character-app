import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddCharacterPage from "../AddCharacterPage";
import { SimpsonsContext } from "../../../context/SimpsonsContext";

it("renders page and checks form submit", async () => {
  const addNewCharacter = vi.fn()

  render(
    <SimpsonsContext.Provider value={{ characters: [], addNewCharacter }}>
      <AddCharacterPage />
    </SimpsonsContext.Provider>
  );

  const form = screen.getByTestId("add-character-form");
  expect(form).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Enter name"), {
    target: { value: "Homer Simpson" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter image URL"), {
    target: { value: "https://abc.com/simpsons.png" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter job"), {
    target: { value: "Nuclear Safety Inspector" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter description"), {
    target: { value: "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show)." },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(addNewCharacter).toHaveBeenCalledWith({
      name: "Homer Simpson",  
      avatar: "https://abc.com/simpsons.png",
      job: "Nuclear Safety Inspector",
      description: "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show).",
      id: "100"
    });
  });
});
