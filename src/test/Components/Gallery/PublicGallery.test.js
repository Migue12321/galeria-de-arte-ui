import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent} from "@testing-library/react";
import PublicGallery from "../../../Components/Gallery/PublicGallery";

describe("Public Gallery", () => {
    const paints = [
        {
            "_id": "5f2ec7593170720024f32c66",
            "title": "Together",
            "width": "21",
            "height": "29.5",
            "forSale": false,
            "url": "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FTogether?alt=media&token=b3e2dbce-220e-4feb-ad82-82bc38190553"
        },
        {
            "_id": "5f2ec7b53170720024f32c67",
            "title": "With you",
            "width": "21",
            "height": "29.5",
            "forSale": false,
            "url": "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FWith%20you?alt=media&token=51033084-b48c-46d1-8938-68c39a66c5bd"
        },
    ]
 
  beforeEach(()=>{
    const component  = render(<PublicGallery paints={paints} cards={[0,1]}/>);
  })

  test("render public gallery", () => {
    const h3 = screen.getByRole('heading', {name:'Galeria de Arte de Isa'})
    const subtitle = screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    const seeButton = screen.getAllByText('Ver');
    expect(h3).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(seeButton.length).toBe(2);
  }); 

});
