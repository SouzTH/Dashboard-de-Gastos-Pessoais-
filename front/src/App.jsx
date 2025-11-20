import AppRoutes from "./routes/AppRoutes.jsx";
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
