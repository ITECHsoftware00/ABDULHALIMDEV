import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArchiveList } from "@/components/ui/ArchiveList";

const items = [
  { id: "a", title: "Alpha", category: "Cat A", tech: ["X"], description: "d", image: "" },
  { id: "b", title: "Beta", category: "Cat B", tech: ["Y"], description: "d", image: "" },
];

describe("ArchiveList", () => {
  it("hides the list initially and shows the toggle", () => {
    render(<ArchiveList projects={items} />);
    expect(screen.queryByText("Alpha")).toBeNull();
    expect(screen.getByRole("button", { name: /browse archive/i })).toBeInTheDocument();
  });
  it("expands the list when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<ArchiveList projects={items} />);
    await user.click(screen.getByRole("button", { name: /browse archive/i }));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});
