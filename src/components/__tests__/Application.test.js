import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "/home/dio/lighthouse/scheduler2/src/components/Application.js";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
