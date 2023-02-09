import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageModal from "../../../Components/Modal/ImageModal";

describe("Image Modal", () => {

    beforeEach(() => {
    let open = true;
    let handleClose = jest.fn();
    let imageUrl =
      "https://firebasestorage.googleapis.com/v0/b/galleria-de-arte.appspot.com/o/pictures%2FTogether?alt=media&token=b3e2dbce-220e-4feb-ad82-82bc38190553";
    let size = "21x18.5";
    let title = "With you";
    const component = render(
      <ImageModal
        open={open}
        handleClose={handleClose}
        image={imageUrl}
        size={size}
        title={title}
      />
    );
  });

  test("render Image Modal", () => {

    const title = screen.getByRole('heading',{name: 'With you'});
    const imageTitle = screen.getByRole('img',{name: 'With you'});
    const size = screen.getByRole('heading',{name: 'Medidas: 21x18.5'});
    expect(title).toBeInTheDocument();
    expect(imageTitle).toBeInTheDocument();
    expect(size).toBeInTheDocument();
  });
});
