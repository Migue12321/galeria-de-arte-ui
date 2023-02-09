import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadImageForm from '../../Components/Forms/UploadImageForm';

describe("Copyright", () => {
    test("renders UploadImageForm", () => {
      const { getByText } = render(<UploadImageForm />);
    //   screen.debug()
      const progressElement = screen.getByRole("progressbar");
      const titleInput = screen.getByRole('textbox',{label:"Titulo"});
      expect(progressElement).toBeInTheDocument();
      expect(titleInput).toBeInTheDocument();
    });
  });
  