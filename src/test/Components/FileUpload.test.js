import React from "react";
import { getByText, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import FileUpload from "../../Components/Files/FileUpload";
// import Adapter from "enzyme-adapter-react-15";
describe("FileUploadField", () => {
  let file;

  beforeEach(() => {
    file = new File(["(⌐□_□)"], "chucknorris.jpg", { type: "image/jpg" });
  });

  test("File upload should rendered correctly", () => {
    render(<FileUpload />);
    const percentageSimbol = screen.getByText("%");
    const progressElement = screen.getByRole("progressbar");
    const fileButton = screen.getByRole("button");

    expect(progressElement).toBeInTheDocument();
    expect(fileButton).toBeInTheDocument();
    expect(percentageSimbol).toBeInTheDocument();
  });

//   test("File upload input should upload a file", async () => {
//     const { getByTestId } = render(<FileUpload />);

//     // const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });
//     // const inputFile = getByTestId(/uploadFile/i);
//     // await act(async () => {
//     //   await waitFor(() => {
//     //     userEvent.upload(inputFile, fakeFile);
//     //   }, {timeout:1000});
//     // });
//     const fileInputField = getByTestId(/uploadFile/i);
//     const event = {
//     target: {
//       files: '/not/sure/what/goes/in/here',
//     },
//     };
//     FileUpload.onChangefile = jest.fn().mockReturnValue({
//       success: true,
//       message: "The image was updated successfully",
//     });
//     fireEvent.change(fileInputField, event)


//     // expect(inputFile.files[0]).toStrictEqual(inputFile);
//   });
// 
});
