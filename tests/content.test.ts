import { describe, it, expect } from "vitest";
import { content } from "@/lib/content";

describe("content", () => {
  it("has identity fields", () => {
    expect(content.identity.name).toBe("Abdulhalim Oladimeji");
    expect(content.identity.role).toBe("Backend & Full-Stack Developer");
    expect(content.identity.email).toMatch(/@/);
  });
  it("has exactly 6 featured projects", () => {
    expect(content.featuredProjects).toHaveLength(6);
  });
  it("has at least 6 archive projects", () => {
    expect(content.archiveProjects.length).toBeGreaterThanOrEqual(6);
  });
  it("has at least 6 stack groups", () => {
    expect(content.stackGroups.length).toBeGreaterThanOrEqual(6);
  });
  it("every featured project has required fields", () => {
    for (const p of content.featuredProjects) {
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tech.length).toBeGreaterThan(0);
      expect(p.image).toBeTruthy();
    }
  });
});
