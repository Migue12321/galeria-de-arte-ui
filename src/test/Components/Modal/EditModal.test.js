import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import EditModal from "../../../Components/Modal/EditModal";

describe("Edit Modal", () => {

  test("Click 'Editar Datos de la Imagen' should refresh the page", () => {
    let open = true;
    let handleClose = jest.fn();
    let handleChange = jest.fn();
    let formInput = {
      marginTop: "0.5em",
      minWidth: 120,
    };
    let update= jest.fn().mockReturnValue(true);
    let imageUrl =
      "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FTogether?alt=media&token=b3e2dbce-220e-4feb-ad82-82bc38190553";
    let size = "21x18.5";
    let title = "With you";
    let component = render(
      <EditModal
        open={open}
        handleClose={handleClose}
        image={imageUrl}
        size={size}
        title={title}
        update={update}
        handleChange={handleChange}
        formInput={formInput}
      />
    );

    const editButton = screen.getByRole("button", {
      name: "Editar Datos de la Imagen",
    });
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(update).toHaveBeenCalled();
  });

  test("Render Edit Modal", () => {
    let open = true;
    let handleClose = jest.fn();
    let handleChange = jest.fn();
    let formInput = {
      marginTop: "0.5em",
      minWidth: 120,
    };
    let update= jest.fn();

    let imageUrl =
      "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FTogether?alt=media&token=b3e2dbce-220e-4feb-ad82-82bc38190553";
    let size = "21x18.5";
    let title = "With you";
    let component = render(
      <EditModal
        open={open}
        handleClose={handleClose}
        image={imageUrl}
        size={size}
        title={title}
        update={update}
        handleChange={handleChange}
        formInput={formInput}
      />
    );
    const titles = screen.getByRole("heading", { name: "With you" });
    const imageTitle = screen.getByRole("img", { name: "With you" });
    const editButton = screen.getByRole("button", {
      name: "Editar Datos de la Imagen",
    });
    expect(titles).toBeInTheDocument();
    expect(imageTitle).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

});
