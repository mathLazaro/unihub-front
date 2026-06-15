import { BrowserRouter, Route, Routes } from "react-router-dom";
import InternalLayout from "../layouts/InternalLayout";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/signup" element={<h1>Register page</h1>} />

        <Route element={<InternalLayout />}>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/search" element={<h1>Search Page</h1>} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
