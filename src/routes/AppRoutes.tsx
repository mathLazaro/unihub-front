import { BrowserRouter, Route, Routes } from "react-router-dom";
import InternalLayout from "../layouts/InternalLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";

import PublicProfilePage from "../pages/PublicProfilePage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<InternalLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<PublicProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
