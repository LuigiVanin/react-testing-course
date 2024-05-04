import { fireEvent, render, screen } from "@testing-library/react";
import SignUp from ".";

const navigateMock = vi.fn();

describe("Teste o componente de Signup", () => {
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

  test("Devem haver três inputs na minha tela", async () => {
    render(<SignUp />);
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(3);
  });

  test("Devem haver três inputs para nome, senha e email", async () => {
    render(<SignUp />);
    const inputName = await screen.findByPlaceholderText("Insira seu nome");
    const inputEmail = await screen.findByPlaceholderText("Insira seu email");
    const inputPassword = await screen.findByPlaceholderText(
      "Insira sua senha"
    );

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test("Deve haver um botão na tela escrito 'Signup'", async () => {
    render(<SignUp />);
    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Sign Up/i);
  });

  test("Deve haver um título em h3 para a página", async () => {
    render(<SignUp />);
    const title = await screen.findByRole("heading", {
      level: 2,
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Sign Up/i);
  });

  test("Deve navegar para dashboard", async () => {
    render(<SignUp />);

    const button = await screen.findByRole("button");

    fireEvent.click(button);

    expect(navigateMock).toBeCalledTimes(1);
  });

  test("Deve haver um link para a página de login", async () => {
    render(<SignUp />);
    const link = await screen.findByTestId("mock-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Já tem conta? Vá para tela de login");
  });
});
