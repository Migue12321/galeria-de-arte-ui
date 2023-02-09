import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent} from "@testing-library/react";
import UserGallery from "../../../Components/Gallery/UserGallery";

describe("User Gallery", () => {
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
    const component  = render(<UserGallery paints={paints} cards={[0,1]}/>);
  })

  test("render user gallery", () => {
    const h3 = screen.getByRole('heading', {name:'Administrador'})
    const expansionPanelName = screen.getAllByText('Subir Nueva Imagen');
    const editButton = screen.getAllByText('Editar');
    const seeButton = screen.getAllByText('Ver');
    const deleteButton = screen.getAllByText('Eliminar');
    expect(h3).toBeInTheDocument();
    expect(expansionPanelName[0]).toBeInTheDocument();
    expect(editButton.length).toBe(2);
    expect(seeButton.length).toBe(2);
    expect(deleteButton.length).toBe(2); 
  }); 

  test("Click 'Subir Nueva imagen' panel should open the panel", () => {
    const expansionPanelName = screen.getByText('Subir Nueva Imagen');
    expect(expansionPanelName.parentNode).toHaveClass('MuiExpansionPanelSummary-content');
    fireEvent.click(expansionPanelName);
    expect(expansionPanelName.parentNode).toHaveClass('MuiExpansionPanelSummary-content Mui-expanded');
  });
  
});
