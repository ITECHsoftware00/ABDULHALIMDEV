import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pill } from "@/components/ui/Pill";

describe("Pill", () => {
  it("renders children", () => {
    render(<Pill>React</Pill>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });
  it("applies the accent variant class when variant=accent", () => {
    const { container } = render(<Pill variant="accent">Live</Pill>);
    expect(container.firstChild).toHaveClass("bg-[rgb(var(--accent))]");
  });
});
