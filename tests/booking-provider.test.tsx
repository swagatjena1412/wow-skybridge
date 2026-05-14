import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import { BookingProvider } from "@/components/BookingProvider";
import { useBooking } from "@/lib/store";
import { MOCK_BOOKING } from "@/lib/data";

function Probe() {
  const { selectedIds, setSelectedIds } = useBooking();
  return (
    <>
      <div data-testid="ids">{selectedIds.join(",")}</div>
      <button onClick={() => setSelectedIds(["new-id"])}>set</button>
    </>
  );
}

describe("BookingProvider", () => {
  it("hydrates with mock booking selectedAccessibility by default", () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    expect(screen.getByTestId("ids")).toHaveTextContent(
      MOCK_BOOKING.selectedAccessibility.join(",")
    );
  });

  it("updates selectedIds when consumer calls setter", async () => {
    const user = userEvent.setup();
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    await user.click(screen.getByRole("button", { name: /set/i }));
    expect(screen.getByTestId("ids")).toHaveTextContent("new-id");
  });

  it("default context value (outside provider) returns mock booking ids", () => {
    render(<Probe />);
    expect(screen.getByTestId("ids")).toHaveTextContent(
      MOCK_BOOKING.selectedAccessibility.join(",")
    );
  });
});
