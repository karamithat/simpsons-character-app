import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SimpsonsContext } from "../../../context/SimpsonsContext";
import ListPage from "../ListPage";

const mockCharacters = [
  {
    name: "Homer Simpson",
    avatar: "https://abc.com/simpsons.png",
    job: "Nuclear Safety Inspector",
    description:
      "Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show).",
    id: "100",
  },
  {
    name: "Marge Simpson",
    avatar: "https://abc.com/simpsons2.png",
    job: "Housewife",
    description:
      "Marjorie Jacqueline 'Marge' Simpson (née Bouvier; born October 2nd) is the homemaker and matriarch of the Simpson family",
    id: "101",
  },
];

it("renders page and show characters", () => {
  render(
    <MemoryRouter>
      <SimpsonsContext.Provider value={{ characters: mockCharacters }}>
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </SimpsonsContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
  expect(screen.getByText("Marge Simpson")).toBeInTheDocument();
});

it("filters characters by search term", async () => {
  render(
    <MemoryRouter>
      <SimpsonsContext.Provider value={{ characters: mockCharacters }}>
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </SimpsonsContext.Provider>
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText("Search characters...");
  fireEvent.change(searchInput, { target: { value: "Homer" } });

  await waitFor(() => {
    expect(screen.getByText("Homer Simpson")).toBeInTheDocument();
    expect(screen.queryByText("Marge Simpson")).not.toBeInTheDocument();
  });
});

it("sorts characters A-Z", async () => {
  render(
    <MemoryRouter>
      <SimpsonsContext.Provider value={{ characters: mockCharacters }}>
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </SimpsonsContext.Provider>
    </MemoryRouter>
  );

  const sortButton = screen.getByText("Sort A-Z");
  fireEvent.click(sortButton);

  await waitFor(() => {
    expect(screen.getAllByRole("heading")[1]).toHaveTextContent(
      "Marge Simpson"
    );
  });
});

test("delete a character", async () => {
  const deleteExistingCharacter = vi.fn();

  render(
    <MemoryRouter>
      <SimpsonsContext.Provider
        value={{ characters: mockCharacters, deleteExistingCharacter }}
      >
        <Routes>
          <Route path="/" element={<ListPage />} />
        </Routes>
      </SimpsonsContext.Provider>
    </MemoryRouter>
  );

  const deleteButton = screen.getAllByRole("button", { name: "X" })[0];
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(deleteExistingCharacter).toHaveBeenCalledTimes(1);
  });
});
