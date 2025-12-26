import { BrowserRouter,Routes,Route } from "react-router";
import Home from "../src/pages/Home"
import NotFound from "../src/pages/NotFound";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtecotedRoute";


function App() {

  
  return (
    <BrowserRouter>
      <Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />

  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />

  <Route path="*" element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
