import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { DarkModeContext } from "./context/darkModeContext.jsx";
import { AuthContext } from "./context/AuthContextProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser, loginfun } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Routes>
                {" "}
                {/* Use Routes instead of RouterOutlet */}
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Routes>
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <AuthContext.Provider value={{ currentUser, loginfun }}>
      <DarkModeContext.Provider value={{ darkMode }}>
        <RouterProvider router={router} />
      </DarkModeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
