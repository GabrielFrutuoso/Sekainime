import { Home } from "@/pages/Home/Home";
import { Infos } from "@/pages/Infos/Infos";
import { Watch } from "@/pages/Watch/Watch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:anime/:episode" element={<Watch />} />
        <Route path="/infos/:anime" element={<Infos />} />
      </Routes>
    </Router>
  );
}
