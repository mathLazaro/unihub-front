import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function InternalLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}
