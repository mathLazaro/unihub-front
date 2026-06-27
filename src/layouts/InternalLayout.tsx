import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function InternalLayout() {
  return (
    <>
      <Navbar />

      <main className="px-[5vw] py-5 md:px-[10vw] lg:px-[15vw] ">
        <Outlet />
      </main>
    </>
  );
}
