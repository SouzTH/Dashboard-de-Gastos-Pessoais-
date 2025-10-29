import RegisterForm from '../components/registerForm'

function DashboardRegister() {

  return (
    <>
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <h1 className="font-bold text-2xl text-center">Tela de Cadastro</h1>
        <div className="h-9/12 w-4/12 bg-violet-200 p-12 flex flex-col justify-around items-center space-y-4 rounded-2xl border-violet-400 shadow-2xl">
        <RegisterForm/>
      </div>
    </div>
    </>
  );
}

export default DashboardRegister;
