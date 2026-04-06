import { render, screen } from "@testing-library/react";
import { WeekHeader } from "./WeekHeader";

describe("WeekHeader", () => {
  it("renders the correct week range: Mar 9 – Mar 15", () => {
    render(<WeekHeader />);
    expect(screen.getByText(/Mar 9/)).toBeInTheDocument();
    expect(screen.getByText(/Mar 15/)).toBeInTheDocument();
  });

  it("renders the dashboard title", () => {
    render(<WeekHeader />);
    expect(screen.getByText("Leadership Weekly Review:")).toBeInTheDocument();
  });

  it("renders the platform analytics label", () => {
    render(<WeekHeader />);
    expect(
      screen.getByText("Platform Analytics Dashboard")
    ).toBeInTheDocument();
  });

  it("renders the placeholder data warning", () => {
    render(<WeekHeader />);
    expect(
      screen.getByText(/This dashboard uses placeholder data/)
    ).toBeInTheDocument();
  });

  it("displays week range in correct order (start before end)", () => {
    render(<WeekHeader />);
    const heading = screen.getByRole("heading");
    const mar9Index = heading.textContent?.indexOf("Mar 9") ?? -1;
    const mar15Index = heading.textContent?.indexOf("Mar 15") ?? -1;
    expect(mar9Index).toBeLessThan(mar15Index);
  });

  it("renders correctly on smartphone viewport (375px)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });
    window.dispatchEvent(new Event("resize"));

    render(<WeekHeader />);

    expect(screen.getByText("Platform Analytics Dashboard")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(/Mar 9/)).toBeInTheDocument();
    expect(screen.getByText(/Mar 15/)).toBeInTheDocument();
    expect(
      screen.getByText(/This dashboard uses placeholder data/)
    ).toBeInTheDocument();
  });
});
