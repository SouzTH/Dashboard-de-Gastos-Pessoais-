import RegisterForm from '../components/registerForm'

function Register() {

  return (
    <>
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <h1 className="font-bold text-2xl text-center">Tela de Cadastro</h1>
        <div className="min-h-10/12 w-4/12 bg-violet-200 p-4 flex flex-col justify-around items-center rounded-2xl border-2 border-violet-300 shadow-2xl">
        <RegisterForm/>
      </div>
    </div>
    </>
  );
}

export default Register;
