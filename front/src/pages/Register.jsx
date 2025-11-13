import RegisterForm from '../components/registerForm'

import LogoImage from '../assets/logo.png';

import HomeLinkLogo from '../components/HomeLogoLink';

import "../style/Registro.css";

function Register() {

  return (
    <>
    <div className="pagina-autenticacao">
      <HomeLinkLogo logoSrc={LogoImage} />
        <div className="card-registro">
          <h1 className="titulo-autenticacao">Faça seu Cadastro!</h1>
          <RegisterForm/>
      </div>
    </div>
    </>
  );
}

export default Register;
