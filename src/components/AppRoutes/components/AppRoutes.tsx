import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Space } from "../../../pages/Space";
import { TableBuilder } from "../../../pages/TableBuilder";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableBuilder />} />
        <Route path="/space" element={<Space />} />
      </Routes>
    </BrowserRouter>
  );
};
