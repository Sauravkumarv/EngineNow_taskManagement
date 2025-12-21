import { BrowserRouter,Routes,Route } from "react-router";
import Home from "../src/pages/Home"
import NotFound from "../src/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
