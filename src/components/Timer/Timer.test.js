import React from "react";
import { render, fireEvent, act, queryByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Timer from "./Timer";

jest.useFakeTimers();

describe("Timer Component", () => {
  it("should start the timer when the Start button is clicked", async () => {
    const { getByTestId, queryByText } = render(<Timer />);

    const startButton = getByTestId("start-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    const timeDisplay = await queryByText(/(\d+):(\d+)/);
    expect(timeDisplay).toBeInTheDocument();
  });

  it("should stop the timer when the Stop button is clicked", async () => {
    const { getByTestId, queryByText } = render(<Timer />);
    const startButton = getByTestId("start-button");
    const stopButton = getByTestId("stop-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
      fireEvent.click(stopButton);
    });

    const timeDisplay = await queryByText(/(\d+):(\d+)/);
    expect(timeDisplay).toBeInTheDocument();
  });

  it("should reset the timer when the Reset button is clicked", () => {
    const { getByTestId, queryByText } = render(<Timer />);
    const startButton = getByTestId("start-button");
    const resetButton = getByTestId("reset-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
      fireEvent.click(resetButton);
    });

    const timeDisplay = queryByText("25:00");
    expect(timeDisplay).toBeInTheDocument();
  });

  it("should reset the timer when the Reset button is clicked after stopping", async () => {
    const { getByTestId, queryByText } = render(<Timer />);
    const startButton = getByTestId("start-button");
    const stopButton = getByTestId("stop-button");
    const resetButton = getByTestId("reset-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
      fireEvent.click(stopButton);
      fireEvent.click(resetButton);
    });

    const timeDisplay = queryByText("25:00");
    expect(timeDisplay).toBeInTheDocument();
  });

  it("should not change time display when Stop button is clicked without starting", async () => {
    const { getByTestId, queryByText } = render(<Timer />);
    const stopButton = getByTestId("stop-button");

    act(() => {
      fireEvent.click(stopButton);
    });

    const timeDisplay = queryByText("25:00");
    expect(timeDisplay).toBeInTheDocument();
  });

  it("should not speed up the timer when Start button is clicked again", async () => {
    const { getByTestId, queryByText } = render(<Timer />);
    const startButton = getByTestId("start-button");

    act(() => {
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
      fireEvent.click(startButton);
      jest.advanceTimersByTime(1000);
    });

    const timeDisplay = await queryByText(/(\d+):(\d+)/);
    expect(timeDisplay).toHaveTextContent("24:58");
  });
});
