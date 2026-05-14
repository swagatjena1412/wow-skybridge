import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBar } from "@/components/NavBar";

describe("NavBar", () => {
  it("renders the title", () => {
    render(<NavBar title="Hello" />);
    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
  });

  it("does not render a back link when backHref is omitted", () => {
    render(<NavBar title="No back" />);
    expect(screen.queryByRole("link", { name: /go back/i })).toBeNull();
  });

  it("renders a back link when backHref is provided", () => {
    render(<NavBar title="With back" backHref="/somewhere" />);
    const back = screen.getByRole("link", { name: /go back/i });
    expect(back).toHaveAttribute("href", "/somewhere");
  });

  it("uses the brand navy as the header background", () => {
    const { container } = render(<NavBar title="Brand" />);
    const header = container.querySelector("header");
    expect(header?.className).toMatch(/bg-\[#1B3252\]/);
  });
});
