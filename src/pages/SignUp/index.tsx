import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    navigate("/dashboard");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input type="text" placeholder="Insira seu nome" />
        <input type="text" placeholder="Insira seu email" />
        <input type="text" placeholder="Insira sua senha" />

        <button data-testid="signup-button">Sign Up</button>
      </form>
      <Link to="/">Já tem conta? Vá para tela de login</Link>
    </div>
  );
};

export default SignUp;
