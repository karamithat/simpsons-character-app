import { getCharacters, addCharacter, mockUrl } from "./api";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockCharacter = {
  name: "Homer Simpson",
  avatar:"https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png",
  id: "14",
  job: "Nuclear Safety Inspector",
  description:"Homer Jay Simpson (born May 12, 1956) is the main protagonist and one of the five main characters of The Simpsons series (or show).He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson. Homer is overweight (said to be ~240 pounds), lazy, and often ignorant to the world around him. Although Homer has many flaws, he has shown to have great caring, love, and even bravery to those he cares about and, sometimes, even others he doesn't. He also serves as the main protagonist of the The Simpsons Movie. He is 39 years old and was born in 1956.",
};

const server = setupServer(
  rest.get(mockUrl, (req, res, ctx) => {
    return res(ctx.json([mockCharacter]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getCharacters", () => {
  it("fetch characters successfully", async () => {
    const response = await getCharacters();
    expect(response.data).toEqual([mockCharacter]);
  });
});

describe("addCharacter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("add character to localStorage and update characterOrder", () => {
    const characters = addCharacter(mockCharacter);
    expect(characters).toEqual([mockCharacter]);
    expect(JSON.parse(localStorage.getItem("characters"))).toEqual([
      mockCharacter,
    ]);
    expect(JSON.parse(localStorage.getItem("characterOrder"))).toEqual([
      mockCharacter,
    ]);
  });
});
