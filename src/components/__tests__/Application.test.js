import React from "react";
//import axios from "__mocks__/axios";
import axios from "axios";
//import { render, cleanup, waitForElement, fireEvent, getByText } from "@testing-library/react";
import { render, cleanup, waitForElement,fireEvent,getByText, prettyDOM,getAllByTestId,getByAltText,getByPlaceholderText,queryByText, queryByAltText} from "@testing-library/react";

import Application from "components/Application";
import '../../config'; // for global configuration variables (EJ added)

afterEach(cleanup);



it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  
  return waitForElement(() => getByText("Monday"));
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  console.log(prettyDOM(appointment));
});