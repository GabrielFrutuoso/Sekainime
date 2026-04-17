import { Home } from "@/pages/Home/Home";
import { Infos } from "@/pages/Infos/Infos";
import { Watch } from "@/pages/Watch/Watch";
import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/:category?" element={<Home />} />
      <Route path="/watch/:anime/:episode" element={<Watch />} />
      <Route path="/infos/:anime" element={<Infos />} />
    </Routes>
  );
}
