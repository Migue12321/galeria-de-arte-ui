import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Gallery from "../../../Components/Gallery/Gallery";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });
describe("Gallery", () => {
  const paints = [
    {
      _id: "5f2ec7593170720024f32c66",
      title: "Together",
      width: "21",
      height: "29.5",
      forSale: false,
      url: "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FTogether?alt=media&token=b3e2dbce-220e-4feb-ad82-82bc38190553",
    },
    {
      _id: "5f2ec7b53170720024f32c67",
      title: "With you",
      width: "21",
      height: "29.5",
      forSale: false,
      url: "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FWith%20you?alt=media&token=51033084-b48c-46d1-8938-68c39a66c5bd",
    },
  ];

  const cards = [0, 1];
  beforeEach(() => {
    const component = render(<Gallery paints={paints} cards={cards} />);
  });

  test("render gallery with 2 paints", () => {
    const editButton = screen.getAllByText("Editar");
    const seeButton = screen.getAllByText("Ver");
    const deleteButton = screen.getAllByText("Eliminar");
    let paintNames = [];
    paintNames[0] = screen.getByText("With you");
    paintNames[1] = screen.getByText("Together");
    expect(editButton.length).toBe(2);
    expect(seeButton.length).toBe(2);
    expect(deleteButton.length).toBe(2);
    expect(paintNames.length).toBe(2);
  });
  
  test("render gallery with 3 paints", () => {
    const editButton = screen.getAllByText("Editar");
    const seeButton = screen.getAllByText("Ver");
    const deleteButton = screen.getAllByText("Eliminar");
    let paintNames = [];
    paintNames[0] = screen.getByText("With you");
    paintNames[1] = screen.getByText("Together");
    expect(editButton.length).toBe(2);
    expect(seeButton.length).toBe(2);
    expect(deleteButton.length).toBe(2);
    expect(paintNames.length).toBe(2);
   
  });
}); 

