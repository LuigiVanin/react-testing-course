import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App teste", () => {
  test("Deve haver um página com um título", async () => {
    render(<App />);

    const title = await screen.findAllByRole("heading");
    expect(title).toHaveLength(2);
  });

  test("Deve haver um página com um título escrito 'Hello, world!'", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "Hello, world!",
    });
    expect(title).toBeInTheDocument();
  });
});
