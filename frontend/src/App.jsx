import { BrowserRouter,Routes,Route } from "react-router";
import Home from "../src/pages/Home"
import NotFound from "../src/pages/NotFound";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
