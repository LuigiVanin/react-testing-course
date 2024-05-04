import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./index";

const navigateMock = vi.fn();

describe("Testa o componente de Login", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      useNavigate() {
        return navigateMock;
      },
      Link: ({ children }: { children: React.ReactNode }) => (
        <a data-testid="mock-link">{children}</a>
      ),
    }));
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("Deve haver o título de 'Sign In'", async () => {
    render(<Login />);

    const expectedFormTitle = /Sign In/i;

    const formTitles = await screen.findAllByRole("heading", {
      name: expectedFormTitle,
    });
    expect(formTitles).toHaveLength(1);

    const formTitle = await screen.findByRole("heading", {
      name: expectedFormTitle,
    });

    expect(formTitle).toBeInTheDocument();
  });

  test("Deve ter dois inputs no components", async () => {
    render(<Login />);
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(2);
  });

  test("Deve haver um botão na tela", async () => {
    render(<Login />);
    const button = await screen.findByRole("button");
    expect(button.textContent).toBe("Login");
  });

  test("Validar placeholder dos campos textuais", async () => {
    render(<Login />);

    const emailInput = await screen.findByPlaceholderText(/Insira seu e-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = await screen.findByPlaceholderText(
      /Insira sua senha/i
    );
    expect(passwordInput).toBeInTheDocument();
  });

  test("Validar clique do usuário no botão de login", async () => {
    render(<Login />);

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    expect(navigateMock).toBeCalledTimes(1);
  });

  test("Deve haver um link para a página de login", async () => {
    render(<Login />);
    const link = await screen.findByTestId("mock-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Não tem cadastro? Clique aqui!");
  });
});
