import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainRoutes from "../src/router";

describe("Testa componente de MainRoutes", () => {
  test("should render the login page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Sign in/i);
  });

  test("should render the login page button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const button = screen.getByTestId("login-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveRole("button");
  });

  test("should render the sign up page", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Sign up/i);
  });

  test("should render the signup page button", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const button = screen.getByTestId("signup-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveRole("button");
  });

  test("should render not found page", () => {
    render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <MainRoutes />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Not Found/i);
  });
});
