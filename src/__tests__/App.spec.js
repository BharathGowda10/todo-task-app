import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders header, add task, and task list", () => {
    render(<App />);
    expect(screen.getByText(/todo task list/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter a new task/i)
    ).toBeInTheDocument();
  });

  it("can add a new task and display it", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter a new task/i);
    await userEvent.type(input, "Task 1");
    const dateTimeInput = screen.getByLabelText(/select date & time/i);
    userEvent.clear(dateTimeInput);
    fireEvent.change(dateTimeInput, { target: { value: "2023-10-01T10:00" } });
    const typeSelect = screen.getByLabelText(/task type/i);
    await userEvent.selectOptions(typeSelect, "Work");
    const highPriorityBadge = screen.getByText(/high/i);
    userEvent.click(highPriorityBadge);
    const button = screen.getByRole("button", { name: /add task/i });
    userEvent.click(button);
    expect(await screen.findByText("Task 1")).toBeInTheDocument();
  });

//   it("can open and close edit modal", async () => {
//     render(<App />);
//     // Add a task first
//     const input = screen.getByPlaceholderText(/enter a new task/i);
//     await userEvent.type(input, "Task 1");
//     const dateTimeInput = screen.getByLabelText(/select date & time/i);
//     userEvent.clear(dateTimeInput);
//     fireEvent.change(dateTimeInput, { target: { value: "2023-10-01T10:00" } });
//     const typeSelect = screen.getByLabelText(/task type/i);
//     await userEvent.selectOptions(typeSelect, "Work");
//     const highPriorityBadge = screen.getByText(/high/i);
//     userEvent.click(highPriorityBadge);
//     const button = screen.getByRole("button", { name: /add task/i });
//     userEvent.click(button);

//     // Click edit icon using data-testid
//     const editButtons = screen.getAllByTestId("edit-button");
//     await userEvent.click(editButtons[0]);
//     expect(screen.getByText(/edit task/i)).toBeInTheDocument();

//     // Close modal
//     await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
//     expect(screen.queryByText(/edit task/i)).not.toBeInTheDocument();
//   });

//   it("can delete a task", async () => {
//     render(<App />);
//     const input = screen.getByPlaceholderText(/enter a new task/i);
//     await userEvent.type(input, "Task 1");
//     const dateTimeInput = screen.getByLabelText(/select date & time/i);
//     userEvent.clear(dateTimeInput);
//     fireEvent.change(dateTimeInput, { target: { value: "2023-10-01T10:00" } });
//     const typeSelect = screen.getByLabelText(/task type/i);
//     await userEvent.selectOptions(typeSelect, "Work");
//     const highPriorityBadge = screen.getByText(/high/i);
//     userEvent.click(highPriorityBadge);
//     const button = screen.getByRole("button", { name: /add task/i });
//     userEvent.click(button);

//     // Use data-testid for delete-button
//     const deleteButtons = screen.getAllByTestId("delete-button");
//     await userEvent.click(deleteButtons[0]);
//     // Wait for fade out and removal
//     expect(await screen.findByText("Task 1")).toBeInTheDocument();
//     await new Promise((r) => setTimeout(r, 1100));
//     expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
//   });
});