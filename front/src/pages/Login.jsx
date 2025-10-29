// CODIGO QUE ESTAVA NO ARQUIVO ANTES DAS MINHAS ALTERAÇÕES

// function DashboardLogin() {
//   return (
//     <>
//       <h1>Tela de Login</h1>
//     </>
//   );
// }
// export default DashboardLogin;



import InputField from '../components/inputField';
import Button from '../components/button';
import Checkbox from '../components/checkBox';
import '../style/login.css'; // importa o css local da tela, o ".." faz com que pule as pastas anteriores e abra só as escritar aí se n me engano



export default function Login({
  onEmailChange = () => {  },
  onPasswordChange = () => {  },
  onRememberChange = () => {  },
  onSubmit = () => {  },
  rememberChecked = false,
}) {
  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">Acesse sua conta</h1>

        <form
          className="login-form"
          onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        >
          <InputField
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="seu@email.com"
            onChange={onEmailChange}
            required
            className="login-input"
          />

          <InputField
            id="password"
            label="Senha"
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={onPasswordChange}
            required
            className="login-input"
          />

          <div className="login-row">
            <Checkbox
              id="remember"
              checked={rememberChecked}
              onChange={onRememberChange}
              label="Lembre de mim"
              className="login-checkbox" 
            />
            <a href="/forgot" className="link-small">Esqueceu sua senha?</a>
          </div>

          <Button type="submit" className="login-button">Entrar</Button>

          <div className="signup-row">
            <span>Não tem conta?</span>
            <a href="/register" className="link-signup"> Cadastre-se</a>
          </div>
        </form>
      </div>
    </div>
  );
}
