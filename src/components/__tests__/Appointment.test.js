import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index.js";
import '../../config'; // for global configuration variables (EJ added)

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});