import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ui/ProjectCard";

const project = {
  id: "houzz",
  title: "Houzz",
  category: "Marketplace",
  description: "Test description.",
  tech: ["React", "Node.js"],
  image: "https://example.com/x.jpg",
  liveUrl: "https://example.com",
};

describe("ProjectCard", () => {
  it("renders title, category, description, and tech pills", () => {
    render(<ProjectCard project={project} index={0} />);
    expect(screen.getByText("Houzz")).toBeInTheDocument();
    expect(screen.getByText("Marketplace")).toBeInTheDocument();
    expect(screen.getByText("Test description.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
  it("renders an external link to liveUrl when provided", () => {
    render(<ProjectCard project={project} index={0} />);
    const link = screen.getByRole("link", { name: /houzz/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
  it("renders without a link when no liveUrl", () => {
    render(<ProjectCard project={{ ...project, liveUrl: undefined }} index={0} />);
    expect(screen.queryByRole("link", { name: /houzz/i })).toBeNull();
  });
});
