import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function renderWithTheme(initial: "light" | "dark" = "light") {
  return render(
    <ThemeProvider attribute="class" defaultTheme={initial} enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  it("renders a button with an accessible label", () => {
    renderWithTheme("light");
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    expect(btn).toBeInTheDocument();
  });

  it("toggles the html class when clicked", async () => {
    const user = userEvent.setup();
    renderWithTheme("light");
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    await user.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
