import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider, UseAuthContext } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const AppRouter = () => {
  const { authUser } = UseAuthContext(); // Use the hook inside a component

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Navigate to="/home" /> : <Login />, // Conditional routing based on authUser
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/home" /> : <Signup />,
    },
    {
      path: "/home",
      element: authUser ? <Home /> : <Navigate to="/" />,
    },
    {
      path: "/in",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <AppRouter /> {/* Use the router component here */}
        <Toaster />
        {/* <App /> */}
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
