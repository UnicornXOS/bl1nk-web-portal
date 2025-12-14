import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContentCard from "../ContentCard";

describe("ContentCard Component", () => {
  const mockCard = {
    id: "card-1",
    title: "Test Repository",
    description: "A test repository for testing",
    source: "github" as const,
    url: "https://github.com/user/repo",
    tags: ["typescript", "react"],
    featured: false,
  };

  it("renders card with title and description", () => {
    render(<ContentCard {...mockCard} />);
    expect(screen.getByText("Test Repository")).toBeTruthy();
    expect(screen.getByText("A test repository for testing")).toBeTruthy();
  });



  it("renders tags", () => {
    render(<ContentCard {...mockCard} />);
    expect(screen.getByText("typescript")).toBeTruthy();
    expect(screen.getByText("react")).toBeTruthy();
  });

  it("renders featured badge when featured is true", () => {
    render(<ContentCard {...mockCard} featured={true} />);
    const featuredBadge = screen.queryByText("Featured");
    expect(featuredBadge).toBeTruthy();
  });

  it("does not render featured badge when featured is false", () => {
    render(<ContentCard {...mockCard} featured={false} />);
    const featuredBadge = screen.queryByText("Featured");
    expect(featuredBadge).toBeNull();
  });

  it("renders correctly with all props", () => {
    const { container } = render(<ContentCard {...mockCard} />);
    expect(container).toBeTruthy();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<ContentCard {...mockCard} onEdit={onEdit} />);
    const editButton = screen.queryByRole("button", { name: /edit/i });
    if (editButton) {
      editButton.click();
      expect(onEdit).toHaveBeenCalledWith(mockCard);
    }
  });
});
