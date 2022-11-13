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
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  //expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

  const day = getAllByTestId(container, "day").find(day => {
    return queryByText(day, "Monday")
  })

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();


  // console.log(prettyDOM(appointment));
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //  1. Render the Application.
  const { container,debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete this interview?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  //expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});


it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
  //  1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  await waitForElement(() => getByText(container, "Sylvia Palmer"))
  expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();
  const day = getAllByTestId(container, "day").find(day => 
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining"))

});


/* test number five */
it("shows the save error when failing to save an appointment", async() => {
  axios.put.mockRejectedValueOnce();
  const { container } = render(<Application />)
  await waitForElement(() => getByText(container, "Archie Cohen"))

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));


  await waitForElement(() => getByText(appointment, "Error"));
  expect(getByText(appointment, "Error")).toBeInTheDocument();
  
  fireEvent.click(queryByAltText(appointment, "Close"));

  expect(getByText(appointment, "Save")).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Cancel"))

  expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

  const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByAltText(appointment, "Delete"))

  expect(getByText(appointment, "Delete this interview?")).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"))

  //expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Error"));
  expect(getByText(appointment, "Error")).toBeInTheDocument();

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});